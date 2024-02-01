import Layout from '@/components/Layout'
import { Category, Property } from '@/types';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { withSwal } from 'react-sweetalert2';

interface CreateCategoryRequest {
    name: string;
    parentCategory?: string; 
    properties?: Property[];
}

const Categories = ({ swal, ...props }: { swal: any }) => {
    const [editedCategory, setEditedCategory] = useState<Category | null>(null)
    const [name, setName] = useState('');
    const [categories, setCategories] = useState([]);
    const [parentCategory, setParentCategory] = useState('');
    const [properties, setProperties] = useState<Property[]>([])
   

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
        setParentCategory(category?.parent?._id?.toString() || '');
        setProperties(category.properties || [])
    }

   async function createCategory(e: React.FormEvent){
        e.preventDefault();

        let requestBody: CreateCategoryRequest = { name, properties };

       
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
            setParentCategory('');
            setProperties([]);
            fetchCategories();
            
    }

    function addProperty() {
        setProperties((prevProperties) => [
          ...prevProperties,
          { name: '', values: '' },
        ]);
      }

    function handlePropertyName(index: number, property: Property, newName: string) {
        setProperties((prev) => {
          const updatedProperties = [...prev];
          updatedProperties[index].name = newName;
          return updatedProperties;
        });
      }
    
      function handlePropertyValues(index: number, property:Property, newValues: string) {
        setProperties((prev) => {
          const updatedProperties = [...prev];
          updatedProperties[index].values = newValues;
          return updatedProperties;
        });
      }

    function removeProperty(index: number) {
        setProperties((prev) => prev.filter((_, i) => i !== index));
    }

  return (
    <Layout>
        <div className='p-2 my-4'>
        <h1 className='text-2xl'>Categories</h1>
        </div>
        <form onSubmit={createCategory} className='flex flex-col gap-2'>
        <p>{editedCategory ? `Edit category ${editedCategory.name}` : 'Create new category'}</p>
        <div className='flex-col'>
            <div className='flex gap-2 mb-2'>
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
            </div>
         <div className='flex-col mb-1 gap-2'>
            <div className='gap-2 mb-1 flex-col flex'>
                <label>Properties</label>
                <button type='button' onClick={addProperty}
                className='btn-primary mb-1'>Add new property</button>
            </div>
            {properties.length > 0 && properties.map((property: Property, index) => (
                <div className='flex  mb-2 gap-1' key={index}>
                   <input type="text" onChange={(e) => handlePropertyName(index, property, e.target.value)}
                   value={property.name} placeholder='property name (example: color)' />
                   <input type="text" onChange={(e) => handlePropertyValues(index, property, e.target.value)}
                   value={property.values} placeholder='values, comma separated' />
                   <button onClick={() => removeProperty(index)} type='button'
                   className="btn-primary">Remove</button>
                </div>
            ))}
            <div className='flex justify-between mb-2'>
                {editedCategory && (
                    <button onClick={() => {
                        setEditedCategory(null);
                        setName('');
                        setParentCategory('');
                        setProperties([])
                    }}
                    type='button'
                    className='btn-primary'>Cancel</button>
                )}
            <button type='submit'className='btn-primary'>Save</button>
            </div>
         </div>
        </div>
        </form>
        {!editedCategory && (
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
        )}
    </Layout>
  )
}

export default withSwal(Categories)