import { type Config } from 'drizzle-kit'

export default {
  schema: './server/db/schema.ts',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.POSTGRES_URL!,
  },
  tablesFilter: ['garo_*'],
} satisfies Config
