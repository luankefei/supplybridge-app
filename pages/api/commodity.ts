// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { request } from "config/axios";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }
  // Retrieve the token from the cookie using the 'req.headers.cookie' property
  const cookie = req.headers.cookie;
  const token = cookie?.split("=")[1];

  const { commodity, st, ed } = req.query;
  request
    .get(`/data/materialpricing?name=${commodity}&st=${st}&ed=${ed}`)
    .then((response) => {
      debugger;
      res.status(200).json({
        data: response.data,
      });
    })
    .catch((err) => {
      debugger;
      res.status(500).json({
        message: err.message,
      });
    });
}
