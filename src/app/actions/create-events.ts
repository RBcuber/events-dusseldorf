"use server";

import { db } from "@/src/db";
import { events } from "@/src/db/schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import z from "zod";

const eventInsertSchema = z.object({
  title: z.string().min(3, "Название слишком короткое"),
  description: z.string().min(5, "Описание слишком короткое"),
  category: z.string().min(2, "Введите категорию"),
  datetime: z
    .string()
    .refine((s) => !isNaN(Date.parse(s)), "Неверная дата")
    .transform((s) => new Date(s)),
  location: z.string().min(2, "Введите место"),
  price: z
    .string()
    .refine((v) => !isNaN(Number(v)) && Number(v) >= 0, "Цена должна быть числом")
    .transform((v) => Number(v)),
});

export default async function createEvent(formData: FormData) {
  const raw = Object.fromEntries(formData.entries());
  const data = eventInsertSchema.parse(raw);
  await db.insert(events).values(data);
  revalidatePath("/events");
  redirect("/events");

}