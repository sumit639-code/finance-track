import { db } from "@/Utils/dbconfig";
import { Expenses } from "@/Utils/schema";
import { eq } from "drizzle-orm";
import { Trash } from "lucide-react";
import React from "react";
import { toast } from "sonner";

const ExpenseListTable = ({ expenseList, refreshData }) => {
  console.log(expenseList);

  const deleteExpense = async (expenses) => {
    const deleteExpenses = await db
      .delete(Expenses)
      .where(eq(Expenses.id, expenses.id))
      .returning({ insertedId: Expenses.id });

    if (deleteExpense) {
      toast("Expense deleted");
      refreshData();
    }
  };
  return (
    <div className="mt-3">
      <h2 className="font-bold text-lg">Latest Expenses</h2>
      <div className="grid grid-cols-4 bg-slate-200 p-2 mt-3">
        <h2 className="font-bold">Name</h2>
        <h2 className="font-bold">Amount</h2>
        <h2 className="font-bold">Date</h2>
        <h2 className="font-bold">Action</h2>
      </div>
      {expenseList?.map((expenses, index) => (
        <div className="grid grid-cols-4 bg-slate-50 p-2 ">
          <h2>{expenses?.name}</h2>
          <h2>{expenses?.amount}</h2>
          <h2>{expenses?.createdAt}</h2>
          <h2>
            <Trash
              className="text-red-600 cursor-pointer"
              onClick={() => deleteExpense(expenses)}
            />
          </h2>
        </div>
      ))}
    </div>
  );
};

export default ExpenseListTable;
