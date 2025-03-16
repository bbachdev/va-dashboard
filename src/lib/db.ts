import { GeneratedAlways, Kysely } from "kysely"
import { NeonDialect } from "kysely-neon"

interface Database {
  person: PersonTable
}

interface PersonTable {
  id: GeneratedAlways<number>
  first_name: string
  gender: "male" | "female" | "other"
}

export const db = new Kysely<Database>({
  dialect: new NeonDialect({
    connectionString: process.env.POSTGRES_DB_URL,
  }),
})