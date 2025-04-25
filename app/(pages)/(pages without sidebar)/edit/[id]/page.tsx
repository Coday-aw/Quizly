"use client";

import QuizForm from "@/app/components/QuizForm";
import { useQuiz } from "@/app/hooks/useQuizzes";
import { useParams } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

function EditPage() {
  const { id } = useParams();
  const { quiz, loading, error } = useQuiz(id as string);

  if (error) return toast.error("Error fetching quiz");
  return (
    <div>
      {loading ? (
        <div className="font-bold text-2xl flex justify-center items-center h-screen">
          Loading...
        </div>
      ) : (
        ""
      )}
      <Toaster />
      <QuizForm quiz={quiz || undefined} isEditing={true} />
    </div>
  );
}
export default EditPage;
