// "use client";

// import React, { useContext, useEffect, useState } from "react";
// import { createContext } from "react";


// type TShopingCartItemPro = {
//   children: React.ReactNode;
// };

// type TcartItems = {
//   id: number;
//   qty: number;
// };

// type TShopingCartP = {
//   cartItems: TcartItems[];
//   handelIncreasAddToCart: (id: number) => void;
//   getProductQtyNumber: (id: number)=> number;
//   getproudocttotaly: number;
//   handleMinusClick: (id:number)=> void;
//   handelRemoveItem:(id: number)=> void;

// };

// const ShopingCartP = createContext({} as TShopingCartP);

// export const useShopingCartP = () => {
//   return useContext(ShopingCartP);
// };

// function ShopingCartItemProvider({ children }: TShopingCartItemPro) {
//   const [cartItems, setCartItems] = useState<TcartItems[]>([]);
//     const [isLoaded, setIsLoaded] = useState(false);
// /////////////////اضافه کردن به سبد خرید
// const getproudocttotaly = cartItems.reduce((totalQty,Item)=>{return totalQty + Item.qty},0)

// ///////////////تغییر عدد بین باتن
// const getProductQtyNumber= (id: number)=>{
//   return cartItems.find((item)=> item.id == id )?.qty || 0;
// }
//   ///////اضافه کردن دکمه افزایش و کاهش برای سفارش
//   //////////// وجود دارد
//   const handelIncreasAddToCart = (id: number) => {
//     setCartItems((currentItems) => {
//       const isNotProduct = currentItems.find((item) => item.id == id) == null;
//       if (isNotProduct) {
//         return [...currentItems , { id: id, qty: 1 }];
//       } else {
//         return currentItems.map((item) => {
//           if (item.id === id) {
//             return {
//               ...item,
//               qty: item.qty + 1,
//             };
//           }else{
//             return item
//           }
//         });
//       }
//     });
//   };


//   const handleMinusClick= (id: number) => {
//  setCartItems((currentItems)=>{
//   const isLastone = currentItems.find((item)=> item.id == id)?.qty == 1
//   if(isLastone){
//     return currentItems.filter ((item)=> item.id != id)

//   }else{
//     return currentItems.map((item)=>{
//       if(item.id === id){
//         return{...item, qty: item.qty - 1}

//       }else{
//         return item
//       }
//     })
//   }
//  })
//   }

//   const handelRemoveItem = (id: number)=>{
//     setCartItems((currentItems)=>{
//      return currentItems.filter((items)=> items.id != id)
//     })
//   }


// useEffect(() => {
// const storedCartItems = localStorage.getItem("cartItems")
// try {
//   if(storedCartItems){
//    // eslint-disable-next-line react-hooks/set-state-in-effect
//     setCartItems(JSON.parse(storedCartItems));
//   }
//   }catch{
//     localStorage.removeItem("cartItems")
//   }
//   setIsLoaded(true)
// }, []);

// useEffect(()=>{
//  if(!isLoaded) return;
//  localStorage.setItem("cartItems",JSON.stringify(cartItems))
// },[cartItems, isLoaded])



//   return (
//     <ShopingCartP.Provider value={{ cartItems, handelIncreasAddToCart,getProductQtyNumber , getproudocttotaly , handleMinusClick ,handelRemoveItem}}>
//       {children}
//     </ShopingCartP.Provider>
//   );
// }

// export default ShopingCartItemProvider;

"use client";

import React, { useContext, useEffect, useState } from "react";
import { createContext } from "react";

type TShopingCartItemPro = {
  children: React.ReactNode;
};

type TcartItems = {
  id: string; // تغییر از number به string برای هماهنگی با idهای محصولات
  qty: number;
};

type TShopingCartP = {
  cartItems: TcartItems[];
  handelIncreasAddToCart: (id: string) => void; // تغییر به string
  getProductQtyNumber: (id: string) => number; // تغییر به string
  getproudocttotaly: number;
  handleMinusClick: (id: string) => void; // تغییر به string
  handelRemoveItem: (id: string) => void; // تغییر به string
};

const ShopingCartP = createContext({} as TShopingCartP);

export const useShopingCartP = () => {
  return useContext(ShopingCartP);
};

function ShopingCartItemProvider({ children }: TShopingCartItemPro) {
  const [cartItems, setCartItems] = useState<TcartItems[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // تعداد کل محصولات در سبد خرید
  const getproudocttotaly = cartItems.reduce(
    (totalQty, Item) => totalQty + Item.qty,
    0
  );

  // گرفتن تعداد یک محصول خاص بر اساس id
  const getProductQtyNumber = (id: string) => {
    return cartItems.find((item) => item.id === id)?.qty || 0;
  };

  // افزودن یا افزایش تعداد محصول
  const handelIncreasAddToCart = (id: string) => {
    setCartItems((currentItems) => {
      const isNotProduct = currentItems.find((item) => item.id === id) == null;
      if (isNotProduct) {
        return [...currentItems, { id: id, qty: 1 }];
      } else {
        return currentItems.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              qty: item.qty + 1,
            };
          } else {
            return item;
          }
        });
      }
    });
  };

  // کاهش تعداد محصول
  const handleMinusClick = (id: string) => {
    setCartItems((currentItems) => {
      const isLastone = currentItems.find((item) => item.id === id)?.qty === 1;
      if (isLastone) {
        return currentItems.filter((item) => item.id !== id);
      } else {
        return currentItems.map((item) => {
          if (item.id === id) {
            return { ...item, qty: item.qty - 1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  // حذف کامل محصول از سبد خرید
  const handelRemoveItem = (id: string) => {
    setCartItems((currentItems) => {
      return currentItems.filter((items) => items.id !== id);
    });
  };

  // خواندن از LocalStorage
// خواندن از LocalStorage بدون اخطار لینتر
// خواندن از LocalStorage بدون اخطار
  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    try {
      if (storedCartItems) {
        const parsed = JSON.parse(storedCartItems);
        // استفاده از تایپ مشخص به جای هر گونه آمار پیش‌فرض
        const normalizedItems = parsed.map((item: { id: string | number; qty: number }) => ({
          ...item,
          id: String(item.id),
        }));
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setCartItems(normalizedItems);
      }
    } catch {
      localStorage.removeItem("cartItems");
    }
    setIsLoaded(true);
  }, []);
  // ذخیره در LocalStorage
  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems, isLoaded]);

  return (
    <ShopingCartP.Provider
      value={{
        cartItems,
        handelIncreasAddToCart,
        getProductQtyNumber,
        getproudocttotaly,
        handleMinusClick,
        handelRemoveItem,
      }}
    >
      {children}
    </ShopingCartP.Provider>
  );
}

export default ShopingCartItemProvider;
