"use client";
import React, { useEffect, useState } from "react";
import ExpenseListTable from "./_components/ExpenseListTable";
import { db } from "@/Utils/dbconfig";
import { Expenses } from "@/Utils/schema";
import { Budgets } from "@/Utils/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq } from "drizzle-orm";

const page = () => {
  const { user } = useUser();
  const [expensesList, setExpensesList] = useState([]);
  useEffect(() => {
    getAllExpenses();
  }, [user]);
  const getAllExpenses = async () => {
    const result = await db
      .select({
        id: Expenses.id,
        name: Expenses.name,
        amount: Expenses.amount,
        createdAt: Expenses.createdAt,
      })
      .from(Budgets)
      .rightJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(Expenses.id));
    setExpensesList(result);
    console.log(result);
  };
  return (
    <div className="m-8">
      <ExpenseListTable expenseList={expensesList} />
    </div>
  );
};

export default page;
