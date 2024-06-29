import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from "./schema.jsx"
const sql = neon('postgresql://finance_owner:2DomrlXT4Sgw@ep-lingering-haze-a5nv8a7x.us-east-2.aws.neon.tech/finance?sslmode=require');
const db = drizzle(sql,{schema});