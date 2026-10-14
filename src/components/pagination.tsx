"use client";
import { useRouter, useSearchParams } from "next/navigation";
import ReactPaginate from "react-paginate";

const linkClass =
  "flex h-10 min-w-10 items-center justify-center rounded-lg border border-gray-200 bg-white px-3 text-sm font-medium text-gray-700 transition hover:border-blue-500 hover:text-blue-600 cursor-pointer select-none " +
  "aria-[current=page]:border-blue-600 aria-[current=page]:bg-blue-600 aria-[current=page]:text-white " +
  "aria-disabled:pointer-events-none aria-disabled:opacity-40";
function Pagination({ pageCount }: { pageCount: number }) {
   const router = useRouter();
  const searchParam = useSearchParams();

 

  const handlePageClick = (e: { selected: number }) => {
    const page = e.selected + 1;

    const currentSerachParams = new URLSearchParams(searchParam.toString());
    currentSerachParams.set("page", page.toString());
    currentSerachParams.set("per_page", " 2");

    router.push(`/Store?${currentSerachParams.toString()}`);
  };

  return (
    <div>
      {" "}
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        pageLinkClassName={linkClass}
        previousLinkClassName={linkClass}
        nextLinkClassName={linkClass}
        breakLinkClassName="flex h-10 min-w-10 items-center justify-center text-gray-400"
        containerClassName="flex items-center justify-center mt-2  gap-3"
      />
    </div>
  );
}

export default Pagination;
