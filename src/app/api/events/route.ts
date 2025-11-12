import { db } from "@/src/db";
import { events } from "@/src/db/schema";
import { eq, and, like, sql, lte, gte } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const location = searchParams.get("location");
  const title = searchParams.get("title");
  const date = searchParams.get("date");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");

  const conditions = [];

  if (category) conditions.push(eq(events.category, category));
  if (location) conditions.push(eq(events.location, location));

  if (title) conditions.push(like(events.title, `%${title}%`));
  if (date) conditions.push(eq(sql`DATE(${events.datetime})`, date));
  if (minPrice) conditions.push(gte(events.price, Number(minPrice)));
  if (maxPrice) conditions.push(lte(events.price, Number(maxPrice)));

  const query = conditions.length
    ? db
        .select()
        .from(events)
        .where(and(...conditions))
    : db.select().from(events);

  const data = await query;
  return NextResponse.json(data);
}
