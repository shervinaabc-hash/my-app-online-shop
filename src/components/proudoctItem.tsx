
import { formatPrice } from "../utils/number";
import { getCategoryTitle } from "../utils/categories";

export type TProudoctItemProops = {
  id: string;
  image: string;
  description: string;
  title: string;
  price: number;
  category?: string;
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
  category,
}: TProudoctItemProops) {
  const categoryTitle = getCategoryTitle(category);

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-900 transition hover:-translate-y-1 hover:border-amber-500/50 hover:shadow-xl hover:shadow-amber-500/10">
      <div className="relative">
        <img
          className="aspect-[4/3] w-full object-cover"
          src={image}
          alt={title || "Product image"}
        />
        {categoryTitle && (
          <span className="absolute top-3 right-3 rounded-full bg-slate-950/80 px-3 py-1 text-xs text-amber-400">
            {categoryTitle}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h2 className="font-bold text-white">{title}</h2>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-400">{description}</p>
        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="font-bold text-amber-400">{formatPrice(price)}</span>
          <span className="text-xs text-slate-500 transition group-hover:text-amber-400">مشاهده جزئیات ←</span>
        </div>
      </div>
    </div>
  );
}

export default ProudoctItem;
