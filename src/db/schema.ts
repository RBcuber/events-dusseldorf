import { integer, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const events = pgTable("events", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar("title", { length: 255 }).notNull(),        
  description: text("description").notNull(),                            
  category: varchar("category", { length: 100 }).notNull(),              
  datetime: timestamp("datetime").notNull(),                              
  location: varchar("location", { length: 255 }).notNull(),               
  price: integer("price").notNull(),                               
});
export const users = pgTable("users", {
  id: serial().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  image: text(),
  role: varchar({ length: 100 }).notNull().default("customer"),
});
