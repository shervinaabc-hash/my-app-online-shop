import AddOrderButton from "@/src/components/addOrderButton";
import Container from "@/src/components/container";
import { TProudoctItemProops } from "@/src/components/proudoctItem";
import { getCategoryTitle } from "@/src/utils/categories";

import { formatPrice } from "@/src/utils/number";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type TPages = {
  params: Promise<{ id : string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};
async function Pages({params}: TPages) {
  const { id } = await params;

 

  const result = await fetch(`http://localhost:3002/prouduct/${id}`);
  const data = (await result.json()) as TProudoctItemProops;
  const categoryTitle = getCategoryTitle(data.category);

  return (
    <Container>
      <div className="mt-8 grid overflow-hidden rounded-3xl border border-white/10 bg-slate-900 md:grid-cols-2">
        <div className="relative min-h-80 bg-slate-800">
          <Image
            src={data.image}
            alt={data.title}
            fill
            className="object-contain p-6"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className="flex flex-col p-8">
          {categoryTitle && (
            <Link
              href={`/Store?category=${data.category}`}
              className="w-fit rounded-full bg-amber-500/10 px-3 py-1 text-xs text-amber-400"
            >
              {categoryTitle}
            </Link>
          )}
          <h1 className="mt-4 text-2xl font-bold text-white">{data.title}</h1>

          <p className="mt-4 leading-8 text-slate-400">{data.description}</p>
          <p className="mt-6 text-2xl font-black text-amber-400">{formatPrice(data.price)}</p>
          <AddOrderButton id={id}/>
        </div>
      </div>
    </Container>
  );
}

export default Pages;
