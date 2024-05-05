import Layout from "@/Layouts/Layout";
import QuizCreatorV2 from "@/components/QuizCreator";
import React, { useState, useEffect } from "react";
import { useFetch } from "@/hooks/useFetch";
import { useAuth } from "@/contexts/authContext";
import { QuizCard, QuizInfo } from "@/components/component/quiz-info";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

const index = () => {
  const { get } = useFetch();
  const { token } = useAuth();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await get("/tests", {}, token);
        if (response.status !== 200) {
          throw new Error("Failed to fetch tests");
        }
        console.log(response.data);
        setData(response.data.tests);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Something went wrong while fetching tests");
        setLoading(false);
      }
    };
    fetchTests();
  }, []);

  return (
    <Layout>
      <div className="grid gap-6 w-full max-w-sm sm:max-w-md lg:max-w-4xl xl:max-w-5xl mx-auto grid-cols-1 md:grid-cols-2 items-start">
        {data.map((test) => (
          <div key={test.id}>
            <QuizCard
              name={test.name}
              numberofQuestions={test.numberOfQuestions}
              id={test.id}
            />
          </div>
        ))}
      </div>
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Create a new test
        </h2>
        <Button
          className="ml-4 w-[200px]"
          onClick={() => {
            router.push("aptitude-tests/create");
          }}
        >
          Create
        </Button>
      </div>
    </Layout>
  );
};

export default index;
