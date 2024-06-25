import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import { type } from "@testing-library/user-event/dist/type";

// initial state
const initialState = {
  questions: [],

  // 'loading', 'error', 'ready', 'active', 'finished'
  status: "loading",
};

// reducer function
function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    default:
      throw new Error(`Action unknown...`);
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

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
          <p>1/15</p>
          <p>Questions?</p>
        </Main>
      </div>
    </>
  );
}

export default App;
