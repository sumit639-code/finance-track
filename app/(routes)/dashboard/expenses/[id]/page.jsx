"use client";
import { db } from "@/Utils/dbconfig";
import { Budgets } from "@/Utils/schema";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";

import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import Budgetitem from "../../budgets/_components/Budgetitem";
import { Expenses } from "@/Utils/schema";
import Addexpenses from "../_components/Addexpenses";
import ExpenseListTable from "../_components/ExpenseListTable";
import { Button } from "@/components/ui/button";
import { PenBox, Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Editbudget from "../_components/Editbudget";

const page = ({ params }) => {
  const { user } = useUser();
  const [BudgetInfo, setBudgetInfo] = useState();
  const [expensesList, setexpensesList] = useState();
  const route = useRouter();
  useEffect(() => {
    user && getBudgetInfo();
  }, [user]);
  const getBudgetInfo = async () => {
    const result = await db
      .select({
        ...getTableColumns(Budgets),
        totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
        totalItem: sql`count(${Expenses.id})`.mapWith(Number),
      })
      .from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .where(eq(Budgets.id, params.id))
      .groupBy(Budgets.id);

    setBudgetInfo(result[0]);
    getExpenseList();
    //   console.log(result);
  };

  const getExpenseList = async () => {
    const result2 = await db
      .select()
      .from(Expenses)
      .where(eq(Expenses.budgetId, params.id))
      .orderBy(desc(Expenses.id));
    setexpensesList(result2);
    console.log(result2);
  };

  const deleteBudget = async () => {
    const deleteExpensesResult = await db
      .delete(Expenses)
      .where(eq(Expenses.budgetId, params.id))
      .returning({ insertedId: Budgets.id });
    const deleteExpenses = await db
      .delete(Budgets)
      .where(eq(Budgets.id, params.id))
      .returning({ insertedId: Budgets.id });

    toast("Budget Deleted");

    route.replace("/dashboard/budgets");
  };

  return (
    <div className="p-10 ">
      <h2 className="text-2xl font-bold flex justify-between">
          <span>My Expenses</span>
        <div className="flex gap-2 items-center">
          <Editbudget budgetInfo ={BudgetInfo} refreshData={()=>getBudgetInfo()}/>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="flex gap-2">
                <Trash /> Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your Budget Expenses.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => deleteBudget()}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-5 transition-all">
        {BudgetInfo ? (
          <Budgetitem budget={BudgetInfo} />
        ) : (
          <div className="h-[150px] w-full bg-slate-299 rounded-lg animate-pulse"></div>
        )}
        <Addexpenses
          budgetId={params.id}
          user={user}
          refreshData={() => getBudgetInfo()}
        />
      </div>
      <div className="mt-4">
        
        <ExpenseListTable
          expenseList={expensesList}
          refreshData={() => {
            getBudgetInfo();
          }}
        />
      </div>
    </div>
  );
};

export default page;
