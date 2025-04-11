"use client";

import { useQuiz } from "@/app/hooks/useQuizzes";
import { useParams } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

function EditPage() {
  const { id } = useParams();
  const { quiz, loading, error } = useQuiz(id as string);

  if (loading) return <div>Loading...</div>;
  if (error) return toast.error("Error fetching quiz");
  return (
    <>
      <Toaster />
      <div>EditPage</div>
    </>
  );
}
export default EditPage;
