import React from "react";
import { CounterFunctionProps } from "./types";

const CounterFunction: React.FC<CounterFunctionProps> = ({
  max,
  step,
}): React.ReactElement => {
  const [count, setCount] = React.useState(0);

  const increment = () => {
    if (count >= max) return;
    setCount(count + step);
  };
  const addTen = () => {
    if (count >= max) return;
    setCount(count + 10);
  };
  function decrement() {
    // the function we get to update the state from React.useState is asynchronous and enqueues state changes.
    // if it gets called multiple times the last call is the one that gets executed.
    setCount(count - 1); // doesn't update count
    setCount(count - 2); // doesn't update count
    setCount(count - 1); // updates count
  }
  const reset = () => {
    setCount(0);
  };

  return (
    <div>
      <p>Counter Function:</p>
      <p>{count}</p>
      <span>
        <button type="button" onClick={increment}>
          Increment
        </button>
        <button type="button" onClick={addTen}>
          Add 10
        </button>
        <button type="button" onClick={decrement}>
          Decrement
        </button>
        <button type="button" onClick={reset}>
          Reset
        </button>
      </span>
    </div>
  );
};

export default CounterFunction;
