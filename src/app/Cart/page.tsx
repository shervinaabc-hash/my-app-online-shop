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
    <Container>
      <h1 className="py-8 text-2xl font-bold text-white">سبد خرید</h1>

      {cartItems.length === 0 ? (
        <p className="py-16 text-center text-slate-400">سبد خرید شما خالی است.</p>
      ) : (
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {cartItems.map((item) => (
              <CartItem key={item.id} {...item} />
            ))}
          </div>

          <div className="h-fit rounded-2xl border border-white/10 bg-slate-900 p-6">
            <div className="space-y-3 text-sm text-slate-400">
              <p className="flex justify-between">
                قیمت کل: <span className="text-white">{formatPrice(totalPrice)}</span>
              </p>
              <p className="flex justify-between">
                تخفیف: <span className="text-white">{formatPrice(disCountPrice)}</span>
              </p>
              <h3 className="flex justify-between border-t border-white/10 pt-3 text-base font-bold text-white">
                قیمت نهایی:
                <span className="text-amber-400">{formatPrice(finalPrice || totalPrice - disCountPrice)}</span>
              </h3>
            </div>

            <div className="mt-6 flex gap-2">
              <input
                className="min-w-0 flex-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-slate-500 outline-none focus:border-amber-500"
                placeholder="کد تخفیف"
                type="text"
                onChange={(e) => setDiscountCod(e.target.value)}
              />
              <button
                onClick={handelSubmiteDiscount}
                className="cursor-pointer rounded-xl bg-amber-500 px-4 py-2 text-sm font-bold text-slate-950 transition hover:bg-amber-400"
              >
                اعمال
              </button>
            </div>
            {discountError && (
              <p className="mt-2 text-sm text-red-400">{discountError}</p>
            )}
          </div>
        </div>
      )}
    </Container>
  );
}

export default Cart;
