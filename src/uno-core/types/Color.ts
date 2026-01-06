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
WHAT TO TALK ABOUT (EXAM):

- Union types
- String literal types
- const assertions (as const)
- Domain modeling

What I say:
“Color is a union of valid UNO colors,
which prevents invalid values at compile time.”
*/
