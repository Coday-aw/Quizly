"use client";
import { QuizIcons } from "@/lib/data";
import { FaPlayCircle } from "react-icons/fa";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { AiOutlineDropbox } from "react-icons/ai";
import { Quiz } from "@/lib/types";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Toaster } from "react-hot-toast";
import { BsFillTrashFill } from "react-icons/bs";
import { MdEdit } from "react-icons/md";

interface QuizCardProps {
  quiz: Quiz;
  onDelete: (id: string) => void;
}

const QuizCard = ({ quiz, onDelete }: QuizCardProps) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const toggleMode = () => {
    setOpen(!open);
  };

  // useEffect(() => {
  //   const handleClickOutside = (e: MouseEvent) => {
  //     if (
  //       dropdownRef.current &&
  //       !dropdownRef.current.contains(e.target as Node)
  //     ) {
  //       setOpen(!open);
  //     }
  //   };
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

  return (
    <>
      <Toaster />
      <div
        key={quiz._id}
        className=" w-full h-[400px] md:w-[250px] md:h-[300px] border border-slate-300 flex flex-col justify-center p-2 rounded-lg   "
      >
        <div className="text-5xl mb-2 border  w-full flex justify-center items-center h-1/2 rounded-lg  bg-purple-500 text-white">
          {React.createElement(
            QuizIcons.find((icon) => icon.label === quiz.icon)?.icon ||
              AiOutlineDropbox
          )}
        </div>
        <div>
          <p className="font-bold  text-2xl">{quiz.title}</p>
          <p className="text-gray-500">
            {quiz.questions.length}
            {""} questions
          </p>

          <div className=" relative flex justify-between items-center">
            <div className=" cursor-pointer hover:bg-slate-50 hover:text-black  hover:dark:bg-slate-800 hover:dark:text-white rounded-full  h-10 w-10 flex justify-center items-center">
              <HiOutlineDotsHorizontal onClick={toggleMode} size={30} />
              {open && (
                <div
                  // ref={dropdownRef}
                  className=" absolute left-0 bottom-[-95px] p-2 w-28 h-24 bg-white text-black rounded-lg border border-slate-300 dark:border-none "
                >
                  <Link
                    href={`/edit/${quiz._id}`}
                    className="  flex gap-2 hover:bg-purple-500 p-2 rounded-lg hover:text-white font-bold"
                  >
                    <MdEdit size={25} className="text-blue-500" />
                    Edit
                  </Link>
                  <p
                    onClick={() => onDelete(quiz._id)}
                    className=" flex gap-2 hover:bg-purple-500 p-2 rounded-lg hover:text-white font-bold"
                  >
                    <BsFillTrashFill size={25} className="text-red-500" />{" "}
                    Delete
                  </p>
                </div>
              )}
            </div>

            <Link
              href={`/quiz/${quiz._id}`}
              className=" rounded-full bg-purple-500 text-white p-2 w-10 h-10 flex justify-center items-center"
            >
              <FaPlayCircle size={20} />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
export default QuizCard;
