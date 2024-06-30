"use client";
import React, { useEffect } from "react";
import SideNav from "./_components/SideNav";
import DashboardHeader from "./_components/DashboardHeader";
import { db } from "@/Utils/dbconfig";
import { Budgets } from "@/Utils/schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { useRouter } from "next/navigation";

function DashboardLayout({ children }) {
  const {user} = useUser();
  const router=useRouter()
  useEffect(()=>{
    user&&checkUserBudget();
  },[user])
  const checkUserBudget = async () => {
    const result = await db.select().from(Budgets).where(eq(Budgets.createdBy,user?.primaryEmailAddress?.emailAddress));
    console.log(result);
    if(result?.length==0){
      router.replace('/dashboard/budgets')
    }
  };
  return (
    <div>
      <div className="fixed md:w-96 hidden md:block bg-red-100">
        <SideNav />
      </div>
      <div className="md:ml-64">
        <DashboardHeader />
        {children}
      </div>
    </div>
  );
}

export default DashboardLayout;
