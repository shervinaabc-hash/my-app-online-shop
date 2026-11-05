// import Container from "@/src/components/container"
// import ProudoctItem, { TProductList } from "@/src/components/proudoctItem"
// import Pagination from "@/src/components/pagination"
// import SearchParams from "@/src/components/search"
// import { getCategoryTitle } from "@/src/utils/categories"
// import Link from "next/link";


// type TStoreProps = {
//   params: Promise<[]>;
//   searchParams: Promise<{
//   page?: string;
//   per_page?: string;
//   title?: string;
//   category?: string;
//   }>;
// }

  
// async function Store({searchParams}: TStoreProps) {
//   const page = (await searchParams).page  ?? "1"
//   const per_page = (await searchParams).per_page ?? "6"
//   const title = (await searchParams).title?? ""
//   const category = (await searchParams).category ?? ""
//   const titleQuery = title ? `&title=${title}` : "";
//   const categoryQuery = category ? `&category=${category}` : "";

 
//   const result = await fetch(
//     `http://localhost:3002/prouduct?_page=${page}&_per_page=${per_page}${titleQuery}${categoryQuery}`,
//   );
//   const data = (await result.json()) as TProductList;

//   return (
//     <Container>
//       <div className="flex flex-col gap-4 py-8 sm:flex-row sm:items-end sm:justify-between">
//         <div>
//           <h1 className="text-2xl font-bold text-white">{getCategoryTitle(category) ?? "همه محصولات"}</h1>
//           <p className="mt-1 text-sm text-slate-400">{data.items ?? 0} محصول</p>
//         </div>
//         <SearchParams/>
//       </div>

//       {data.data.length === 0 ? (
//         <p className="py-16 text-center text-slate-400">محصولی پیدا نشد.</p>
//       ) : (
//         <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//           {data.data.map((item) => (
//             <Link className="block" href={`/Store/${item.id}`} key={item.id}>
//               <ProudoctItem {...item} />
//             </Link>
//           ))}
//         </div>
//       )}
//       <Pagination pageCount={data.pages}  />
//     </Container>
//   );
// }

// export default Store;


import Container from "@/src/components/container";
import ProudoctItem from "@/src/components/proudoctItem";
import Pagination from "@/src/components/pagination";
import SearchParams from "@/src/components/search";
import { getCategoryTitle } from "@/src/utils/categories";
import { products } from "@/src/utils/products"; // ایمپورت دیتای محلی جدید
import Link from "next/link";

type TStoreProps = {
  searchParams: Promise<{
    page?: string;
    per_page?: string;
    title?: string;
    category?: string;
  }>;
};

export default async function Store({ searchParams }: TStoreProps) {
  const params = await searchParams;
  const page = parseInt(params.page ?? "1", 10);
  const perPage = parseInt(params.per_page ?? "6", 10);
  const title = (params.title ?? "").toLowerCase();
  const category = params.category ?? "";

  // ۱. فیلتر کردن محصولات بر اساس دسته‌بندی و عنوان جستجو شده
  const filteredProducts = products.filter((item) => {
    const matchesCategory = category ? item.category === category : true;
    const matchesTitle = title ? item.title.toLowerCase().includes(title) : true;
    return matchesCategory && matchesTitle;
  });

  // ۲. محاسبه صفحه‌بندی (Pagination)
  const totalItems = filteredProducts.length;
  const totalPages = Math.ceil(totalItems / perPage) || 1;
  const startIndex = (page - 1) * perPage;
  const paginatedData = filteredProducts.slice(startIndex, startIndex + perPage);

  return (
    <Container>
      <div className="flex flex-col gap-4 py-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">
            {getCategoryTitle(category) ?? "همه محصولات"}
          </h1>
          <p className="mt-1 text-sm text-slate-400">{totalItems} محصول</p>
        </div>
        <SearchParams />
      </div>

      {paginatedData.length === 0 ? (
        <p className="py-16 text-center text-slate-400">محصولی پیدا نشد.</p>
      ) : (
        <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {paginatedData.map((item) => (
            <Link className="block" href={`/Store/${item.id}`} key={item.id}>
              <ProudoctItem {...item} />
            </Link>
          ))}
        </div>
      )}

      <Pagination pageCount={totalPages} />
    </Container>
  );
}