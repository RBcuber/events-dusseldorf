import { date, integer, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const events = pgTable("events", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({ length: 255 }).notNull().unique(),
  description: varchar({ length: 255 }).notNull().unique(),
  date: date("date"),
});

export const users = pgTable("users", {
  id: serial().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  image: text(),
  role: varchar({ length: 100 }).notNull().default("customer"),
});
