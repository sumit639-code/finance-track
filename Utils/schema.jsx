import {integer, numeric, pgTable, serial, varchar} from "drizzle-orm/pg-core"
export const Budgets = pgTable('bugets',{
    id:serial('id').primaryKey(),
    name:varchar('name').notNull(),
    amount:varchar('amount'),
    icon:varchar('icon'),
    createdBy:varchar('createdBy').notNull()
})


export const Expenses = pgTable('expenses',{
    id:serial('id').primaryKey(),
    name:varchar('name').notNull(),
    amount:varchar('amount'),
    budgetId:integer('budgetId').references(()=>Budgets.id),
    createdBy:varchar('createdBy').notNull()
})