"use client";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import CaartsInfo from "./_components/CaartsInfo";
import { db } from "@/Utils/dbconfig";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import { Budgets } from "@/Utils/schema";
import { Expenses } from "@/Utils/schema";
import Barchart from "./_components/Barchart";
import Budgetitem from "./budgets/_components/Budgetitem";
import ExpenseListTable from "./expenses/_components/ExpenseListTable";

const page = () => {
  const { user } = useUser();

  const [budgetList, setBudgetList] = useState([]);
  const [expensesList, setExpensesList] = useState([]);
  useEffect(() => {
    getBudgetList();
  }, [user]);
  const getBudgetList = async () => {
    const result = await db
      .select({
        ...getTableColumns(Budgets),
        totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
        totalItem: sql`count(${Expenses.id})`.mapWith(Number),
      })
      .from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .groupBy(Budgets.id)
      .orderBy(desc(Budgets.id));

    setBudgetList(result);
    getAllExpenses()
    // console.log(result)
  };

  const getAllExpenses = async () => {
    const result = await db.select({
        id: Expenses.id,
        name: Expenses.name,
        amount: Expenses.amount,
        createdAt: Expenses.createdAt,
      }).from(Budgets)
      .rightJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(Expenses.id));
      setExpensesList(result);
      console.log(result)
  };

  return (
    <div className="p-8">
      <h2 className="font-bold text-3xl">Hi,{user?.fullName} 🤗</h2>
      <p className="text-gray-500">Here's What Hhappening with your money</p>

      <CaartsInfo budgetList={budgetList} />
      <div className="grid grid-cols-1 md:grid-cols-3 mt-6 gap-3">
        <div className="md:col-span-2 ">
          <Barchart budgetList={budgetList} />
          <ExpenseListTable expenseList={expensesList} refreshData={()=>{getBudgetList()}}/>
        </div>
        <div className="grid gap-5">
          <h2 className="font-bold">Latest Budget</h2>
          {budgetList.map((budget, index) => {
            return <Budgetitem budget={budget} key={index} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default page;
