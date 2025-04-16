"use client";
import { Input } from "@/components/ui/input";
import Button from "./Button";
import React, { useEffect, useState } from "react";
import { Quiz } from "@/lib/types";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { FaGlobe } from "react-icons/fa";
import Modal from "./Modal";
import QuizIcon from "./QuizIcon";
import { QuizIcons } from "@/lib/data";
import toast, { Toaster } from "react-hot-toast";
import { RxCrossCircled } from "react-icons/rx";

interface QuizFormProps {
  quiz?: Quiz;
  isEditing: boolean;
}

const QuizForm = ({ quiz: initialQuiz, isEditing }: QuizFormProps) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [icon, setIcon] = useState(initialQuiz?.icon || "");
  const [quiz, setQuiz] = useState<Quiz>(
    initialQuiz || {
      _id: "",
      title: "",
      icon: "",
      questions: [
        {
          id: uuidv4(),
          question: "",
          options: ["", "", "", ""],
          correctAnswer: "",
        },
      ],
    }
  );

  useEffect(() => {
    if (initialQuiz) {
      setQuiz(initialQuiz);
      setIcon(initialQuiz.icon);
    }
  }, [initialQuiz]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const addQuestion = () => {
    setQuiz((prevQuiz) => ({
      ...prevQuiz,
      questions: [
        ...prevQuiz.questions,
        {
          id: uuidv4(),
          question: "",
          options: ["", "", "", ""],
          correctAnswer: "",
        },
      ],
    }));
  };

  const removeQuestion = (index: number) => {
    setQuiz((prevQuiz) => ({
      ...prevQuiz,
      questions: prevQuiz.questions.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!icon) {
      toast.error("Choose icon for your quiz");
      return;
    }
    if (!quiz) {
      toast.error("please fill all fields");
      return;
    }

    try {
      const url = isEditing
        ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/quizzes?id=${quiz._id}`
        : `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/quizzes`;
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(quiz),
      });

      const data = await res.json();
      console.log(res, data);

      if (res.ok) {
        toast.success(
          isEditing ? "Quiz updated successfully" : "Quiz created successfully"
        );
        router.push("/dashboard");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error(
        isEditing
          ? "An error occurred while updating Quiz"
          : "An error occurred while creating the quiz"
      );
    }
  };
  const setQuestions = (
    updateFn: (prevQuestions: Quiz["questions"]) => Quiz["questions"]
  ) => {
    setQuiz((prevQuiz) => ({
      ...prevQuiz,
      questions: updateFn(prevQuiz.questions),
    }));
  };

  return (
    <div className=" dark:bg-slate-800 dark:border-none rounded-lg border border-purple-300 lg:p-10 p-2 mt-10 flex flex-col gap-10">
      <Toaster />
      <p className="text-center font-bold text-2xl">
        {isEditing ? "Edit your quiz" : "Create your quiz"}
      </p>
      <div className="flex  justify-between border rounded-lg p-2 border-purple-300 ">
        <div className="flex items-center">
          <label htmlFor="quiz name" className="font-bold">
            Quiz Name {""} :
          </label>
          <input
            className="border-b-1 p-1"
            value={quiz.title}
            onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
          />
        </div>
        <div
          onClick={openModal}
          className="border px-4 py-2 rounded-lg bg-purple-500 text-white cursor-pointer"
        >
          {icon ? (
            React.createElement(
              QuizIcons.find((i) => i.label === icon)?.icon || FaGlobe,
              { size: 25 }
            )
          ) : (
            <FaGlobe size={25} />
          )}
        </div>
        {
          <Modal isOpen={isModalOpen} closeModal={closeModal}>
            <div className=" p-10 bg-white dark:bg-slate-800 border-2 border-purple-300 rounded-lg w-[500px] h-[500px]]">
              <p className="mb-10  font-bold text-purple-500 text-lg">
                Choose icon for your quiz
              </p>
              <div className="grid grid-cols-4 gap-4">
                {QuizIcons.map((quizIcon) => (
                  <div
                    key={quizIcon.label}
                    data-value={quiz.icon}
                    onClick={(e) => {
                      setIcon(quizIcon.label);
                      setQuiz({ ...quiz, icon: quizIcon.label });
                      closeModal();
                    }}
                    className="flex flex-col items-center cursor-pointer hover:scale-105 transition border border-slate-200 hover:border-purple-300 hover:text-purple-500 p-4"
                  >
                    {React.createElement(quizIcon.icon, { size: 30 })}
                  </div>
                ))}
              </div>
            </div>
          </Modal>
        }
      </div>

      {quiz.questions.map((q, index) => (
        <form
          onSubmit={handleSubmit}
          key={q.id}
          className="flex flex-col gap-10  md:p-6 p-4 rounded-lg border border-purple-200"
        >
          <p
            onClick={() => removeQuestion(index)}
            className="flex justify-end cursor-pointer"
          >
            <RxCrossCircled color="red" size={20} />
          </p>

          <div className="flex flex-col md:flex-row gap-2 md:gap-10">
            <label htmlFor="question" className="font-bold flex gap-1">
              Question <span>{index + 1} </span>
            </label>
            <Input
              className="border-slate-200"
              onChange={(e) =>
                setQuestions((prevQuestions) =>
                  prevQuestions.map((question) =>
                    question.id === q.id
                      ? { ...question, question: e.target.value }
                      : question
                  )
                )
              }
              id={`question-${q.id}`}
              value={q.question}
            />
          </div>
          <div className="flex flex-col md:flex-row gap-3 md:gap-10">
            <p className="flex justify-center items-center font-bold">
              Options
            </p>
            <div className="flex-1 flex flex-col gap-5 border p-4 rounded-lg border-slate-300">
              {q.options.map((option, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <label htmlFor="option" id={`option-${q.id}-${index}`}>
                    {String.fromCharCode(65 + index)}:
                  </label>
                  <Input
                    className="border-slate-200"
                    onChange={(e) =>
                      setQuestions((prevQuestions) =>
                        prevQuestions.map((question) =>
                          question.id === q.id
                            ? {
                                ...question,
                                options: question.options.map((opt, optIndex) =>
                                  optIndex === index ? e.target.value : opt
                                ),
                              }
                            : question
                        )
                      )
                    }
                    value={option}
                    id={`option-${q.id}-${index}`}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex">
            <label
              className="font-bold"
              id={`correct-anwser-${q.id}`}
              htmlFor="Correct anwser"
            >
              Correct Answer
            </label>
            <Input
              className="border-slate-200"
              onChange={(e) =>
                setQuestions((prevQuestions) =>
                  prevQuestions.map((question) =>
                    question.id === q.id
                      ? {
                          ...question,
                          correctAnswer: e.target.value,
                        }
                      : question
                  )
                )
              }
              id={`correct-answer-${q.id}`}
              value={q.correctAnswer}
            />
          </div>
          {index === quiz.questions.length - 1 && (
            <div className="flex flex-col gap-5 md:flex-row justify-end">
              <button
                className="bg-blue-500  text-white p-2 rounded-lg text-lg font-bold cursor-pointer hover:scale-105 transition"
                onClick={addQuestion}
              >
                Add a new Question
              </button>
              <Button type="submit">
                {isEditing ? "Updated Quiz" : "Create Quiz"}
              </Button>
            </div>
          )}
        </form>
      ))}
    </div>
  );
};
export default QuizForm;
