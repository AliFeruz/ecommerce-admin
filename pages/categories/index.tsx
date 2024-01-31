import Layout from '@/components/Layout'
import { Category } from '@/types';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { withSwal } from 'react-sweetalert2';

interface CreateCategoryRequest {
    name: string;
    parentCategory?: string; 
}

const Categories = ({ swal, ...props }: { swal: any }) => {
    const [editedCategory, setEditedCategory] = useState<Category | null>(null)
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

    function deleteCategory(category: Category){
        swal.fire({
            title: 'Are you sure?',
            text: `Do you want to delete ${category.name}`,
            showCancelButton: true,
            confirmButtonText: 'Yes, Delete!',
            confirmButtonColor: '#d55',
            reverseButtons: true
        }).then(async (result: any) => {
            if (result.isConfirmed) {
                const {_id} = category;
                await axios.delete('/api/categories?_id=' + _id);
                fetchCategories();
            }
        })
    }

    function editCategory(category: Category){
        setEditedCategory(category);
        setName(category.name);
        setParentCategory(category?.parent?._id?.toString() || '')
    }

   async function createCategory(e: React.FormEvent){
        e.preventDefault();

        let requestBody: CreateCategoryRequest = { name };

       
        if (parentCategory !== '') {
            requestBody.parentCategory = parentCategory;
        }

        if (editedCategory) {
            await axios.put('/api/categories', {...requestBody, _id: editedCategory._id});
            setEditedCategory(null)
        } else {
            await axios.post('/api/categories', requestBody);
        }  
            setName('');
            fetchCategories();
    }

  return (
    <Layout>
        <div className='p-2 my-4'>
        <h1 className='text-2xl'>Categories</h1>
        </div>
        <form onSubmit={createCategory} className='flex flex-col gap-2'>
        <p>{editedCategory ? `Edit category ${editedCategory.name}` : 'Create new category'}</p>
        <div className='flex gap-2'>
        <select className='w-50 rounded-md border border-sky-500' 
        value={parentCategory}
        onChange={e => setParentCategory(e.target.value)}>
        <option value='' >No parent category</option>
        {categories.length > 0 && categories.map((category: Category) => (
        <option key={category._id} value={category._id}>{category.name}</option>
        )) }
        </select>
        <input type="text" placeholder='Category name' 
        value={name} onChange={(e) => setName(e.target.value)}/>   
        <button type='submit'className='btn-primary'>Save</button>
        </div>
        </form>
        <div className='mt-2'>
            <table className='basic'>
                <thead>
                    <tr>
                        <td>Category name</td>
                        <td>Parent category</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    {categories.length > 0 && categories.map((category: Category) => (
                        <tr key={category._id}>
                        <td>{category.name}</td>
                        <td>{category?.parent?.name}</td>
                        <td>
                            <button onClick={() => editCategory(category)}className='btn-primary'>Edit</button>
                        </td>
                        <td>
                            <button onClick={() => deleteCategory(category)}
                            className='btn-primary'>Delete</button>
                        </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </Layout>
  )
}

export default withSwal(Categories)