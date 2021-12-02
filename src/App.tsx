import React from "react";
import logo from "./logo.svg";
import "./App.css";
import CounterClass from "./CounterClass";
import CounterFunction from "./CounterFunction";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <CounterClass max={50} step={2} />
        <CounterFunction max={50} step={2} />
      </header>
    </div>
  );
}

export default App;
