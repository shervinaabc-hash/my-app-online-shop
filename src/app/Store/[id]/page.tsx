// import AddOrderButton from "@/src/components/addOrderButton";
// import Container from "@/src/components/container";
// import { TProudoctItemProops } from "@/src/components/proudoctItem";
// import { getCategoryTitle } from "@/src/utils/categories";

// import { formatPrice } from "@/src/utils/number";
// import Image from "next/image";
// import Link from "next/link";
// import React from "react";

// type TPages = {
//   params: Promise<{ id : string }>;
//   searchParams: Promise<Record<string, string | string[] | undefined>>;
// };
// async function Pages({params}: TPages) {
//   const { id } = await params;

 

//   const result = await fetch(`http://localhost:3002/prouduct/${id}`);
//   const data = (await result.json()) as TProudoctItemProops;
//   const categoryTitle = getCategoryTitle(data.category);

//   return (
//     <Container>
//       <div className="mt-8 grid overflow-hidden rounded-3xl border border-white/10 bg-slate-900 md:grid-cols-2">
//         <div className="relative min-h-80 bg-slate-800">
//           <Image
//             src={data.image}
//             alt={data.title}
//             fill
//             className="object-contain p-6"
//             sizes="(max-width: 768px) 100vw, 50vw"
//           />
//         </div>
//         <div className="flex flex-col p-8">
//           {categoryTitle && (
//             <Link
//               href={`/Store?category=${data.category}`}
//               className="w-fit rounded-full bg-amber-500/10 px-3 py-1 text-xs text-amber-400"
//             >
//               {categoryTitle}
//             </Link>
//           )}
//           <h1 className="mt-4 text-2xl font-bold text-white">{data.title}</h1>

//           <p className="mt-4 leading-8 text-slate-400">{data.description}</p>
//           <p className="mt-6 text-2xl font-black text-amber-400">{formatPrice(data.price)}</p>
//           <AddOrderButton id={id}/>
//         </div>
//       </div>
//     </Container>
//   );
// }

// export default Pages;

"use client";

import Container from "@/src/components/container";
import { products } from "@/src/utils/products";
import { getCategoryTitle } from "@/src/utils/categories";
import { notFound, useParams } from "next/navigation";
import { useShopingCartP } from "@/src/context/ShopingCartItemPro";

export default function ProductDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  // پیدا کردن محصول از فایل محلی بر اساس id
  const product = products.find((item) => item.id === id);

  // اگر محصول پیدا نشد، صفحه 404 نشان بده
  if (!product) {
    notFound();
  }

  const categoryTitle = getCategoryTitle(product.category);

  // استفاده از توابع سبد خرید
  const { handelIncreasAddToCart, handleMinusClick, getProductQtyNumber } = useShopingCartP();
  const qty = getProductQtyNumber(product.id);

  return (
    <Container>
      <div className="py-12">
        <span className="text-sm text-amber-400">{categoryTitle}</span>
        <h1 className="mt-2 text-3xl font-bold text-white">{product.title}</h1>
        
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900 p-6 flex items-center justify-center">
            <img src={product.image} alt={product.title} className="max-h-80 object-contain" />
          </div>
          
          <div className="flex flex-col justify-between">
            <div>
              <p className="text-slate-300 leading-8">{product.description}</p>
            </div>
            
            <div className="mt-8 border-t border-white/10 pt-6">
              <p className="text-2xl font-black text-amber-400 mb-6">
                {product.price.toLocaleString()} تومان
              </p>

              {/* بخش دکمه‌های افزودن به سبد خرید و کنترل تعداد */}
              {qty === 0 ? (
                <button
                  onClick={() => handelIncreasAddToCart(product.id)}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-3 px-6 rounded-xl transition duration-200"
                >
                  افزودن به سبد خرید
                </button>
              ) : (
                <div className="flex items-center justify-between bg-slate-900 border border-white/10 p-3 rounded-xl">
                  <span className="text-sm text-slate-300">تعداد در سبد خرید:</span>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleMinusClick(product.id)}
                      className="bg-red-600 hover:bg-red-700 text-white w-10 h-10 rounded-lg font-bold flex items-center justify-center transition"
                    >
                      -
                    </button>
                    <span className="text-xl font-bold text-white w-6 text-center">{qty}</span>
                    <button
                      onClick={() => handelIncreasAddToCart(product.id)}
                      className="bg-amber-500 hover:bg-amber-600 text-slate-950 w-10 h-10 rounded-lg font-bold flex items-center justify-center transition"
                    >
                      +
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}