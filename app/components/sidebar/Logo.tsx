import { MdQuiz } from "react-icons/md";

const Logo = () => {
  return (
    <div className="flex gap-2 justify-center items-center">
      <MdQuiz size={40} className="bg-purple-500 rounded-lg p-1 text-white" />

      <p className="text-3xl font-bold text-purple-500">Quizly</p>
    </div>
  );
};
export default Logo;
