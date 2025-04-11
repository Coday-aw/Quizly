import Button from "./Button";
import Link from "next/link";

const IntroSection = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-3">
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
    </div>
  );
};
export default IntroSection;
