// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  geo: any;
};

// api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log(req);
  res.status(200).json({ geo: req.body });
}
