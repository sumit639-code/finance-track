import React from "react";
import Image from "next/image";
import { LayoutGrid, PiggyBank, ReceiptText, ShieldCheck } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
const SideNav = () => {
  const menuList = [
    {
      id: 1,
      name: "Dashboard",
      icon: LayoutGrid,
      path:'./dashboard'
    },
    {
      id: 2,
      name: "budgets",
      icon: PiggyBank,
      path:'./dashboard/budgets'
    },
    {
      id: 3,
      name: "Expenses",
      icon: ReceiptText,
      path:'./dashboard/expenses'
    },
    {
      id: 4,
      name: "Upgrade",
      icon: ShieldCheck,
      path:'./dashboard/upgrade'
    },
  ];
  return (
    <>
      <div className="h-screen p-5 border shadow-sm">
        <div className=" flex items-center space-x-3">
          <Image src={"/logo.svg"} alt="logo" width={50} height={50} />
          <span>Finance tracker</span>
        </div>
        <div className="mt-5">
          {menuList.map((menu, index) => (
            <h2
              className="flex gap-2 items-center text-gray-500  font-medium p-5 cursor-pointer rounded-md 
          hover:text-blue-800 hover:bg-blue-100"
              key={menu.id}
            >
              <menu.icon />
              {menu.name}
            </h2>
          ))}
        </div>
        <div className="fixed bottom-10 p-5 flex gap-2 items-center">
          <UserButton />
          profile
        </div>
      </div>
    </>
  );
};

export default SideNav;
