import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardContent,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { useParams } from "next/navigation";
import { useFetch } from "@/hooks/useFetch";
import { useRouter } from "next/router";

const QuizAttendee = () => {
  const { loading, get, post } = useFetch();

  const router = useRouter();

  const { quiz_id } = router.query;

  const [test, setTest] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [score, setScore] = useState(0);
  const [visitedQuestions, setVisitedQuestions] = useState([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [clearButtonEnabled, setClearButtonEnabled] = useState(true);
  const [selectedTestId, setSelectedTestId] = useState(null);

  useEffect(() => {
    const submitQuiz = async () => {
      try {
        console.log({ selectedOptions });
        const answers = Object.entries(selectedOptions).map(
          ([questionId, option]) => ({ questionId, option })
        );
        const { data, status } = await post(
          `/tests/${quiz_id}`,
          {},
          { answers }
        );
        console.log({ data, status });
      } catch (error) {
        console.error(error);
      }
    };
    if (quizCompleted) {
      submitQuiz();
    }
  }, [quizCompleted]);

  useEffect(() => {
    if (!quiz_id) return;
    const fetchTest = async (testId) => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_API}/tests/${testId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch test");
        }
        const data = await response.json();
        setTest(data.test);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setError("Something went wrong while fetching test");
        setIsLoading(false);
      }
    };

    fetchTest(quiz_id);
  }, [quiz_id]);

  const handleOptionChange = (e) => {
    const questionId = test.questions[currentQuestionIndex].id;
    const updatedOptions = { ...selectedOptions };
    updatedOptions[questionId] = parseInt(e.target.value);
    setSelectedOptions(updatedOptions);
    if (!visitedQuestions.includes(currentQuestionIndex)) {
      setVisitedQuestions([...visitedQuestions, currentQuestionIndex]);
    }
    setClearButtonEnabled(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex === test.questions.length - 1) {
      setQuizCompleted(true);
    } else {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
  };

  const handleClearOption = () => {
    const questionId = test.questions[currentQuestionIndex].id;
    const updatedOptions = { ...selectedOptions };
    delete updatedOptions[questionId];
    setSelectedOptions(updatedOptions);
    setClearButtonEnabled(true);
  };

  useEffect(() => {
    if (!test) return;

    let newScore = 0;
    for (let i = 0; i < test.questions.length; i++) {
      const questionId = test.questions[i].id;
      const correctAnswer = test.questions[i].answer;
      const selectedOption = selectedOptions[questionId];
      if (selectedOption === correctAnswer) {
        newScore++;
      }
    }
    setScore(newScore);
  }, [selectedOptions, test]);

  const renderQuestion = () => {
    const question = test.questions[currentQuestionIndex];
    const questionId = question.id;
    const selectedOption = selectedOptions[questionId];

    return (
      <div className="flex">
        <div className="w-full mx-auto border border-solid border-gray-300 p-4 rounded-md">
          <Typography variant="h5" className="mb-4">
            Question {currentQuestionIndex + 1}:
          </Typography>
          <Typography variant="h6" className="mb-4">
            {question.question}
          </Typography>
          <RadioGroup
            value={selectedOption !== undefined ? selectedOption : ""}
            onChange={handleOptionChange}
          >
            {question.options.map((option, index) => (
              <FormControlLabel
                key={index}
                value={index}
                control={<Radio />}
                label={option}
                className="mb-2 border border-solid border-gray-300 p-2 rounded-md block cursor-pointer"
              />
            ))}
          </RadioGroup>
          <div className="flex mt-6">
            <Button
              variant="contained"
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
              className="mr-2"
            >
              Previous Question
            </Button>
            <Button
              variant="contained"
              onClick={handleClearOption}
              disabled={!clearButtonEnabled}
              className="mr-2"
            >
              Clear Option
            </Button>
            <Button
              variant="contained"
              onClick={handleNextQuestion}
              disabled={false}
            >
              {currentQuestionIndex === test.questions.length - 1
                ? "Finish Quiz"
                : "Next Question"}
            </Button>
          </div>
        </div>
        <div className="flex flex-col ml-4">
          {test.questions.map((_, index) => (
            <button
              key={index}
              className={`h-8 w-8 border border-solid border-gray-300 rounded-md mb-2 ${
                visitedQuestions.includes(index)
                  ? selectedOptions[index] === undefined
                    ? "bg-red-500 text-white"
                    : "bg-green-500 text-white"
                  : ""
              } ${
                index === currentQuestionIndex ? "bg-blue-500 text-white" : ""
              }`}
              onClick={() => setCurrentQuestionIndex(index)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderResult = () => {
    return (
      <div className="w-full max-w-800 mx-auto mt-4">
        <Typography variant="h4" className="mb-4">
          Quiz Completed!
        </Typography>
        <Typography variant="h5" className="mb-4">
          Your Score: {score}/{test.questions.length}
        </Typography>
      </div>
    );
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Card>
      <CardContent>
        {quizCompleted ? renderResult() : renderQuestion()}
      </CardContent>
    </Card>
  );
};

export default QuizAttendee;
