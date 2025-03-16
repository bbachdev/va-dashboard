import { betterAuth } from "better-auth";
import { NeonDialect } from "kysely-neon"
import { twoFactor } from "better-auth/plugins"

const dialect = new NeonDialect({
  connectionString: process.env.POSTGRES_DB_URL
})
 
export const auth = betterAuth({
    appName: "VA Dashboard",
    database: {
      dialect,
      type: "postgres"
    },
    emailAndPassword: {  
      enabled: true
    },
    session: {
      cookieCache: {
          enabled: true,
          maxAge: 5 * 60 // Cache duration in seconds
      }
    },
    plugins: [twoFactor()]
})