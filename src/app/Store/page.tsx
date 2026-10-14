import Container from "@/src/components/container"
import ProudoctItem, { TProductList } from "@/src/components/proudoctItem"
import Pagination from "@/src/components/pagination"
import SearchParams from "@/src/components/search"
import Link from "next/link";


type TStoreProps = {
  params: Promise<[]>;
  searchParams: Promise<{
  page?: string;
  per_page?: string;
  title?: string;
  
  }>;
}

  
async function Store({searchParams}: TStoreProps) {
  const page = (await searchParams).page  ?? "1"
  const per_page = (await searchParams).per_page ?? "2"
  const title = (await searchParams).title?? ""
  const titleQuery = title ? `&title=${title}` : "";

 
  const result = await fetch(
    `http://localhost:3002/prouduct?_page=${page}&_per_page=${per_page}${titleQuery}`,
  );
  const data = (await result.json()) as TProductList;

  return (
    <Container>
      <h1 className="text-right py-4">محصولات</h1>
       <SearchParams/>
      
      <div className="rtl flex flex-wrap justify-center gap-4 mb-8">
        {data.data.map((item) => (
          <Link  className="block w-full sm:w-72" href={`Store/${item.id}`} key={item.id}>
            <ProudoctItem {...item} />
            
          </Link>
        ))}
      </div>
      <Pagination pageCount={data.pages}  />
    </Container>
  );
}

export default Store;
// grid grid-cols-2 gap-4