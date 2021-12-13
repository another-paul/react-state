import { Classes } from "jss";

export interface CounterClassProps {
  max: number;
  step: number;
  classes: Classes<"counterAction">;
}

export interface CounterClassState {
  count: number;
}