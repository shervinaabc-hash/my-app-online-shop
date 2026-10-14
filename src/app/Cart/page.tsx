"use client";
import CartItem from "@/src/components/CartItem";
import Container from "@/src/components/container";
import { TProudoctItemProops } from "@/src/components/proudoctItem";
import { useShopingCartP } from "@/src/context/ShopingCartItemPro";
import { formatPrice } from "@/src/utils/number";

import axios from "axios";
import React, { useEffect, useState } from "react";

type TDiscountPrice = {
  id: number;
  code: string;
  percentage: number;
};

function Cart() {
  const { cartItems } = useShopingCartP();
  const [data, setData] = useState<TProudoctItemProops[]>([]);
  const [discountCod, setDiscountCod] = useState("");
  const [disCountPrice, setDisCountPrice] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);
  const [discountError, setDiscountError] = useState("");

  useEffect(() => {
    axios(`http://localhost:3002/prouduct`).then((result) => {
      const { data } = result;
      setData(data);
    });
  }, []);

  const totalPrice = cartItems.reduce((total, item) => {
    const selectProduct = data.find(
      (product) => product.id == item.id.toString(),
    );

    return total + (selectProduct?.price || 0) * item.qty;
  }, 0);

  const handelSubmiteDiscount = () => {
    axios(`http://localhost:3002/discounts?code=${discountCod.trim()}`)
      .then((result) => {
        const data = result.data as TDiscountPrice[];

        if (data.length === 0) {
          setDiscountError("کد تخفیف معتبر نیست");
          setDisCountPrice(0);
          setFinalPrice(totalPrice);
          return;
        }

        setDiscountError("");
        const disCountPrice = (totalPrice * data[0].percentage) / 100;
        setDisCountPrice(disCountPrice);
        setFinalPrice(totalPrice - disCountPrice);
      })
      .catch(() => setDiscountError("خطا در ارتباط با سرور"));
  };

  return (
    <>
      <Container>
        <h1 className="rtl py-2">سبد خرید</h1>
        <div className="">
          {cartItems.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
        </div>

        <div className="bg bg-yellow-200 text-right rtl mb-4 py-2 border 1px solid px-2 rounded">
          <p>
            قیمت کل:<span>{formatPrice(totalPrice)}$</span>
          </p>
          <p>
            تخفیف: <span>{formatPrice(disCountPrice)}$</span>
          </p>
          <h3>
            قیمت نهایی:
            <span>{formatPrice(finalPrice)}$</span>
          </h3>
          <button
            onClick={handelSubmiteDiscount}
            className="bg-red-700 py-1 px-4 rounded cursor-pointer"
          >
            اعمال
          </button>
          <input
            className="border py-1 ml-2 rounded"
            placeholder="کد تخفیف را اینجا وارد کنید "
            type="text"
            onChange={(e) => setDiscountCod(e.target.value)}
          />
          {discountError && (
            <p className="text-red-600 text-sm mt-2">{discountError}</p>
          )}
        </div>
      </Container>
    </>
  );
}

export default Cart;
