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

const QuizAttendee = ({ questions }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [score, setScore] = useState(0);
  const [visitedQuestions, setVisitedQuestions] = useState([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [clearButtonEnabled, setClearButtonEnabled] = useState(true);

  const handleOptionChange = (e) => {
    const updatedOptions = { ...selectedOptions };
    updatedOptions[currentQuestionIndex] = parseInt(e.target.value);
    setSelectedOptions(updatedOptions);
    if (!visitedQuestions.includes(currentQuestionIndex)) {
      setVisitedQuestions([...visitedQuestions, currentQuestionIndex]);
    }
    setClearButtonEnabled(true)
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex === questions.length - 1) {
      setQuizCompleted(true);
    } else {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
  };

  const handleClearOption = () => {
    const updatedOptions = { ...selectedOptions };
    delete updatedOptions[currentQuestionIndex];
    setSelectedOptions(updatedOptions);
    setClearButtonEnabled(true);
  };

  useEffect(() => {
    let newScore = 0;
    for (let i = 0; i < questions.length; i++) {
      const correctAnswer = questions[i].correctAnswer;
      const selectedOption = selectedOptions[i];
      if (selectedOption === correctAnswer) {
        newScore++;
      }
    }
    setScore(newScore);
  }, [selectedOptions]);

  const renderQuestion = () => {
    const question = questions[currentQuestionIndex];
    const selectedOption = selectedOptions[currentQuestionIndex];

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
              {currentQuestionIndex === questions.length - 1
                ? "Finish Quiz"
                : "Next Question"}
            </Button>
          </div>
        </div>
        <div className="flex flex-col ml-4">
          {questions.map((_, index) => (
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
          Your Score: {score}/{questions.length}
        </Typography>
      </div>
    );
  };

  return (
    <Card>
      <CardContent>{quizCompleted ? renderResult() : renderQuestion()}</CardContent>
    </Card>
  );
};

export default QuizAttendee;
