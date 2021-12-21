import "./App.css";

import React, { useState } from "react";

import { createUseStyles } from "react-jss";

import AnimeList from "./AnimeList";
import AnimeListContext from "./AnimeListContext";
import AnimeContextProvider from "./AnimeListContext/AnimeContextProvider";
import AnimeListReducer from "./AnimeListReducer";
import CounterClass from "./CounterClass";
import CounterFunction from "./CounterFunction";
import logo from "./logo.svg";

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
  } else if (component === "animeList") {
    currentComponent = <AnimeList />;
  } else if (component === "animeListReducer") {
    currentComponent = <AnimeListReducer />;
  } else if (component === "animeListContext") {
    currentComponent = (
      <AnimeContextProvider>
        <AnimeListContext />
      </AnimeContextProvider>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
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
        <button
          className={classes.componentSelector}
          type="button"
          onClick={() => setComponent("animeListContext")}
        >
          Anime list using Context
        </button>
      </div>
      {currentComponent}
    </div>
  );
}

export default App;
