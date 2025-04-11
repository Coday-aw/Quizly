import { QuizIcons } from "@/lib/data";
import { IconType } from "react-icons";
interface QuizIconProps {
  setIcon: (icon: IconType) => void;
}
const QuizIcon = ({ setIcon }: QuizIconProps) => {
  return (
    <div className=" bg-white dark:bg-slate-800 border-2 border-purple-300 p-5 rounded-lg w-[500px] h-[500px]">
      <p className="mb-10 mt-5 font-bold text-purple-500 text-lg">
        Choose icon for your quiz
      </p>
      <ul className="flex gap-5 items-center justify-center flex-wrap border p-4 rounded-lg border-slate-200">
        {QuizIcons.map((icon, index) => (
          <li
            className="border-2 px-5 py-2 border-slate-200 hover:border-purple-300 hover:text-purple-500 rounded-lg cursor-pointer"
            key={index}
            onClick={() => setIcon(icon.icon)}
          >
            <icon.icon size={25} />
          </li>
        ))}
      </ul>
    </div>
  );
};
export default QuizIcon;
