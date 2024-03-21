import Layout from "@/Layouts/Layout";
import CompanyQuestions from "@/components/CodingInterview";
import { Box } from "@mui/system";

export default function index(){
    const dummyData = {
        companyName: "Google",
        questions: [
          {
            title: "Question 1",
            description: "This is the description of question 1.",
            link: "https://example.com/question1"
          },
          {
            title: "Question 2",
            description: "This is the description of question 2.",
            link: "https://example.com/question2"
          },
          {
            title: "Question 3",
            description: "This is the description of question 3.",
            link: "https://example.com/question3"
          }
        ]
      };
    return (
        <Layout>
        <Box display={"flex"} flexDirection={"column"} p={4}>
        <CompanyQuestions dummyData={dummyData} />
        </Box>
        </Layout>
    );
}