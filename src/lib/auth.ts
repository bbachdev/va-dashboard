import { betterAuth } from "better-auth";
import { NeonDialect } from "kysely-neon"

const dialect = new NeonDialect({
  connectionString: process.env.POSTGRES_DB_URL
})
 
export const auth = betterAuth({
    database: {
      dialect,
      type: "postgres"
    }
})