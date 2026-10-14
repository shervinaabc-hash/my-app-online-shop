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
    <div className=" grid grid-cols-9 bg-sky-100 mb-2 rounded">
      <div className=" col-span-7 text-right p-4">
        <h3>{data.title}</h3>
        <p>
          تعداد <span>{qty}</span>
        </p>
        <p>
          قیمت محصول <span> {formatPrice(data.price)}</span>
        </p>
      <AddOrderButton id={id.toString()} />
      </div>

      <div className="col-span-2">
        <img className="w-full h-full" src={data.image} alt="" />
      </div>
    </div>
  );
}

export default CartItem;
