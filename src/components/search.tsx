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

router.push(`/Store?${currentSerachParams.toString()}`)

  };
  return (
    <search className=" flex justify-center items-center">
      <input
        onChange={(e) => setSearch(e.target.value)}
        className="bg-white "
        placeholder="جستجو"
        type="text"
      />
      <button onClick={handelSearch} className="bg-blue-500 ">
        {" "}
        click
      </button>
    </search>
  );
}

export default SearchParam;
