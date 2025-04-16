interface layoutProps {
  children: React.ReactNode;
}

const layout = ({ children }: layoutProps) => {
  return <div className="p-14 mx-4">{children}</div>;
};
export default layout;
