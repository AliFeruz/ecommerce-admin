import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/product";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
    
  await mongooseConnect();

  if (method === "GET") {
    const products = await Product.find({});
    res.status(200).json(products);

  } else if (method === "POST") {
      const { title, description, price } = req.body;
      const productDoc = await Product.create({
        title,
        description,
        price,
      });

      res.status(200).json(productDoc);
    }
}
