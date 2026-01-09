export const Colors = ["red", "yellow", "green", "blue"] as const;
export type Color = typeof Colors[number];

/* 
her definerer jeg en union type Color, som kan være en af de fire farver i UNO spillet.
Dette opfylder kravene om: 
- union types
- type aliases
- brug af const assertions (as const)
- string literal types
*/


/*
- Union types
- String literal types
- const assertions (as const)
- Domain modeling
*/
