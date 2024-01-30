import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/category";
import { NextApiRequest, NextApiResponse } from "next";



export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    const { method } = req;
    
    await mongooseConnect();

    if (method === "POST") {
        const { name } = req.body;
        const categoryDoc = await Category.create({
          name
        });
        res.status(200).json(categoryDoc);
      }
    
      if (method === "GET") {
        if (req.query?.id) {
          const category = await Category.findOne({_id:req.query.id});
          res.status(200).json(category);
        } else {
        const categories = await Category.find({});
        res.status(200).json(categories);
      }} 

  }