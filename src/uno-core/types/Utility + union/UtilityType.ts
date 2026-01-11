import { CardType } from "../CardType";
import type { CardUnion } from "./CardUnion";

type CardKeys = keyof CardUnion;//giv mig alle mulige keys, som en CardUnion kan have.
//Removing properties
export type TypedCardOmit<T extends CardType> = Omit<CardUnion, "type">;
//Filtering union members
export type TypedCard<T extends CardType> = Extract<CardUnion, { type: T }>; 
// picking properties
export type CardColorOnly = Pick<CardUnion, "color">;
