import React, { useState, useEffect } from "react";
import { CounterFunctionProps } from "./types";

const localStorageKey = "CounterFunctionState";

const getStateFromLocalStorage = (): number => {
  const state = localStorage.getItem(localStorageKey);

  if (state) {
    return JSON.parse(state).count;
  }

  return 0;
};

const saveCountInLocalStorage = (count: number) => {
  localStorage.setItem(localStorageKey, JSON.stringify({ count }));
};

const CounterFunction: React.FC<CounterFunctionProps> = ({
  max,
  step,
}): React.ReactElement => {
  const [count, setCount] = useState(getStateFromLocalStorage());

  const increment = () => {
    // the function we get to update the state from React.useState can receive a function as parameter, like this.setState in class components
    // the difference is that it only receives the linked state property, it doesn't receive props as this.setState.

    // one similarity with this.setState is that if we have multiple calls with a function as argunemtn, all of the calls update the state
    setCount((c) => {
      // when working with JS, no TS, be very careful, if there is no return value the state will get updated to undefined.
      if (c >= max) return c;
      return c + step;
    });
  };
  const addTen = () => {
    if (count >= max) return;
    setCount(count + 10);
  };
  function decrement() {
    // the function we get to update the state from React.useState is asynchronous and enqueues state changes.
    // if it gets called multiple times with a value the last call is the one that updates the state
    setCount(count - 1); // doesn't update count
    setCount(count - 2); // doesn't update count
    setCount(count - 1); // updates count
  }
  const reset = () => {
    setCount(0);
  };

  // the function we get to update the state from React.useState can't receive a callback function as second parameter like this.setState
  // we can use useEffect to accomplish something similar
  // useEffect can receive 2 parameters, a function and an array of dependencies. The function will get executed every time a dependency changes
  // if we don't set any dependency it will run on every render (if the function changes the state it will get loop)
  // if the dependencies array is empty it will run only one time, when the component is mount, similar to componentDidMount
  useEffect(() => {
    document.title = `Functional Count: ${count}`;
  }, [count]);

  // You can have multiple useEffect with the same dependencies, to gain some modularity.
  useEffect(() => {
    saveCountInLocalStorage(count);
  }, [count]);

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
