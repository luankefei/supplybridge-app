// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

const pricesByMonth = [
  { name: "May 31, 2019", silver: 14.66, gold: 1283.7 },
  { name: "June 30, 2019", silver: 15.04, gold: 1359.04 },
  { name: "July 31, 2019", silver: 15.79, gold: 1412.89 },
  { name: "August 31, 2019", silver: 17.22, gold: 1500.41 },
  { name: "September 30, 2019", silver: 18.16, gold: 1510.58 },
  { name: "October 31, 2019", silver: 17.64, gold: 1494.81 },
  { name: "November 30, 2019", silver: 17.16, gold: 1470.79 },
  { name: "December 31, 2019", silver: 17.14, gold: 1479.13 },
  { name: "January 31, 2020", silver: 17.97, gold: 1560.67 },
  { name: "February 29, 2020", silver: 17.88, gold: 1597.1 },
  { name: "March 31, 2020", silver: 14.88, gold: 1591.93 },
  { name: "April 30, 2020", silver: 15.06, gold: 1683.17 },
  { name: "May 31, 2020", silver: 16.26, gold: 1715.91 },
  { name: "June 30, 2020", silver: 17.71, gold: 1732.22 },
  { name: "July 31, 2020", silver: 20.65, gold: 1846.51 },
  { name: "August 31, 2020", silver: 27.0, gold: 1968.63 },
  { name: "September 30, 2020", silver: 25.74, gold: 1921.92 },
  { name: "October 31, 2020", silver: 24.23, gold: 1900.27 },
  { name: "November 30, 2020", silver: 24.08, gold: 1866.3 },
  { name: "December 31, 2020", silver: 24.97, gold: 1858.42 },
  { name: "January 31, 2021", silver: 25.88, gold: 1866.98 },
  { name: "February 28, 2021", silver: 27.29, gold: 1808.17 },
  { name: "March 31, 2021", silver: 25.65, gold: 1718.23 },
  { name: "April 30, 2021", silver: 25.69, gold: 1760.04 },
  { name: "May 31, 2021", silver: 27.5, gold: 1850.26 },
  { name: "June 30, 2021", silver: 27.0, gold: 1834.57 },
  { name: "July 31, 2021", silver: 25.68, gold: 1807.84 },
  { name: "August 31, 2021", silver: 23.99, gold: 1785.28 },
  { name: "September 30, 2021", silver: 23.18, gold: 1775.14 },
  { name: "October 31, 2021", silver: 23.41, gold: 1776.85 },
  { name: "November 30, 2021", silver: 24.18, gold: 1821.76 },
  { name: "December 31, 2021", silver: 22.53, gold: 1790.43 },
  { name: "January 31, 2022", silver: 23.16, gold: 1816.02 },
  { name: "February 28, 2022", silver: 23.54, gold: 1856.3 },
  { name: "March 31, 2022", silver: 25.31, gold: 1947.83 },
  { name: "April 30, 2022", silver: 24.54, gold: 1936.86 },
  { name: "May 31, 2022", silver: 21.9, gold: 1848.5 },
  { name: "June 30, 2022", silver: 21.56, gold: 1836.57 },
  { name: "July 31, 2022", silver: 19.08, gold: 1732.74 },
  { name: "August 31, 2022", silver: 19.72, gold: 1764.56 },
  { name: "September 30, 2022", silver: 18.94, gold: 1680.78 },
  { name: "October 31, 2022", silver: 19.43, gold: 1664.45 },
  { name: "November 30, 2022", silver: 21.02, gold: 1725.07 },
  { name: "December 31, 2022", silver: 23.33, gold: 1797.55 },
  { name: "January 31, 2023", silver: 23.65, gold: 1897.71 },
  { name: "February 28, 2023", silver: 21.92, gold: 1854.54 },
  { name: "March 31, 2023", silver: 21.98, gold: 1912.73 },
  { name: "April 30, 2023", silver: 25.01, gold: 1999.77 },
  { name: "May 31, 2023", silver: 24.27, gold: 1992.13 },
  { name: "June 30, 2023", silver: 23.42, gold: 1942.9 },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }
  const query = req.query;
  const commodity = query.commodity;
  const frequency = query.frequency;

  res.status(200).json({
    data: pricesByMonth,
  });
}
