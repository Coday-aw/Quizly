"use client";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import { useQuizzes } from "../hooks/useQuizzes";
import QuizCard from "./QuizCard";
import Button from "./Button";
import Link from "next/link";
import { AiOutlineDropbox } from "react-icons/ai";
<<<<<<< HEAD
import { useAuth } from "@clerk/nextjs";

const QuizList = () => {
  const { userId } = useAuth();
  const { quizzes: initialQuizzes, loading, error } = useQuizzes(userId || "");
  const [quizzes, setQuizzes] = useState(initialQuizzes);

=======

const QuizList = ({ query }: { query: string }) => {
  const { quizzes: initialQuizzes, loading, error } = useQuizzes();
  const [quizzes, setQuizzes] = useState(initialQuizzes);

  const filtedQuizzes = query
    ? quizzes.filter((quiz) =>
        quiz.title.toLowerCase().includes(query.toLowerCase())
      )
    : quizzes;

>>>>>>> 24648072ef600ff4a9b733abb77ba335ed3c5e0f
  useEffect(() => {
    setQuizzes(initialQuizzes);
  }, [initialQuizzes]);

  const deleteQuiz = async (id: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/quizzes?id=${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data: { message: string } = await res.json();
      toast.success("Quiz deleted successfully");
      setQuizzes((prevQuizzes) =>
        prevQuizzes.filter((quiz) => quiz._id !== id)
      );
      console.log(data);
    } catch (error) {
      console.log(error);
      toast.error("Error deleting");
    }
  };

  if (loading) {
    return (
      <div className="font-bold text-2xl flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="font-bold text-2xl flex justify-center items-center h-screen text-red-500">
        Error loading quizzes.
      </div>
    );
  }

  return (
    <div>
<<<<<<< HEAD
      {quizzes.length === 0 ? (
=======
      {filtedQuizzes.length === 0 ? (
>>>>>>> 24648072ef600ff4a9b733abb77ba335ed3c5e0f
        <div className="flex flex-col items-center mt-44 gap-3">
          <AiOutlineDropbox size={100} color="purple" />
          <p className="font-bold text-3xl">
            Welcome to <span className="text-purple-500">Quizly</span>, Let the
            fun begin!
          </p>
          <p className="text-gray-500">Ready to get started? Click below</p>
          <Button>
            <Link href="/create">Create your first Quiz</Link>
          </Button>
        </div>
      ) : (
<<<<<<< HEAD
        <div className=" flex gap-10 flex-wrap justify-start items-center mt-7 ">
          {quizzes.map((quiz) => (
=======
        <div className=" flex gap-10 flex-wrap justify-start items-center mt-16">
          {filtedQuizzes.map((quiz) => (
>>>>>>> 24648072ef600ff4a9b733abb77ba335ed3c5e0f
            <QuizCard key={quiz._id} quiz={quiz} onDelete={deleteQuiz} />
          ))}
        </div>
      )}
    </div>
  );
};
export default QuizList;
