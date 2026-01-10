const colors: Color[] = ["red", "yellow", "green", "blue"];

// هنا الـ Type Inference بشتغل تلقائياً في الـ Loop:
for (const color of colors) {
    // TypeScript بيفهم لحاله إن "color" نوعه "Color" 
    // بدون ما أنا أكتب (color: Color)
}



// or 

/*
isEmpty() {
  return this.cards.length == 0; // knwos length is number
}
*/
