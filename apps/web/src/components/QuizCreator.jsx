import React, { useState, ChangeEvent, useEffect } from "react";
import {
  TextField,
  Button,
  Card,
  CardHeader,
  CardContent,
  Radio,
  RadioGroup,
  FormControlLabel,
  Typography,
} from "@mui/material";
import { DragIndicator } from "@mui/icons-material";

// ...

const QuizCreatorV2 = ({ course_id, day }) => {
  const [questions, setQuestions] = useState([
    { question: "", options: ["", "", "", ""], correctAnswer: 0 },
  ]);
  const [editingQuestionIndex, setEditingQuestionIndex] = useState(null);

  const handleQuestionChange = (e, index) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].question = e.target.value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (e, index, optionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].options[optionIndex] = e.target.value;
    setQuestions(updatedQuestions);
  };

  const handleCorrectAnswerChange = (index, optionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].correctAnswer = optionIndex;
    setQuestions(updatedQuestions);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { question: "", options: ["", "", "", ""], correctAnswer: 0 },
    ]);
  };

  const deleteQuestion = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
  };
  const handleDragStart = (e, index) => {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", index.toString());
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Necessary to allow dropping
  };

  const handleDrop = (e, index) => {
    e.preventDefault();
    const draggedIndex = parseInt(e.dataTransfer.getData("text/plain"));
    const newQuestions = [...questions];
    const draggedQuestion = newQuestions.splice(draggedIndex, 1)[0];
    newQuestions.splice(index, 0, draggedQuestion);
    setQuestions(newQuestions);
  };
  const saveQuiz = () => {
    console.log(questions);
  };
  return (
    <div className=" gap-6 w-full self-center content-center justify-center  rounded-lg border  border-gray-200  overflow-hidden dark:border-slate-800">
      <div className="flex flex-col">
        <div className="p-4 border-b border-gray-200 dark:border-gray-800">
          <Typography variant="h6" component="div">
            Create your quiz
          </Typography>
          {/* <Typography variant="body2" color="text.secondary">{title}</Typography> */}
          <Typography variant="body2" color="text.secondary">
            Add your questions and options.
          </Typography>
        </div>
        <div className="p-4 flex-1 flex flex-col gap-4 overflow-auto">
          {questions.map((question, index) => (
            <div
              key={index}
              className="flex flex-col gap-4"
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
            >
              <div className="flex flex-row items-center justify-center gap-2 p-2">
                <DragIndicator />

                <TextField
                  className="flex-1 min-w-0 text-base font-medium"
                  placeholder="Enter your question"
                  type="text"
                  value={question.question}
                  onChange={(e) => handleQuestionChange(e, index)}
                />
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => deleteQuestion(index)}
                >
                  Delete
                </Button>
              </div>
              <div className="grid gap-2 ml-8">
                {question.options.map((option, optionIndex) => (
                  <div
                    key={optionIndex}
                    className="flex flex-row items-center gap-2"
                  >
                    <span className="text-sm font-medium">
                      {String.fromCharCode(97 + optionIndex)})
                    </span>
                    <TextField
                      className="w-[300px] text-sm font-normal"
                      placeholder={`Enter option ${String.fromCharCode(
                        97 + optionIndex
                      )}`}
                      type="text"
                      value={option}
                      onChange={(e) =>
                        handleOptionChange(e, index, optionIndex)
                      }
                    />
                    <div className="ml-auto">
                      <FormControlLabel
                        control={
                          <Radio
                            checked={question.correctAnswer === optionIndex}
                            onChange={() =>
                              handleCorrectAnswerChange(index, optionIndex)
                            }
                          />
                        }
                        label="Correct Answer"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <Button variant="contained" onClick={addQuestion}>
            Add Question
          </Button>
        </div>
        <div className="p-4 border-b border-gray-200 dark:border-gray-800">
          <Button variant="contained" onClick={saveQuiz}>
            Save Quiz
          </Button>
        </div>
      </div>
      <div>{/* <FinalQuiz /> */}</div>
    </div>
  );
};

export default QuizCreatorV2;
