"use client";
import { MdQuiz } from "react-icons/md";
import Button from "./Button";
import Link from "next/link";
import { useAuth, UserButton } from "@clerk/nextjs";
import ModeToggle from "./ModeToggle";

const Navbar = () => {
  const { userId } = useAuth();
  return (
    <nav className="flex justify-between p-10">
      <div className="flex gap-2 justify-center items-center">
        <Link href="/dashboard">
          <MdQuiz
            size={40}
            className="bg-purple-500 rounded-lg p-1 text-white"
          />
        </Link>

        <p className="text-3xl font-bold text-purple-500">Quizly</p>
      </div>
      <div className="flex gap-5 items-center">
        {userId ? (
          <UserButton showName />
        ) : (
          <Button width="100px">
            {" "}
            <Link href="/sign-in">Login</Link>
          </Button>
        )}
        <ModeToggle />
      </div>
    </nav>
  );
};
export default Navbar;
