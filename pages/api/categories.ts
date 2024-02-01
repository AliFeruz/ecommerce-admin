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
        const { name, parentCategory, properties } = req.body;
        const categoryDoc = await Category.create({
          name,
          parent: parentCategory,
          properties
        });
        res.status(200).json(categoryDoc);
      }
    
      if (method === "GET") {
        const categories = await Category.find().populate('parent');
        res.status(200).json(categories);
      } 

      if (method === "PUT") {
        const { name, parentCategory, _id, properties } = req.body;
        const categoryDoc = await Category.updateOne({_id},{
          name,
          parent: parentCategory,
          properties
        });
        res.status(200).json(categoryDoc);
      } 

      if (method === 'DELETE') {
        const {_id } = req.query;
        await Category.deleteOne({ _id });
        res.status(200).json(true);
        
      }
  }