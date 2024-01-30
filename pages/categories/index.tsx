import Layout from '@/components/Layout'
import { Category } from '@/types';
import axios from 'axios';
import React, { useEffect, useState } from 'react'



const categories = () => {
    const [name, setName] = useState('');
    const [categories, setCategories] = useState([]);
    const [parentCategory, setParentCategory] = useState('')

    useEffect(() => {
        fetchCategories()
    },[])

    function fetchCategories (){
        axios.get('/api/categories').then(result => {
            setCategories(result.data)
        })
    }

   async function createCategory(e: React.FormEvent){
        e.preventDefault();

        const response = await axios.post('/api/categories', {name, parentCategory});
        if (response.status === 200){
            setName('');
            fetchCategories();
        }
    }
  return (
    <Layout>
        <div className='p-2 my-4'>
        <h1 className='text-2xl'>Categories</h1>
        </div>
        <form onSubmit={createCategory} className='flex flex-col gap-2'>
        <label>New category name</label>
        <div className='flex gap-2'>
        <input type="text" placeholder='Category name' 
        value={name} onChange={(e) => setName(e.target.value)}/>
        <select className='w-40 rounded-md border border-sky-500' 
        value={parentCategory}
        onChange={(e) => setParentCategory(e.target.value)}>
            {categories.length > 0 && categories.map((category: Category) => (
            <option value={category._id}>{category.name}</option>
                    )) }
        </select>
        <button type='submit'className='btn-primary'>Save</button>
        </div>
        </form>
        <div className='mt-2'>
            <table className='w-full'>
                <thead>
                    <tr>
                        <td>Category name</td>
                    </tr>
                </thead>
                <tbody>
                    {categories.length > 0 && categories.map((category: Category) => (
                        <tr key={category._id}>
                        <td>{category.name}</td>
                        </tr>
                    )) }
                </tbody>
            </table>
        </div>
    </Layout>
  )
}

export default categories