"use client";
import { useRouter, useSearchParams } from "next/navigation";
import ReactPaginate from "react-paginate";

const linkClass =
  "flex h-10 min-w-10 items-center justify-center rounded-lg border border-white/10 bg-slate-900 px-3 text-sm font-medium text-slate-300 transition hover:border-amber-500 hover:text-amber-400 cursor-pointer select-none " +
  "aria-[current=page]:border-amber-500 aria-[current=page]:bg-amber-500 aria-[current=page]:text-slate-950 " +
  "aria-disabled:pointer-events-none aria-disabled:opacity-40";
function Pagination({ pageCount }: { pageCount: number }) {
   const router = useRouter();
  const searchParam = useSearchParams();

 

  const handlePageClick = (e: { selected: number }) => {
    const page = e.selected + 1;

    const currentSerachParams = new URLSearchParams(searchParam.toString());
    currentSerachParams.set("page", page.toString());
    currentSerachParams.set("per_page", "6");

    router.push(`/Store?${currentSerachParams.toString()}`);
  };

  return (
    <div>
      <ReactPaginate
        breakLabel="..."
        nextLabel="بعدی"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        forcePage={Math.max(Number(searchParam.get("page") ?? "1") - 1, 0)}
        previousLabel="قبلی"
        renderOnZeroPageCount={null}
        pageLinkClassName={linkClass}
        previousLinkClassName={linkClass}
        nextLinkClassName={linkClass}
        breakLinkClassName="flex h-10 min-w-10 items-center justify-center text-slate-500"
        containerClassName="flex items-center justify-center mt-2  gap-3"
      />
    </div>
  );
}

export default Pagination;
