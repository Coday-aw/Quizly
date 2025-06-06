import SearchBar from "@/app/components/Search";
import QuizList from "@/app/components/QuizList";

interface DashboardProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Dashboard({ searchParams }: DashboardProps) {
  const query = (await searchParams).q as string;

  return (
    <div className="p-10">
      <SearchBar />
      <QuizList query={query} />
    </div>
  );
}
