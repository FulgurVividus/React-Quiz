import { useEffect, useReducer } from "react";

import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import Timer from "./Timer";

const SECS_PER_QUESTION = 30;

// initial state
const initialState = {
  // these are pieces of state
  questions: [],

  // 'loading', 'error', 'ready', 'active', 'finished'
  status: "loading",
  currentIndex: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};

// reducer function
function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case "newAnswer":
      // current question
      const question = state.questions.at(state.currentIndex);

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, currentIndex: state.currentIndex + 1, answer: null };
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "restart":
      return { ...initialState, questions: state.questions, status: "ready" };
    case "timer":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finish" : state.status,
      };
    default:
      throw new Error(`Action unknown...`);
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const numQuestions = state.questions.length;
  const maxPossiblePoints = state.questions.reduce(
    (prev, curr) => prev + curr.points,
    0
  );

  useEffect(function () {
    fetch(`http://localhost:8000/questions`)
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((error) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <>
      <div className="app">
        <Header />

        <Main>
          {state.status === "loading" && <Loader />}
          {state.status === "error" && <Error />}
          {state.status === "ready" && (
            <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
          )}
          {state.status === "active" && (
            <>
              <Progress
                currentIndex={state.currentIndex}
                numQuestions={numQuestions}
                points={state.points}
                maxPossiblePoints={maxPossiblePoints}
                answer={state.answer}
              />
              <Question
                question={state.questions[state.currentIndex]}
                dispatch={dispatch}
                answer={state.answer}
              />
              <Footer>
                <Timer
                  dispatch={dispatch}
                  secondsRemaining={state.secondsRemaining}
                />
                <NextButton
                  dispatch={dispatch}
                  answer={state.answer}
                  currentIndex={state.currentIndex}
                  numQuestions={numQuestions}
                />
              </Footer>
            </>
          )}
          {state.status === "finish" && (
            <FinishScreen
              points={state.points}
              maxPossiblePoints={maxPossiblePoints}
              highscore={state.highscore}
              dispatch={dispatch}
            />
          )}
        </Main>
      </div>
    </>
  );
}

export default App;
