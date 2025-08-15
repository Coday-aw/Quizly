"use client";
import { ActiveLinkProvider } from "../context/ActiveLinkContext";
import { useAuth, UserButton } from "@clerk/nextjs";
import { MdQuiz } from "react-icons/md";
import Links from "./Links";
import { useEffect, useState } from "react";

const Sidebar = () => {
  const { userId } = useAuth();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  return (
    <ActiveLinkProvider>
      <div className="dark:bg-slate-800 rounded-lg">
        <div className="flex flex-col  gap-10 border  border-slate-300 dark:border-none shadow-lg w-16 h-screen p-2 rounded-lg">
          <div className="flex flex-col items-center gap-10">
            <MdQuiz
              size={40}
              className="bg-purple-500 rounded-lg p-1 text-white cursor-pointer"
            />
            <Links />
            {isMounted ? userId ? <UserButton /> : "" : null}
          </div>
        </div>
      </div>
    </ActiveLinkProvider>
  );
};
export default Sidebar;
