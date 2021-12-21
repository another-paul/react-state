import React, { useContext, useState } from "react";

import { v4 as uuidv4 } from "uuid";

import AnimeContext from "../AnimeContext";

const NewAnime: React.FC = () => {
  const [animeName, setAnimeName] = useState("");
  const { addAnime } = useContext(AnimeContext);

  const handleAnimeNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    setAnimeName(value);
  };

  const handleAddAnime = () => {
    addAnime({
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
};

export default NewAnime;
