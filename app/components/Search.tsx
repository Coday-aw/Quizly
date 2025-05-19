"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { IoIosSearch } from "react-icons/io";

const SearchBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q")?.toString() || "";

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const searchInput = formData.get("searchInput") as string;

    const params = new URLSearchParams();

    if (searchInput) {
      params.set("q", searchInput);
    } else {
      params.delete("q");
    }

    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center items-center">
      <div className=" mb-10 border border-blue-200 dark:border-white relative rounded-lg p-1 flex items-center">
        <IoIosSearch size={25} className=" absolute left-2" />
        <input
          type="text"
          name="searchInput"
          defaultValue={initialQuery}
          placeholder="Search for quiz"
          className=" px-10 py-4 w-[450px] relative"
        />
        <button
          type="submit"
          className="cursor-pointer absolute p-3 right-2 text-white rounded-lg font-bold bg-blue-500 "
        >
          Search
        </button>
      </div>
    </form>
  );
};
export default SearchBar;
