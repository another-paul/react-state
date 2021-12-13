import React, { useEffect, useRef, useState } from "react";
import { createUseStyles } from "react-jss";
import { CounterFunctionProps } from "./types";
import useLocalStorage from "../hooks";

const useStyles = createUseStyles({
  counterAction: {
    margin: "0 6px",
    fontSize: "16px",
  },
});

const localStorageKey = "count";

const CounterFunction: React.FC<CounterFunctionProps> = ({
  max,
  step,
}): React.ReactElement => {
  const classes = useStyles();
  const [count, setCount] = useLocalStorage(0, localStorageKey);
  const countRef = useRef<number>();

  const [message, setMessage] = useState("---");
  useEffect(() => {
    if (countRef.current !== undefined && countRef.current > count) {
      setMessage("Lower");
    }
    if (countRef.current !== undefined && countRef.current < count) {
      setMessage("Higher");
    }
  }, [count]);

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
    console.log("State changed", count, message);
    // A reference can let us persist the state, so we can compare previous and current value;
    countRef.current = count;
  }, [count, message]);

  useEffect(() => {
    const id = setInterval(() => {
      console.log(`Le count: ${count}`);
    }, 1000);
    // We can return a callback function that will get executed the next time the dependecy changes.
    // In this way we can perform any cleanup action, like close sockets
    return () => {
      console.log("clearing interval", id);
      clearInterval(id);
    };
  }, [count]);

  return (
    <div>
      <p>Counter Function:</p>
      <p>{`The new value is ${message}`}</p>
      <p>{count}</p>
      <span>
        <button
          className={classes.counterAction}
          type="button"
          onClick={increment}
        >
          Increment
        </button>
        <button
          className={classes.counterAction}
          type="button"
          onClick={addTen}
        >
          Add 10
        </button>
        <button
          className={classes.counterAction}
          type="button"
          onClick={decrement}
        >
          Decrement
        </button>
        <button className={classes.counterAction} type="button" onClick={reset}>
          Reset
        </button>
      </span>
    </div>
  );
};

export default CounterFunction;
