import { Card } from "../cards/Card";
import { CardType } from "./CardType";

export type TypedCard<T extends CardType> = Extract<Card, { type: T }>; // den hjælper med at specificere typen af kort baseret på CardType