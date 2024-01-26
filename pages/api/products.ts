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
    if (req.query?.id) {
      const product = await Product.findOne({_id:req.query.id});
      res.status(200).json(product);
    } else {
    const products = await Product.find({});
    res.status(200).json(products);
  }} 
  
  if (method === 'DELETE') {
    if (req.query?.id) {
      await Product.deleteOne({_id:req.query.id});
      res.status(200).json(true);
    } 
  }

  if (method === "POST") {
      const { title, description, price } = req.body;
      const productDoc = await Product.create({
        title,
        description,
        price,
      });
      res.status(200).json(productDoc);
    }
  if (method === 'PUT') {
    const { title, description, price, _id } = req.body;
    const product = await Product.findOneAndUpdate({_id}, {title, description, price})
    res.status(200).json(product);
  }
}
