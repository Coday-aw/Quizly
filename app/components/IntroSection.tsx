import Button from "./Button";
import Link from "next/link";
import Image from "next/image";
import HeroPic from "@/public/heroPic.png";

const IntroSection = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-3 mt-10 mb-10">
      <p className="text-4xl font-bold">
        Welcome to <span className="text-purple-500">Quizly</span>{" "}
      </p>
      <p className="text-xl text-gray-500">
        With quizly you can create and custom your own quizzes
      </p>
      <Button>
        {" "}
        <Link href="/sign-in"> Get started now! </Link>{" "}
      </Button>

      <Image
        src={HeroPic}
        height={800}
        width={800}
        alt="hero picture"
        className="mt-10 rounded-lg px-5 md:p-0"
      />
    </div>
  );
};
export default IntroSection;
