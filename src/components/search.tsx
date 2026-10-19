"use client"
import { useSearchParams ,useRouter } from "next/navigation";
import { useState } from "react";

function SearchParam() {
  const [search, setSearch] = useState("");
  const searchParam = useSearchParams();
  const router = useRouter();
  const handelSearch = () => {
const currentSerachParams = new URLSearchParams(searchParam.toString())

currentSerachParams.set("title", search)
currentSerachParams.delete("page")

router.push(`/Store?${currentSerachParams.toString()}`)

  };
  return (
    <search className="flex w-full max-w-md gap-2">
      <input
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handelSearch()}
        className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-amber-500 focus:ring-4 focus:ring-amber-500/20"
        placeholder="جستجوی نام دقیق محصول..."
        type="text"
      />
      <button onClick={handelSearch} className="cursor-pointer rounded-xl bg-amber-500 px-5 py-2 text-sm font-bold text-slate-950 transition hover:bg-amber-400">
        جستجو
      </button>
    </search>
  );
}

export default SearchParam;
