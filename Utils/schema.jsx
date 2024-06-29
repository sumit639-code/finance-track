import {pgTable, serial, varchar} from "drizzle-orm/pg-core"
export const Budgets = pgTable('bugets',{
    id:serial('id').primaryKey(),
    name:varchar('name').notNull(),
    amount:varchar('amount'),
    icon:varchar('icon'),
    createdBy:varchar('createdBy').notNull()
})