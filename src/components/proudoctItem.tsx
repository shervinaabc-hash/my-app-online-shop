
import { formatPrice } from "../utils/number";

export type TProudoctItemProops = {
  id: string;
  image: string;
  description: string;
  title: string;
  price: number;
};

export type TProductList = {
  first: number | null;
  prev: number | null;
  next: number | null;
  last: number | null;
  pages: number;
  items: number | null;
  data:  TProudoctItemProops[];
};
function ProudoctItem({
  title,
  image,
  description,
  price,
}: TProudoctItemProops) {
  return (
    <div className=" h-full flex flex-col shadow-md rounded-md p-2 rtl">
      <h1 className="py-2 text-gray-500">{title}</h1>
      <div>
 <img
        className=" w-full aspect-[4/3] object-cover rounded-md"
        src={image}
        alt={title || "Product image"}
      
      />
      </div>
     
      <p className=" text-sm text-gray-600 flex justify-end mt-2 ">{description} </p>
      <span className="  pt-2   text-amber-300">
        قیمت: ${formatPrice(price)}
      </span>
    </div>
  );
}

export default ProudoctItem;
