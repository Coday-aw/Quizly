import { useEffect, useState } from "react";
import { Quiz } from "@/lib/types";

export const useQuizzes = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/quizzes`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        setQuizzes(data);
        setLoading(false);
        console.log(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : String(error));
        setLoading(false);
        console.error("Error fetching quizzes:", error);
      }
    };
    fetchQuizzes();
  }, []);
  return { quizzes, loading, error };
};

export const useQuiz = (id: string) => {
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/quizzes?id=${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        setQuiz(data);
        setLoading(false);
        console.log(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : String(error));
        setLoading(false);
        console.error("Error fetching quiz:", error);
      }
    };
    fetchQuiz();
  }, [id]);
  return { quiz, loading, error };
};
