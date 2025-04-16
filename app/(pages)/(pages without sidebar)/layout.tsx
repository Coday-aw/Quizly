interface layoutProps {
  children: React.ReactNode;
}

const layout = ({ children }: layoutProps) => {
  return <div className="mx-4">{children}</div>;
};
export default layout;
