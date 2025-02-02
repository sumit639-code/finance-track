"use client";
import React, { useEffect, useState } from "react";
import Createbudget from "./Createbudget";
import { db } from "@/Utils/dbconfig";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import { Budgets } from "@/Utils/schema";
import { Expenses } from "@/Utils/schema";
import { useUser } from "@clerk/nextjs";
import Budgetitem from "./Budgetitem";

const BudgetList = () => {
  const [budgetList, setBudgetList] = useState([]);
  const { user } = useUser();
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
    // console.log(result)
  };
  return (
    <div className="mt-7">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        <Createbudget refreshData={() => getBudgetList()} />
        {budgetList?.length>0
          ? budgetList.map((budget, index) => {
              return <Budgetitem budget={budget} key={index} />;
            })
          : [1, 2, 3, 4, 5, 6].map((item, index) => (
            <div key={index} className="w-full bg-slate-200 rounded-lg h-[145px] animate-pulse">

            </div>
          ))}
      </div>
    </div>
  );
};

export default BudgetList;
