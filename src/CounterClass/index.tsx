import React, { Component } from "react";
import { CounterClassProps, CounterClassState } from "./types";

const localStorageKey = "CounterState";

const getStateFromLocalStorage = (): CounterClassState => {
  const state = localStorage.getItem(localStorageKey);

  if (state) {
    return JSON.parse(state);
  }

  return { count: 0 };
};

const saveStateInLocalStorage = (state: CounterClassState) => {
  localStorage.setItem(localStorageKey, JSON.stringify(state));
};

// if the function to setState gets too complex you can extract it from the component class
// to test it without having to mount the Component
const increment = (
  state: CounterClassState,
  props: CounterClassProps
): CounterClassState => {
  const { max, step } = props;
  if (state.count >= max) return { count: state.count };
  return { count: state.count + step };
};

class CounterClass extends Component<CounterClassProps, CounterClassState> {
  constructor(props: CounterClassProps) {
    super(props);
    // if you can calculate the value from the props or is not needed to render the component
    // it SHOULDN'T be in the state
    this.state = getStateFromLocalStorage();
    this.updateDocumentTitle();
    this.reset = this.reset.bind(this);
  }

  updateDocumentTitle = () => {
    const { count } = this.state;
    document.title = `Count ${count}`;
  };

  postUpdateState = () => {
    saveStateInLocalStorage(this.state);
    this.updateDocumentTitle();
  };

  increment = () => {
    // this.setState is asynchronous, this means that every call is going to get enqued, and if we have
    // multiple calls for the same key those are going to get "merged", (only the last one gets executed)
    // once the state is recalculated the component is re render.
    this.setState(increment, this.postUpdateState);
  };

  addTen = () => {
    const { max } = this.props;
    // when passing a function to this.setState there is no way to merge objects, that means that if we have
    // multiple calls all of them will get executed, and the state will get updated each time.
    this.setState((state) => {
      if (state.count >= max) return { count: state.count };
      return { count: state.count + 10 };
    }, this.postUpdateState);
  };

  decrement() {
    const { count } = this.state;
    // this.setState can receive a callback function to execute after the state was updated.
    this.setState({ count: count - 1 }, this.postUpdateState);
  }

  reset() {
    this.setState({ count: 0 }, this.postUpdateState);
  }

  render() {
    const { count } = this.state;

    return (
      <div>
        <p>Counter Class:</p>
        <p>{count}</p>
        <span>
          <button type="button" onClick={this.increment}>
            Increment
          </button>
          <button type="button" onClick={this.addTen}>
            Add 10
          </button>
          <button type="button" onClick={() => this.decrement()}>
            Decrement
          </button>
          <button type="button" onClick={this.reset}>
            Reset
          </button>
        </span>
      </div>
    );
  }
}

export default CounterClass;
