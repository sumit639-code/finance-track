import { db } from "@/Utils/dbconfig";
import { Budgets } from "@/Utils/schema";
import { Expenses } from "@/Utils/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader } from "lucide-react";
import moment from "moment";
import React, { useState } from "react";
import { toast } from "sonner";

const Addexpenses = ({ budgetId, user, refreshData }) => {
  const [name, setName] = useState();
  const [amount, setAmount] = useState();
  const [loading, setLoading] = useState(false);
  const addNewExpense = async () => {
    setLoading(true);
    const result = await db
      .insert(Expenses)
      .values({
        name: name,
        amount: amount,
        budgetId: budgetId,
        createdAt: moment().format("DD/MM/yyy"),
      })
      .returning({ insertedId: Budgets.id });
    setAmount("");
    setName("");
    if (result) {
      refreshData();
      toast("New Budget is created");
    }
    setLoading(false);
  };
  return (
    <div className="border p-5 rounded-lg">
      <h2 className="font-bold text-lg">Add Expenses</h2>

      <div className="mt-2">
        <h2 className="text-black font-medium my-1"> Expense Name</h2>
        <Input
          placeholder="e.g.Bedroom Decor"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </div>
      <div className="mt-2">
        <h2 className="text-black font-medium my-1"> Expense Amount</h2>
        <Input
          placeholder="e.g.1000$"
          onChange={(e) => setAmount(e.target.value)}
          value={amount}
        />
      </div>
      <Button
        disabled={!(name && amount)}
        className="mt-4 w-full"
        onClick={() => addNewExpense()}
      >
        {loading ? <Loader className="animate-spin" /> : "Add new expense"}
      </Button>
    </div>
  );
};

export default Addexpenses;
