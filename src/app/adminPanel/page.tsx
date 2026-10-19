"use client"
import Container from '@/src/components/container'
import { categories } from '@/src/utils/categories';
import axios from 'axios';
import  { ChangeEvent, useState } from 'react'
import React from 'react';

const inputClass =
    'rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-amber-500 focus:ring-4 focus:ring-amber-500/20'

function AdminPanel() {
    const [newProduct, setNewProduct] = useState({
        title: "",
        price: "",
        description: "",
        image: "",
        category: categories[0].slug,
    });

    const handleNewProduct = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
                id: Math.floor(Math.random( )* 100).toString(),
                title: newProduct.title,
                price: Number(newProduct.price),
                description: newProduct.description,
                category: newProduct.category,
                image: newProduct.image || `/pic/solar/${newProduct.category}.svg`

            
            }

        })
    };

    return (
        <Container>
            <div className='mx-auto my-10 max-w-3xl rounded-3xl border border-white/10 bg-slate-900 p-8'>
                <h1 className='text-2xl font-bold text-white'>افزودن محصول جدید</h1>
                <p className='mt-1 text-sm text-slate-400'>محصول جدید به دیتابیس json-server اضافه می‌شود.</p>

                <div className='mt-6 grid gap-4 sm:grid-cols-2'>
                    <input onChange={handleNewProduct} className={inputClass} type="text" placeholder='عنوان محصول' name='title' />
                    <input onChange={handleNewProduct} className={inputClass} type="number" placeholder='قیمت (تومان)' name='price'/>
                    <select onChange={handleNewProduct} value={newProduct.category} className={inputClass} name='category'>
                        {categories.map((item) => (
                            <option key={item.slug} value={item.slug} className='bg-slate-900'>{item.title}</option>
                        ))}
                    </select>
                    <input onChange={handleNewProduct} className={inputClass} type="text" placeholder='آدرس عکس (اختیاری)' name='image' />
                </div>

                <textarea onChange={handleNewProduct} className={`${inputClass} mt-4 min-h-28 w-full`} name='description' id='' placeholder='توضیحات'></textarea>
                <button onClick={handleCreateButton} className='mt-4 cursor-pointer rounded-xl bg-amber-500 px-6 py-3 font-bold text-slate-950 shadow-lg shadow-amber-500/30 transition hover:bg-amber-400'>ساخت محصول جدید</button>
            </div>
        </Container>
    )
}

export default AdminPanel
