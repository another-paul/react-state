import React, { useState } from "react";

import { v4 as uuidv4 } from "uuid";

import { NewAnimeProps } from "./types";

const NewAnime: React.FC<NewAnimeProps> = ({ onAddAnime }) => {
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
};

export default NewAnime;
