import React, { Component } from "react";
import { CounterClassProps, CounterClassState } from "./types";

class CounterClass extends Component<CounterClassProps, CounterClassState> {
  constructor(props: CounterClassProps) {
    super(props);
    this.state = {
      count: 0,
    };

    this.reset = this.reset.bind(this);
  }

  increment = () => {
    const { count } = this.state;
    // this.setState is asynchronous, this means that every call is going to get enqued, and if we have
    // multiple calls for the same key those are going to get "merged", (only the last one gets executed)
    // once the state is recalculated the component is re render.
    this.setState({ count: count + 1 });
  };

  addTen = () => {
    // when passing a function to this.setState there is no way to merge objects, that means that if we have
    // multiple calls all of them will get executed, and the state will get updated each time.
    this.setState((state) => ({ count: state.count + 10 }));
  };

  decrement() {
    const { count } = this.state;
    this.setState({ count: count - 1 });
  }

  reset() {
    this.setState({ count: 0 });
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
