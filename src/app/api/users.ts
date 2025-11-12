import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../db/index";
import { users } from "../../db/schema";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const allUsers = await db.select().from(users);
    return res.status(200).json(allUsers);
  }

  res.status(405).json({ message: "Method not allowed" });
}
