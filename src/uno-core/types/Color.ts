export const Colors = ["red", "yellow", "green", "blue"] as const;
export type Color = typeof Colors[number];

//type Color = "red" | "yellow" | "green" | "blue";

/* 
  as const
  - type aliases: a nickname for a type
  typeof
  - union types
*/