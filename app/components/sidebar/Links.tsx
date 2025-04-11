import { AiFillAppstore } from "react-icons/ai";
import { IoIosHeart } from "react-icons/io";
import Link from "next/link";
import { IoMdCreate } from "react-icons/io";
import { useActiveLink } from "@/app/components/context/ActiveLinkContext";

const Links = () => {
  const { activeLink, setActiveLink } = useActiveLink();

  return (
    <div className=" flex flex-col gap-10">
      <div
        onClick={() => setActiveLink("/create")}
        className={`relative group hover:bg-purple-500 p-2 hover:text-white  rounded-lg cursor-pointer ${
          activeLink === "/create" ? "bg-purple-500 text-white" : ""
        }`}
      >
        <span
          className={`absolute top-[-34px] text-center right-[-6px] text-white bg-black p-1 text-sm rounded-full opacity-0 group-hover:opacity-100`}
        >
          Create
        </span>
        <Link href="/create">
          <IoMdCreate size={25} />
        </Link>
      </div>
      <div
        onClick={() => setActiveLink("/dashboard")}
        className={`relative group hover:bg-purple-500 p-2 hover:text-white  rounded-lg cursor-pointer ${
          activeLink === "/dashboard" ? "bg-purple-500 text-white" : ""
        }`}
      >
        <span className=" absolute top-[-34px] text-center right-[-9px] text-white bg-black p-1 text-sm rounded-full opacity-0 group-hover:opacity-100 ">
          Quizzes
        </span>
        <Link href="/dashboard">
          <AiFillAppstore size={25} />
        </Link>
      </div>
      <div
        onClick={() => setActiveLink("/favorits")}
        className={`relative group hover:bg-purple-500 p-2 hover:text-red-500  rounded-lg cursor-pointer ${
          activeLink === "/favorits" ? "bg-purple-500 text-red-500" : ""
        } `}
      >
        <span className=" absolute top-[-34px] text-center right-[-8px] text-white bg-black p-1 text-sm rounded-full opacity-0 group-hover:opacity-100 ">
          Favorits
        </span>
        <Link href="/favorits">
          <IoIosHeart size={25} />
        </Link>
      </div>
    </div>
  );
};

export default Links;
