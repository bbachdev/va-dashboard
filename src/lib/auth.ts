import { betterAuth } from "better-auth";
import { NeonDialect } from "kysely-neon"
import { twoFactor } from "better-auth/plugins"
import { sendEmail } from '@/lib/email';

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
      enabled: true,
      requireEmailVerification: false
    },
    emailVerification: {
      sendOnSignUp: false,
      // TODO: Remove this once email solution in place
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      sendVerificationEmail: async ({ user, url, token }, request) => {
          await sendEmail({
              to: user.email,
              subject: 'Verify your email address',
                text: `Click the link to verify your email: ${url}`
            })
        }
    },
    session: {
      cookieCache: {
          enabled: true,
          maxAge: 5 * 60 // Cache duration in seconds
      }
    },
    plugins: [twoFactor()]
})