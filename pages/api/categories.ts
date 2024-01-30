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
        const { name, parentCategory } = req.body;
        const categoryDoc = await Category.create({
          name,
          parent: parentCategory
        });
        res.status(200).json(categoryDoc);
      }
    
      if (method === "GET") {
        const categories = await Category.find({});
        res.status(200).json(categories);
      } 

  }