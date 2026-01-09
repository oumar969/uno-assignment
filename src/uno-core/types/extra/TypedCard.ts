import { CardType } from "../CardType";
import type { CardUnion } from "./CardUnion";

type CardKeys = keyof CardUnion;
// picking properties
export type CardColorOnly = Pick<CardUnion, "color">;
//Filtering union members
export type TypedCard<T extends CardType> = Extract<CardUnion, { type: T }>; 
//Removing properties
export type TypedCardOmit<T extends CardType> = Omit<CardUnion, "type">;

//“I model the domain using a discriminated union, 
// and then I use utility types like Pick, Extract, 
// and Omit to derive more specific or simplified types without duplicating code
/*
- Utility types (Extract)
- Generics
- Type-level programming
- Compile-time safety
- No runtime cost
*/
