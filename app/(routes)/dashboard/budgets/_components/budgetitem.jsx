import { Link } from "lucide-react";
import React from "react";

const Budgetitem = ({ budget }) => {
    console.log(budget);
  return (
    <Link  href={'/dashboard/expenses/'+budget?.id}className="p-5 border rounded-lg hover:shadow-md cursor-pointer transition ease-in-out">
      <div className="flex gap-2 items-center justify-between">
        <div className="flex gap-2 items-center">
          <h2 className="text-2xl p-3 px-4 bg-slate-100 rounded-full">
            {budget?.icon}
          </h2>
          <div>
            <h2>{budget?.name}</h2>
            <h2>{budget?.totalItem} Item</h2>
          </div>
        </div>
        <h2 className="font-bold text-primary text-lg">${budget?.amount}</h2>
      </div>
      <div className="mt-5">
        <div className="flex items-center justify-between">
            <h2 className="text-xs text-slate-400">${budget?.totalSpend?budget.totalSpend:0}Spend</h2>
            <h2 className="text-xs text-slate-400">${budget?.amount-budget.totalSpend}Remaining</h2>
        </div>
        <div className="w-full bg-slate-300 h-2 rounded-lg">
            <div className="w-[40%] bg-blue-500 h-2 rounded-lg">
            </div>
        </div>
      </div>
    </Link>
  );
};

export default Budgetitem;