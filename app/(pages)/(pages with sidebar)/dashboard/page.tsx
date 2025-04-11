"use client";
import Button from "@/app/components/Button";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AiOutlineDropbox } from "react-icons/ai";
import { useQuizzes } from "@/app/hooks/useQuizzes";
import toast from "react-hot-toast";
import QuizCard from "@/app/components/QuizCard";

function Dashboard() {
  const { quizzes: initialQuizzes, loading, error } = useQuizzes();
  const [quizzes, setQuizzes] = useState(initialQuizzes);

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
      const data = await res.json();
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

  if (loading) return <p>Loading...</p>;
  if (error) return toast.error("Error fetching quizzes");

  return (
    <div>
      {quizzes.length === 0 ? (
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
        <div className="p-10">
          <p className="text-3xl font-bold ">My quizzes</p>
          <div className=" flex gap-10 flex-wrap justify-start items-center mt-16">
            {quizzes.map((quiz) => (
              <QuizCard key={quiz._id} quiz={quiz} onDelete={deleteQuiz} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
