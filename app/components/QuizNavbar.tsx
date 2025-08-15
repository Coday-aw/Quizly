import ModeToggle from "./ModeToggle";
import { IoExitOutline } from "react-icons/io5";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { QuizIcons } from "@/lib/data";
import { AiOutlineDropbox } from "react-icons/ai";
import { useQuiz } from "../hooks/useQuizzes";
import { Quiz } from "@/lib/types";

interface QuizNavbarProps {
  quiz: Quiz;
}

const QuizNavbar = ({ quiz }: QuizNavbarProps) => {
  const router = useRouter();
  return (
    <div className="flex w-full justify-between items-center">
      <div className="flex items-center gap-4">
        <p className="text-5xl bg-purple-100 text-purple-400 rounded-lg p-2">
          {quiz &&
            React.createElement(
              QuizIcons.find((icon) => icon.label === quiz.icon)?.icon ||
                AiOutlineDropbox
            )}
        </p>
        <p className="text-3xl">{quiz?.title}</p>
      </div>
      <div className="flex gap-5">
        <ModeToggle />
        <div className="relative group">
          <span className="absolute top-[-30px] left-[-8px] border px-2 rounded-lg opacity-0 group-hover:opacity-100">
            Exit
          </span>
          <IoExitOutline
            onClick={() => router.push("/dashboard")}
            className=" cursor-pointer"
            size={30}
          />
        </div>
      </div>
    </div>
  );
};
export default QuizNavbar;
