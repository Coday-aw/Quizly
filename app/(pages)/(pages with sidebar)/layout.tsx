import ModeToggle from "@/app/components/ModeToggle";
import Sidebar from "@/app/components/sidebar/Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

const layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex px-2 py-5 gap-2">
      <div>
        <Sidebar />
      </div>
<<<<<<< HEAD
      <div className="w-full px-5">
        <div className="flex w-full justify-between items-center">
          <p className="text-4xl font-bold ">
            <span className="text-purple-500">Quiezly</span>, create your own
            quizzes
          </p>
=======
      <div className="w-full">
        <div className="flex w-full gap-2 justify-end">
>>>>>>> 24648072ef600ff4a9b733abb77ba335ed3c5e0f
          <ModeToggle />
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};
export default layout;
