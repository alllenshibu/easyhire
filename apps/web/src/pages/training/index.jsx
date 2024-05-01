import Layout from "@/Layouts/Layout";
import CompanyQuestions from "@/components/CodingInterview";
import { useAuth } from "@/contexts/authContext";
import { useFetch } from "@/hooks/useFetch";
import { Box } from "@mui/system";
import { useEffect } from "react";

export default function index() {
  const { get } = useFetch();
  const { token } = useAuth();
  const dummyData = {
    companyName: "Google",
    questions: [
      {
        title: "Question 1",
        description: "This is the description of question 1.",
        link: "https://example.com/question1",
      },
      {
        title: "Question 2",
        description: "This is the description of question 2.",
        link: "https://example.com/question2",
      },
      {
        title: "Question 3",
        description: "This is the description of question 3.",
        link: "https://example.com/question3",
      },
    ],
  };

  const getQuestions = async () => {
    get("/questions", token)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getQuestions();
  }, []);

  return (
    <Layout>
      <Box display={"flex"} flexDirection={"column"} p={4}>
        <CompanyQuestions dummyData={dummyData} />
      </Box>
    </Layout>
  );
}
