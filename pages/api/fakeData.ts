// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }
  const query = req.query;
  const commodity = query.commodity;
  const frequency = query.frequency;

  res.status(200).json({
    data: [
      {
        name: "Gold",
        values: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      },
      {
        name: "Silver",
        values: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      },
    ],
  });
}
