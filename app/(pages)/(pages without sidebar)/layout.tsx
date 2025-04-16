interface layoutProps {
  children: React.ReactNode;
}

const layout = ({ children }: layoutProps) => {
  return <div className="mx-4 p-10">{children}</div>;
};
export default layout;
