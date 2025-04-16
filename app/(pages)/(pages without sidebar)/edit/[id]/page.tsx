"use client";

import QuizForm from "@/app/components/QuizForm";
import { useQuiz } from "@/app/hooks/useQuizzes";
import { Input } from "@/components/ui/input";
import { useParams } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

function EditPage() {
  const { id } = useParams();
  const { quiz, loading, error } = useQuiz(id as string);

  if (loading) return <div>Loading...</div>;
  if (error) return toast.error("Error fetching quiz");
  return (
    <>
      <Toaster />
      <QuizForm quiz={quiz || undefined} isEditing={true} />
    </>
  );
}
export default EditPage;
