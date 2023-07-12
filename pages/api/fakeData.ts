// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
interface IChartData {
  data: {
    name: string;
    values: number[];
  }[];
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<IChartData>
) {
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
