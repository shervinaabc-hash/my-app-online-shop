"use client"
import Container from '@/src/components/container'
import axios from 'axios';
import  { ChangeEvent, useState } from 'react'
import React from 'react';

function AdminPanel() {
    const [newProduct, setNewProduct] = useState({
        title: "",
        price: "",
        description: "",
        image: "",
    });

    const handleNewProduct = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { value, name } = e.target;

        setNewProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    const handleCreateButton = () => {
        console.log(newProduct);
        axios({
            method: "post",
            url:"http://localhost:3002/prouduct",
            data:{
                id: Math.floor(Math.random( )* 100),
                title: newProduct.title,
                price: newProduct.price,
                image: newProduct.image

            
            }

        })
    };

    return (
        <div className='p-4 text_right rtl bg-blue-300 '>
            <Container>
                <div className=' grid grid-cols-3 py-2 gap-10 '>
                    <input onChange={handleNewProduct} className='border' type="title" placeholder='عنوان محصول' name='title' />
                    <input onChange={handleNewProduct} className='border' type="number" placeholder='قیمت' name='price'/>
                    <input onChange={handleNewProduct} className='border' type="text" placeholder='عکس' name='image' />
                </div>

                <textarea onChange={handleNewProduct} className='w-full mt-4 border' name='description' id='' placeholder=' توضیحات'></textarea>
                <button onClick={handleCreateButton} className='bg-amber-500 rounded px-4 py-1 text-white'>ساخت محصول جدید </button>
            </Container>
        </div>
    )
}

export default AdminPanel