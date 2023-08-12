import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Quiz.css";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Pagination from "../Components/Pagination";
import { useContext } from "react";
import { scoreContext } from "../App";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { increment } from "../Features/scoreSlice";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [displayanswer, setDisplayAnswer] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const [options, setOptions] = useState([]);
  const [scoreMessage, setScoreMessage] = useState("");
  const [questionOrder, setQuestionOrder] = useState([
    { number: 1, visited: false },
    { number: 2, visited: false },
    { number: 3, visited: false },
    { number: 4, visited: false },
    { number: 5, visited: false },
    { number: 6, visited: false },
    { number: 7, visited: false },
    { number: 8, visited: false },
    { number: 9, visited: false },
    { number: 10, visited: false },
    { number: 11, visited: false },
    { number: 12, visited: false },
    { number: 13, visited: false },
    { number: 14, visited: false },
    { number: 15, visited: false },
    { number: 16, visited: false },
    { number: 17, visited: false },
    { number: 18, visited: false },
    { number: 19, visited: false },
    { number: 20, visited: false },
  ]);
  // const { score, setScore } = useContext(scoreContext);
  const dispatch = useDispatch();
  const score = useSelector((state) => state.score.value);

  useEffect(() => {
    console.log("Im in useEffect!!");
    fetchQuestions();
  }, []);

  const fetchQuestions = () => {
    try {
      axios
        .get(
          "https://opentdb.com/api.php?amount=20&category=18&difficulty=medium&type=multiple"
        )
        .then((response) => {
          setQuestions(response.data.results);
          setOptions([
            ...response.data.results[currentQuestion].incorrect_answers,
            response.data.results[currentQuestion].correct_answer,
          ]);
        });
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };
  console.log("::::>", options);

  const handleAnswerClick = (answer) => {
    setQuestionOrder(
      questionOrder.map((question) => {
        if (question.number === currentQuestion + 1) {
          return { ...question, visited: true };
        }
        return question;
      })
    );
    if (answer === questions[currentQuestion].correct_answer) {
      // setScore((prevScore) => prevScore + 1);
      dispatch(increment());
    } else {
      setErrorMessage(true);
      setDisplayAnswer(questions[currentQuestion].correct_answer);
    }
    console.log("currentQuestion", currentQuestion);
  };
  const handlePreviousQuestion = () => {
    setErrorMessage(false);
    setDisplayAnswer("");

    const prevQuestion = currentQuestion - 1;
    if (prevQuestion > 0) {
      setCurrentQuestion(prevQuestion);
      setOptions([
        ...questions[prevQuestion].incorrect_answers,
        questions[prevQuestion].correct_answer,
      ]);
    }
  };
  const handleNextQuestion = () => {
    setErrorMessage(false);
    setDisplayAnswer("");

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setOptions([
        ...questions[nextQuestion].incorrect_answers,
        questions[nextQuestion].correct_answer,
      ]);
    }
  };

  if (questions.length === 0) {
    return <div>Loading...</div>;
  }
  const changeQuestion = (val) => {
    setErrorMessage(false);
    setDisplayAnswer("");

    setCurrentQuestion(val - 1);
    setOptions([
      ...questions[val - 1].incorrect_answers,
      questions[val - 1].correct_answer,
    ]);
  };
  const onSubmit = () => {
    setScoreMessage(`Score is ${score}`);
  };

  return (
    <div className="quiz-container">
      <>
        <div className="question-section">
          <div className="question-count">
            Question {currentQuestion + 1} of {questions.length}
          </div>
          <div className="question-text">
            {questions[currentQuestion].question}
          </div>
        </div>
        <div className="answer-section">
          <div>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
            >
              {options.map((option) => (
                <FormControlLabel
                  control={<Radio />}
                  value={option}
                  label={option}
                  key={option}
                  onChange={() => handleAnswerClick(option)}
                />

                // <button key={option} onClick={() => handleAnswerClick(option)}>
                //   {option}
                // </button>
              ))}
            </RadioGroup>
          </div>
          <div>{errorMessage && `ErrorMessage`}</div>
          <div>
            {displayanswer && `Your Correct answer is ${displayanswer}`}
          </div>
        </div>
        <div className="button-content">
          <button onClick={handlePreviousQuestion}>
            <KeyboardArrowLeftIcon />
            Prev
          </button>
          <button onClick={handleNextQuestion}>
            <KeyboardArrowRightIcon />
            Next
          </button>
        </div>
      </>

      <Pagination
        changeQuestion={changeQuestion}
        questionOrder={questionOrder}
      />
      <Link to="/submit">
        <button onClick={onSubmit}>Submit</button>
      </Link>
      <div>
        <h2>{scoreMessage}</h2>
      </div>
    </div>
  );
};

export default Quiz;
