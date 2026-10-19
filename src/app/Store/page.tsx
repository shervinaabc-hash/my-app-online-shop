import Container from "@/src/components/container"
import ProudoctItem, { TProductList } from "@/src/components/proudoctItem"
import Pagination from "@/src/components/pagination"
import SearchParams from "@/src/components/search"
import { getCategoryTitle } from "@/src/utils/categories"
import Link from "next/link";


type TStoreProps = {
  params: Promise<[]>;
  searchParams: Promise<{
  page?: string;
  per_page?: string;
  title?: string;
  category?: string;
  }>;
}

  
async function Store({searchParams}: TStoreProps) {
  const page = (await searchParams).page  ?? "1"
  const per_page = (await searchParams).per_page ?? "6"
  const title = (await searchParams).title?? ""
  const category = (await searchParams).category ?? ""
  const titleQuery = title ? `&title=${title}` : "";
  const categoryQuery = category ? `&category=${category}` : "";

 
  const result = await fetch(
    `http://localhost:3002/prouduct?_page=${page}&_per_page=${per_page}${titleQuery}${categoryQuery}`,
  );
  const data = (await result.json()) as TProductList;

  return (
    <Container>
      <div className="flex flex-col gap-4 py-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">{getCategoryTitle(category) ?? "همه محصولات"}</h1>
          <p className="mt-1 text-sm text-slate-400">{data.items ?? 0} محصول</p>
        </div>
        <SearchParams/>
      </div>

      {data.data.length === 0 ? (
        <p className="py-16 text-center text-slate-400">محصولی پیدا نشد.</p>
      ) : (
        <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.data.map((item) => (
            <Link className="block" href={`/Store/${item.id}`} key={item.id}>
              <ProudoctItem {...item} />
            </Link>
          ))}
        </div>
      )}
      <Pagination pageCount={data.pages}  />
    </Container>
  );
}

export default Store;
