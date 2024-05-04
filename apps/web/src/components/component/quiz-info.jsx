import { CardContent, Card } from "@/components/ui/card";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";

export function QuizCard({ name, numberofQuestions,id }) {
    const router =useRouter();
  return (
    <Card>
      <CardContent className="flex flex-col pt-6">
        <div className="flex flex-row items-center gap-2">
          <BookOpenIcon className="w-6 h-6 text-gray-500 " />
          <h3 className="text-lg font-medium leading-none">{name}</h3>
        </div>
        <p className="text-sm text-gray-500 ">{numberofQuestions} questions</p>
        <Button variant="outline"  className="mt-4" onClick={()=>{router.push(`/aptitude-tests/${id}/test`)}}>Attempt</Button>
      </CardContent>
    </Card>
  );
}

export function QuizInfo() {
  return (
    <div className="grid gap-6 w-full max-w-sm sm:max-w-md lg:max-w-4xl xl:max-w-5xl mx-auto grid-cols-1 md:grid-cols-2 items-start">
      <QuizCard
        title="Introduction to Biology"
        totalQuestions={10}
        attemptedQuestions={5}
        averageScore={80}
      />
      <QuizCard
        title="World History"
        totalQuestions={15}
        attemptedQuestions={10}
        averageScore={70}
      />
      <QuizCard
        title="English Literature"
        totalQuestions={12}
        attemptedQuestions={8}
        averageScore={90}
      />
      <QuizCard
        title="Algebra"
        totalQuestions={20}
        attemptedQuestions={15}
        averageScore={65}
      />
    </div>
  );
}

function BookOpenIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}
