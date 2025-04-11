import ModeToggle from "@/app/components/ModeToggle";
import Sidebar from "@/app/components/sidebar/Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

const layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex p-2 gap-2">
      <div>
        <Sidebar />
      </div>
      <div className="w-full">
        <div className="flex w-full gap-2 justify-end">
          <ModeToggle />
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};
export default layout;
