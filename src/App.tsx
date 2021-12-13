import React, { useState } from "react";
import { createUseStyles } from "react-jss";
import logo from "./logo.svg";
import "./App.css";
import CounterClass from "./CounterClass";
import CounterFunction from "./CounterFunction";

const useStyles = createUseStyles({
  componentSelector: {
    margin: "0 6px",
    fontSize: "16px",
  },
});

function App() {
  const classes = useStyles();

  const [component, setComponent] = useState("counterClass");

  let currentComponent;

  if (component === "counterClass") {
    currentComponent = <CounterClass max={50} step={2} />;
  } else if (component === "counterFunction") {
    currentComponent = <CounterFunction max={50} step={2} />;
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          <button
            className={classes.componentSelector}
            type="button"
            onClick={() => setComponent("counterClass")}
          >
            Counter using Class components
          </button>
          <button
            className={classes.componentSelector}
            type="button"
            onClick={() => setComponent("counterFunction")}
          >
            Counter using Functional components
          </button>
          <button
            className={classes.componentSelector}
            type="button"
            onClick={() => setComponent("animeList")}
          >
            Anime list
          </button>
          <button
            className={classes.componentSelector}
            type="button"
            onClick={() => setComponent("animeListReducer")}
          >
            Anime list using Reducer pattern
          </button>
        </div>
        {currentComponent}
      </header>
    </div>
  );
}

export default App;
