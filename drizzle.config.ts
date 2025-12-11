import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    out: './drizzle',
    schema: './auth-schema.ts',
    dialect: 'sqlite',
    dbCredentials: {
        url: "database.db",
    },
})