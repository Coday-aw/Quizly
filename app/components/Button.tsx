interface ButtonProps {
  children: React.ReactNode;
  width?: string;
  bg?: string;
  type?: "submit" | "button" | "reset";
  onClick?: () => void;
}

const Button = ({ children, width, type, bg, onClick }: ButtonProps) => {
  return (
    <button
      style={{ width, backgroundColor: bg }}
      type={type}
      onClick={onClick}
      className="p-3 bg-purple-500 rounded-lg text-white font-bold cursor-pointer "
    >
      {children}
    </button>
  );
};
export default Button;
