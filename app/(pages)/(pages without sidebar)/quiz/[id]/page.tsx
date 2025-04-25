"use client";

import { useQuiz } from "@/app/hooks/useQuizzes";
import { QuizIcons } from "@/lib/data";
import { useParams } from "next/navigation";
import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { AiOutlineDropbox } from "react-icons/ai";
import { useState, useEffect } from "react";
import Button from "@/app/components/Button";
import QuizNavbar from "@/app/components/QuizNavbar";

function QuizPage() {
  const { id } = useParams();
  const { quiz, loading, error } = useQuiz(id as string);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctAnwser, setCorrectAnwser] = useState(false);
  const [selectedAnwser, setSelectedAnwser] = useState<string>();
  const [quizFinshed, setQuizFinshed] = useState(false);
  const [currectAnwserCount, setCurrectAnwserCount] = useState(0);
  const [progressBar, setProgressBar] = useState(0);

  const currentQuestion = quiz?.questions[currentQuestionIndex];

  useEffect(() => {
    if (quiz?.questions.length) {
      // console.log("total questions:", quiz?.questions.length);
      // console.log("current index:", currentQuestionIndex);
      const progressBar =
        ((currentQuestionIndex + 1) / (quiz?.questions.length ?? 1)) * 100;
      setProgressBar(progressBar);
    }
  }, [currentQuestionIndex, quiz]);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < (quiz?.questions?.length ?? 0) - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnwser(undefined);
    } else {
      setQuizFinshed(true);
    }
  };

  const handlePlayAgain = () => {
    setCurrentQuestionIndex(0);
    setCurrectAnwserCount(0);
    setSelectedAnwser(undefined);
    setQuizFinshed(false);
  };

  const handleAnswer = () => {
    if (!selectedAnwser) {
      toast.error("Choose an option");
      return;
    }
    if (selectedAnwser === currentQuestion?.correctAnswer) {
      console.log("correct anwser");
      setCorrectAnwser(true);
      console.log(correctAnwser);
      toast.success("Right Anwser!");
      setCurrectAnwserCount(currectAnwserCount + 1);
    } else {
      setCorrectAnwser(false);

      console.log("wrong Anwser");
      toast.error("Wrong Anwser");
    }

    setTimeout(() => {
      handleNextQuestion();
    }, 1000);
  };

  if (error) return toast.error("Error fetching quiz");

  const optionsLabel = ["A", "B", "C", "D"];

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center h-screen font-bold text-2xl">
          Loading...
        </div>
      ) : (
        ""
      )}
      <Toaster />
      {quiz && <QuizNavbar quiz={quiz} />}

      {quizFinshed ? (
        <div className=" flex flex-col justify-center items-center gap-3 mt-20  ">
          <p className="font-bold text-2xl">Quiz completed</p>
          <p className="font-bold text-2xl">You scored...</p>
          <div>
            <div className=" dark:bg-slate-800  border border-slate-200  rounded-lg p-2 flex flex-col justify-center items-center gap-5 w-[300px] h-[300px]">
              <div className="flex items-center gap-4">
                <p className=" bg-purple-100 text-purple-400 rounded-lg p-2">
                  {quiz &&
                    React.createElement(
                      QuizIcons.find((icon) => icon.label === quiz.icon)
                        ?.icon || AiOutlineDropbox
                    )}
                </p>
                <p className="font-bold">{quiz?.title}</p>
              </div>
              <div className="flex flex-col justify-center gap-2 items-center">
                <p className="text-7xl font-bold">{currectAnwserCount}</p>

                <p className="text-slate-400">of {quiz?.questions.length} </p>
              </div>
            </div>
          </div>
          <Button onClick={handlePlayAgain} width="300px">
            Play Again
          </Button>
        </div>
      ) : (
        <>
          <div className="flex flex-col lg:flex-row gap-20 mt-20 w-full">
            <div className="flex flex-1 flex-col gap-10">
              <p className="text-slate-400 dark:text-slate-600">
                {" "}
                Question {currentQuestionIndex + 1} of {quiz?.questions.length}
              </p>
              <p className="text-3xl">{currentQuestion?.question}</p>
              <div className="bg-slate-400 h-3 rounded-lg mt-40">
                <div
                  className="h-full rounded-lg bg-purple-500"
                  style={{ width: `${progressBar}%` }}
                ></div>
              </div>
            </div>
            <ul className="flex flex-1 flex-col gap-4">
              {currentQuestion?.options.map((option, index) => (
                <li
                  onClick={() => {
                    setSelectedAnwser(option);
                  }}
                  key={index}
                  className={` text-2xl w-full lg:w-[600px] p-3 dark:text-white text-black rounded-lg cursor-pointer
                     ${
                       option === selectedAnwser
                         ? "bg-purple-500"
                         : "bg-slate-300 dark:bg-slate-700"
                     }
                    dark:hover:bg-purple-500 hover:bg-purple-500 
               `}
                >
                  <span className="bg-slate-200 text-black px-4 py-1 rounded-lg mr-5">
                    {optionsLabel[index]}
                  </span>
                  {option}
                </li>
              ))}
              <Button onClick={handleAnswer}>Submit Answer</Button>
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
export default QuizPage;
