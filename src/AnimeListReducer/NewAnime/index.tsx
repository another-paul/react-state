import React, { useState } from "react";

import { v4 as uuidv4 } from "uuid";

import { NewAnimeProps } from "./types";

// By using React.memo we prevent the component from rerendering if its props didn't change
// If the props of the component change constantly there React.memo will make performance worse,
// it is going to check and rerender every single time.
const NewAnime: React.FC<NewAnimeProps> = React.memo(
  ({ onAddAnime }: NewAnimeProps) => {
    const [animeName, setAnimeName] = useState("");

    const handleAnimeNameChange = (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      const { value } = event.target;
      setAnimeName(value);
    };

    const handleAddAnime = () => {
      onAddAnime({
        id: uuidv4(),
        name: animeName,
        watched: false,
      });

      setAnimeName("");
    };

    console.log("Rendering new anime");

    return (
      <div>
        <input
          type="text"
          placeholder="name"
          value={animeName}
          onChange={handleAnimeNameChange}
        />
        <button type="button" onClick={handleAddAnime}>
          Add New Anime
        </button>
      </div>
    );
  }
);

export default NewAnime;
