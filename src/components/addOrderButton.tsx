"use client";

import { useShopingCartP } from "../context/ShopingCartItemPro";

type TaddToCartproops = {
  id: string;
};



function AddOrderButton({ id }: TaddToCartproops) {
  const { cartItems,handelIncreasAddToCart,getProductQtyNumber ,handleMinusClick,handelRemoveItem} = useShopingCartP();
console.log(cartItems);

  return (
    <div>
      <div className="flex items-center gap-3 py-4">
        <button onClick={()=>handelIncreasAddToCart(parseInt(id))} className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-white/5 text-lg font-bold text-white transition hover:border-amber-500 hover:text-amber-400 active:scale-95">+</button>
        <span className="min-w-6 text-center font-bold text-white">{getProductQtyNumber(parseInt(id))}</span>
        <button onClick={()=>handleMinusClick(parseInt(id))} className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-white/5 text-lg font-bold text-white transition hover:border-amber-500 hover:text-amber-400 active:scale-95">-</button>
      </div>
      <button onClick={()=>handelRemoveItem(parseInt(id))} className="cursor-pointer rounded-xl border border-red-500/40 px-5 py-2 text-sm text-red-400 transition hover:bg-red-500/10">
       حذف محصول
      </button>
    </div>
  );
}

export default AddOrderButton;



// "use client";

// import { useState } from "react";
// import { useShopingCartP } from "../context/ShopingCartItemPro";

// type TAddToCartproops = {
//   id: string;
// };

// function AddOrderButton({ id }: TAddToCartproops) {
//   const { cartItems, handelIncreasAddToCart, getProductQtyNumber } = useShopingCartP();
  
//   // State برای دکمه مثبت
//   const [isPlusClicked, setIsPlusClicked] = useState(false);
//   // State برای دکمه منفی
//   const [isMinusClicked, setIsMinusClicked] = useState(false);

//   const handlePlusClick = () => {
//     handelIncreasAddToCart(parseInt(id));
//     setIsPlusClicked(true);
//     setTimeout(() => setIsPlusClicked(false), 500);
//   };

//   const handleMinusClick = () => {
//     // تابع کاهش تعداد از Context شما (مثلاً handelDecreaseAddToCart)
//     // handelDecreaseAddToCart(parseInt(id)); 

//     setIsMinusClicked(true);
//     setTimeout(() => setIsMinusClicked(false), 500);
//   };

//   return (
//     <div>
//       <div className="py-4">
//         {/* دکمه مثبت - حرکت افکت از راست به چپ */}
//         <button
//           onClick={handlePlusClick}
//           className={`relative overflow-hidden bg-blue-700 text-white px-4 py-2 rounded cursor-pointer transition-all duration-500 ease-out bg-gradient-to-l from-sky-300 to-sky-300 bg-right bg-no-repeat ${
//             isPlusClicked ? "bg-[length:100%_100%]" : "bg-[length:0%_100%]"
//           }`}
//         >
//           +
//         </button>

//         <span className="font-bold mx-4 underline">
//           {getProductQtyNumber(parseInt(id))}
//         </span>
        
//         {/* دکمه منفی - حرکت افکت از چپ به راست با رنگ قرمز/رز */}
//         <button
//           onClick={handleMinusClick}
//           className={`relative overflow-hidden bg-blue-700 text-white px-4 py-2 rounded cursor-pointer transition-all duration-500 ease-out bg-gradient-to-r from-rose-400 to-rose-400 bg-left bg-no-repeat ${
//             isMinusClicked ? "bg-[length:100%_100%]" : "bg-[length:0%_100%]"
//           }`}
//         >
//           -
//         </button>
//       </div>

//       <button className="bg-red-700 text-black font-bold rounded shadow-md px-6 py-2 cursor-pointer">
//         خرید محصول
//       </button>
//     </div>
//   );
// }

// export default AddOrderButton;