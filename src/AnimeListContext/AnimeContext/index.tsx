import React from "react";

import { AnimeContext as AnimeContextInterface } from "./types";

const AnimeContext = React.createContext<AnimeContextInterface>(
  {} as AnimeContextInterface
);

export default AnimeContext;
