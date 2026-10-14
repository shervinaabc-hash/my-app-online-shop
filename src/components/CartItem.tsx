import axios from "axios";
import { useEffect, useState } from "react";
import { TProudoctItemProops } from "./proudoctItem";
import AddOrderButton from "./addOrderButton";
import { formatPrice } from "../utils/number";

type TcartItemProops = {
  id: number;
  qty: number;
};
function CartItem({ id, qty }: TcartItemProops) {
  const [data, setData] = useState({}as TProudoctItemProops );

  useEffect(() => {
    axios(`http://localhost:3002/prouduct/${id}`).then((result) => {
      const { data } = result;
      setData(data);
    });
  }, []);

  return (
    <div className="mb-4 flex gap-4 overflow-hidden rounded-2xl border border-white/10 bg-slate-900 p-3">
      <img className="h-28 w-36 shrink-0 rounded-xl object-cover" src={data.image} alt={data.title} />

      <div className="flex-1">
        <h3 className="font-bold text-white">{data.title}</h3>
        <p className="mt-1 text-sm text-slate-400">
          تعداد: <span className="text-white">{qty}</span>
        </p>
        <p className="mt-1 text-sm text-slate-400">
          قیمت: <span className="text-amber-400">{formatPrice(data.price)}</span>
        </p>
        <AddOrderButton id={id.toString()} />
      </div>
    </div>
  );
}

export default CartItem;
