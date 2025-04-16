"use client";
import { useAuth } from "@clerk/nextjs";
import IntroSection from "./components/IntroSection";
import Navbar from "./components/Navbar";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

function page() {
  const { userId } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!userId) {
      return;
    } else {
      router.push("/dashboard");
    }
  }, [userId]);
  return (
    <div>
      <Navbar />
      <IntroSection />
    </div>
  );
}
export default page;
