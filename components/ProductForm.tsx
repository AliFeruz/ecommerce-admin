import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useRouter } from 'next/router';
import { Category, Product, Property } from '@/types';
import { ArrowUpCircleIcon } from '@heroicons/react/24/solid';
import Loader from './Loader';


type Props = {
  product?: Product | null;
};


const ProductForm = ({product}: Props) => {
    const [title, setTitle] = useState(product?.title ||'');
    const [description, setDescription] = useState(product?.description || '');
    const [price, setPrice] = useState(product?.price ||'');
    const [category, setCategory] = useState(product?.category || '');
    const [productProp, setProductProp] = useState<{ [key: string]: string }>(product?.properties as { [key: string]: string } || {})
    const [images, setImages] = useState(product?.images || []);
    const [isuploading, setIsUploading] = useState(false);
    const [categories, setCategories] = useState<Category[]>([])
    const router = useRouter();

    useEffect(() => {
      axios.get('/api/categories').then((res) => {
        setCategories(res.data);
      })
    },[])

    async function saveProduct(e: React.FormEvent) {
      e.preventDefault();
      const data = { title, description, price, images, category, properties: productProp };

      if (product?._id) {
      const res = await axios.put('/api/products', {...data, _id: product?._id });
        if (res.status === 200) {
          router.push('/products');
        }
      } else {
      const response = await axios.post('/api/products', data);
      if (response.status === 200) {
        setTitle('');
        setDescription('');
        setPrice('');
        setImages([]);
        setProductProp({})
        router.push('/products');
      }}
    }

    function setProductProperty(propName: string, value: string) {
      setProductProp((prev: Record<string, string>) => {
        const newProductProps: Record<string, string> = { ...prev };
        newProductProps[propName] = value;
        return newProductProps;
      });
    }
    

    async function uploadImages(e: React.ChangeEvent<HTMLInputElement>) {
      const files = Array.from(e.target?.files || []);
      if (files.length > 0) {
      const data = new FormData();
      for (const file of files) {
        setIsUploading(true)
        data.append('file', file)
      }
      const res = await axios.post('/api/upload', data);

      setImages((prevImages) => {
        return [...prevImages, ...res.data.links]
      });
      setIsUploading(false)
      }
    }

    const propertiesToFill = [];
    if (categories.length > 0 && category) {
      let selCatInfo = categories.find(({_id}) => _id.toString() === category);
      propertiesToFill.push(...Object.values(selCatInfo?.properties ?? []));
      while(selCatInfo?.parent?._id) {
        const parentCat = categories.find(({_id}) => _id.toString() === selCatInfo?.parent?._id);
        propertiesToFill.push(...Object.values(parentCat?.properties || []));
        selCatInfo = parentCat;
      }
    }
    

  return (
    <>
    <form onSubmit={saveProduct} className='mt-6 flex flex-col p-2'>
    <label>Name</label>
    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Product name" className="mb-3"/>
    <label>Add category</label>
    <select value={category} onChange={(e) => setCategory(e.target.value)} 
    className='mb-3 rounded-md border border-sky-500'>
      <option value="">Uncategorized</option>
      {categories.length > 0 && categories.map((category: Category) => (
        <option key={category._id} value={category._id}>{category.name}</option>
      ))}
    </select>
    {propertiesToFill.length > 0 && propertiesToFill.map((property: Property) => (
      <div key={property._id} className='flex gap-2 my-2'>
        <div className='text-xl'>{property.name}</div>
        <select value={productProp[property.name]}
        onChange={(e) => setProductProperty(property.name, e.target.value)}>
        {property.values.map((value) => (
          <option key={value} value={value}>{value}</option>
        ))}
        </select>
      </div>
    ))}
    <label>Photos</label>
    <div className='mb-2 flex flex-wrap gap-4'>
      {!!images?.length && images?.map((link, index) => (
        <div key={index}>
          <img src={link} alt="product image" className='w-24 h-24 rounded-md'/>
        </div>
      ))}
      {isuploading && (
        <div className='p-1 items-center flex'>
         <Loader/>
        </div>
      )}
      <label className='w-24 h-24 cursor-pointer flex gap-2 flex-col items-center justify-center bg-white border mb-3 border-sky-500 rounded-md'>
      <ArrowUpCircleIcon className="w-8 h-8 text-sky-500"/>
      <p className='text-sm text-gray-500'>Upload</p>
      <input type="file" onChange={uploadImages} className='hidden'/>
      </label>
      {!images?.length && (
        <p className='text-xl text-sky-600 text-center'>No photos in this product</p>
      )}
    </div>
    <label>Description</label>
    <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Product description" className="mb-3"/>
    <label>Price (in USD)</label>
    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" className="mb-3"/>
    <div className='flex justify-between'>
    <Link href={'/products'} className='btn-primary'>Cancel</Link>
    <button type='submit' className='btn-primary'>Save</button>
    </div>
    </form>
    </>
    

  )
}

export default ProductForm