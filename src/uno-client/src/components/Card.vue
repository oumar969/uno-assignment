
<script setup lang="ts">
import { computed } from "vue";
//web client framework Vue
//client design pattern MVVM
//Components
//rendering  and re-rendering of components
//binding
//control structures
//View
//slots
//Props
//Emits
//routing
//state management

const props = defineProps<{
  color: string | null;
  type: string | null;
  value?: number | null;
  back?: boolean; 
}>();

const imageUrl = computed(() => {
  if (props.back) {
    return new URL("../assets/cards/Back.png", import.meta.url).href;
  }
  return new URL(
    `../assets/cards/${getCardImage(props.color, props.type, props.value)}`,
    import.meta.url
  ).href;
});

const cardClass = computed(() => {
  return props.back ? "back": props.color ? props.color.toLowerCase() : "wild"; });

function getCardImage(
  color: string | null,
  type: string | null,
  value?: number | null
) {
  if (!type) return "Deck.png";
  const t = type.toLowerCase();

  // Wild cards har ingen farve
  if (t === "wild") {
    return `Wild.png`;
  }
  if (t === "wilddrawfour") {
    return `Wild_Draw.png`;
  }

  // Alle andre kort kræver farve
  if (!color) return "Deck.png";

  const c = color.charAt(0).toUpperCase() + color.slice(1).toLowerCase();

  if (t === "number" && value !== undefined && value !== null) {
    return `${c}_${value}.png`;
  }

  switch (t) {
    case "skip":
      return `${c}_Skip.png`;
    case "reverse":
      return `${c}_Reverse.png`;
    case "drawtwo":
    case "draw2":
    case "+2":
      return `${c}_Draw.png`;
    default:
      return "Deck.png";
  }
}
</script>

<template>
  <div class="card" :class="cardClass">
    <img
      class="card-img" :src="imageUrl" :alt="props.back ? 'Back of card' : `${props.color ?? ''} ${props.type ?? ''}`"
    />
  </div>
</template>

<style scoped>
.card {
  width: 70px;
  height: 100px;
  margin: 5px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.2s ease;
}
.card:hover {
  transform: scale(1.1);
}
.card-img {
  width: 80%;
  height: 80%;
  object-fit: contain;
}

/* farver */
.card.red { background: #e74c3c; }
.card.blue { background: #3498db; }
.card.green { background: #2ecc71; }
.card.yellow { background: #f1c40f; }
.card.wild {
  background: linear-gradient(45deg, red, yellow, green, blue);
}

/* bagsidekort */
.card.back {
  background: #333;
}
</style>
