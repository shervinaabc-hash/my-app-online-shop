import AddOrderButton from "@/src/components/addOrderButton";
import Container from "@/src/components/container";
import { TProudoctItemProops } from "@/src/components/proudoctItem";

import { formatPrice } from "@/src/utils/number";
import Image from "next/image";
import React from "react";

type TPages = {
  params: Promise<{ id : string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};
async function Pages({params}: TPages) {
  const { id } = await params;

 

  const result = await fetch(`http://localhost:3002/prouduct/${id}`);
  const data = (await result.json()) as TProudoctItemProops;
  return (
    <Container>
      <div className=" grid grid-cols-12 rtl text-right shadow-md mt-8">
        <div className=" col-span-3 relative min-h-64 ">
          <Image
            src={data.image}
            alt={data.id}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 25vw, 300px"
          />
        </div>
        <div className=" p-4  col-span-9 ">
          <h1 className="font-semibold mb-2">{data.title}</h1>

          <p>{data.description}</p>
          <p className="rtl text-right">
            قیمت: <span>{formatPrice(data.price)}$</span>
          </p>
          <AddOrderButton id={id}/>

       
        </div>
      </div>
    </Container>
  );
}

export default Pages;
