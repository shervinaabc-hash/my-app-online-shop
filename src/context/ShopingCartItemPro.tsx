"use client";

import React, { useContext, useEffect, useState } from "react";
import { createContext } from "react";


type TShopingCartItemPro = {
  children: React.ReactNode;
};

type TcartItems = {
  id: number;
  qty: number;
};

type TShopingCartP = {
  cartItems: TcartItems[];
  handelIncreasAddToCart: (id: number) => void;
  getProductQtyNumber: (id: number)=> number;
  getproudocttotaly: number;
  handleMinusClick: (id:number)=> void;
  handelRemoveItem:(id: number)=> void;

};

const ShopingCartP = createContext({} as TShopingCartP);

export const useShopingCartP = () => {
  return useContext(ShopingCartP);
};

function ShopingCartItemProvider({ children }: TShopingCartItemPro) {
  const [cartItems, setCartItems] = useState<TcartItems[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
/////////////////اضافه کردن به سبد خرید
const getproudocttotaly = cartItems.reduce((totalQty,Item)=>{return totalQty + Item.qty},0)

///////////////تغییر عدد بین باتن
const getProductQtyNumber= (id: number)=>{
  return cartItems.find((item)=> item.id == id )?.qty || 0;
}
  ///////اضافه کردن دکمه افزایش و کاهش برای سفارش
  //////////// وجود دارد
  const handelIncreasAddToCart = (id: number) => {
    setCartItems((currentItems) => {
      const isNotProduct = currentItems.find((item) => item.id == id) == null;
      if (isNotProduct) {
        return [...currentItems , { id: id, qty: 1 }];
      } else {
        return currentItems.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              qty: item.qty + 1,
            };
          }else{
            return item
          }
        });
      }
    });
  };


  const handleMinusClick= (id: number) => {
 setCartItems((currentItems)=>{
  const isLastone = currentItems.find((item)=> item.id == id)?.qty == 1
  if(isLastone){
    return currentItems.filter ((item)=> item.id != id)

  }else{
    return currentItems.map((item)=>{
      if(item.id === id){
        return{...item, qty: item.qty - 1}

      }else{
        return item
      }
    })
  }
 })
  }

  const handelRemoveItem = (id: number)=>{
    setCartItems((currentItems)=>{
     return currentItems.filter((items)=> items.id != id)
    })
  }
//  useEffect(() => {
//     const storedCartItems = localStorage.getItem("cartItems");
//     try {
//       if (storedCartItems) {
//         // eslint-disable-next-line react-hooks/set-state-in-effect
//         setCartItems(JSON.parse(storedCartItems));
//       }
//     } catch {
//       localStorage.removeItem("cartItems");
//     }
//     setIsLoaded(true);
//   }, []);







useEffect(() => {
const storedCartItems = localStorage.getItem("cartItems")
try {
  if(storedCartItems){
   // eslint-disable-next-line react-hooks/set-state-in-effect
    setCartItems(JSON.parse(storedCartItems));
  }
  }catch{
    localStorage.removeItem("cartItems")
  }
  setIsLoaded(true)
}, []);

useEffect(()=>{
 if(!isLoaded) return;
 localStorage.setItem("cartItems",JSON.stringify(cartItems))
},[cartItems, isLoaded])





 
//   useEffect(() => {
// const storedCartItems = localStorage.getItem("cartItems")

// if(storedCartItems){
//    // eslint-disable-next-line react-hooks/set-state-in-effect
//   setCartItems(JSON.parse(storedCartItems))
// }

//   }, []);
  
// useEffect(() => {

//   localStorage.setItem("cartItems", JSON.stringify())

// }, [cartItems]);

  return (
    <ShopingCartP.Provider value={{ cartItems, handelIncreasAddToCart,getProductQtyNumber , getproudocttotaly , handleMinusClick ,handelRemoveItem}}>
      {children}
    </ShopingCartP.Provider>
  );
}

export default ShopingCartItemProvider;
