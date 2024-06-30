"use client"
import { db } from "@/Utils/dbconfig";
import { Budgets } from "@/Utils/schema";
import { useUser } from "@clerk/nextjs";
import React, { useEffect} from 'react'
import Budgetitem from "../budgets/_components/budgetitem";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";

function ExpensesScreen({params}) {
          const {user}=useUser();
          const [BudgetInfo,setBudgetInfo]=useState();
          useEffect(()=>{

                    
                    user&&getBudgetInfo();
          },[user]);
          const getBudgetInfo=async()=>{
                    const result = await db.select({
                                  ...getTableColumns(Budgets),
                                  totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
                                  totalItem: sql`count(${Expenses.id})`.mapWith(Number),
                                })
                                .from(Budgets)
                                .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
                                .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
                                .where (eq(Budgets.id,params.id))
                                .groupBy(Budgets.id)

                                setBudgetInfo(result[0]);
                              //   console.log(result);
                              }
                    
                    
          
 return (
    <div className='p-10'>
      <h2 className='text-2xl font-bold'>My Expenses</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 mt-6'> 
          {budgetInfo? <Budgetitem 
          budget={budgetInfo}
          />:
          <div className='h-[150px] w-full bg-slate-299 rounded-lg animate-pulse'>
          </div>}

          </div>

      <div/>
)
}


export default ExpensesScreen
