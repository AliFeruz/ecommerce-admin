import { NextApiRequest, NextApiResponse } from "next";
import multiparty from "multiparty";
import { PutObjectCommand, S3Client, S3ClientConfig } from '@aws-sdk/client-s3';
import fs from "fs";
import mime from 'mime-types';
  

const bucketName = 'ecommerce-af';

interface FormField {
  fieldName: string;
  originalFilename: string;
  path: string;
  headers: Record<string, string>;
  size: number;
}

interface FormData {
  fields: { [fieldName: string]: string };
  files: {file: FormField[]};
}


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    const form = new multiparty.Form();
    const {fields, files} : FormData = await new Promise(async (resolve, reject) => {
        form.parse(req, (err, fields, files) => {
            if (err) reject (err);
            resolve({fields, files});
        })
    })
    
    const clientConfig: S3ClientConfig = {
        region: 'eu-north-1',
        credentials: {
            accessKeyId: process.env.S3_ACCESS_KEY || '',
            secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
        }, 
    };

     const client = new S3Client(clientConfig);
     const links = [];

     for (const file of files.file) {
        const ext = file.originalFilename.split('.').pop();
        const fileName = `${Date.now()}.${ext}`;

        
        await client.send(new PutObjectCommand({
            Bucket: bucketName, 
            Key: fileName, 
            Body: fs.readFileSync(file.path), 
            ACL: 'public-read',
            ContentType: mime.lookup(file.originalFilename) || 'application/octet-stream',
        }));
        const link = `https://${bucketName}.s3.amazonaws.com/${fileName}`;
        links.push(link);
    }
    console.log(links);
    return res.json({links})
  }


export const config = {
    api: {bodyParser: false}
}

   


    
   