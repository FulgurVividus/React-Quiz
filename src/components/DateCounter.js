import { useReducer } from "react";

const initialState = { count: 0, step: 1 };

// reducer function - one centralized logic
function reducer(state, action) {
  console.log(state, action);
  // whatever we return here, will become the new state
  // if (action.type === "inc") {
  //   return state + action.payload;
  // }
  // if (action.type === "dec") {
  //   return state - action.payload;
  // }
  // if (action.type === "setCount") {
  //   return action.payload;
  // }

  switch (action.type) {
    case "dec":
      return { ...state, count: state.count - state.step };
    case "inc":
      return { ...state, count: state.count + state.step };
    case "setState":
      return { ...state, count: action.payload };
    case "setStep":
      return { ...state, step: action.payload };
    case "reset":
      return initialState;
    default:
      throw new Error(`Unknown action`);
  }
}

function DateCounter() {
  // const [count, setCount] = useState(0);
  // const [step, setStep] = useState(1);

  const [state, dispatch] = useReducer(reducer, initialState);
  const { count, step } = state;

  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  const dec = function () {
    // this object is called the 'action' when we work with reducer functions
    // 'payload' is optional
    dispatch({ type: "dec", payload: -1 });

    // setCount((count) => count - 1);
    // setCount((count) => count - step);
  };

  const inc = function () {
    dispatch({ type: "inc", payload: 1 });

    // setCount((count) => count + 1);
    // setCount((count) => count + step);
  };

  const defineCount = function (e) {
    // setCount(Number(e.target.value));

    dispatch({ type: "setCount", payload: Number(e.target.value) });
  };

  const defineStep = function (e) {
    // setStep(Number(e.target.value));

    dispatch({ type: "setStep", payload: Number(e.target.value) });
  };

  const reset = function () {
    // setCount(0);
    // setStep(1);

    dispatch({ type: "reset" });
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;

//! SOME NOTES:
// 1. useReducer hook - is basically a more advanced and more complex way of managing state instead of useState hook

// useReducer works with a so called 'reducer' function, which is pure function that will always take in the current state and so called 'action' as an argument and then will return the next state. In a nutshell, it takes not only initial state but also reducer function

// function reducer(current_state, action) {...}

// const [state_variable, dispatch] = useReducer(reducer, initial_state);

// 'reducer' function gets called in 'dispatch'. 'dispatch' can also be used to update the state

// the idea of the 'reducer' is to take these (current_state, action) and based on that to return the next state
