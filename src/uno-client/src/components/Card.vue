<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  color: string | null;
  type: string | null;
  value?: number | null;
  back?: boolean; // 👈 ekstra prop til bagsidekort
}>();

const imageUrl = computed(() => {
  // Hvis det er et bagsidekort (til andre spillere)
  if (props.back) {
    return new URL("../assets/cards/Back.png", import.meta.url).href;
  }

  return new URL(
    `../assets/cards/${getCardImage(props.color, props.type, props.value)}`,
    import.meta.url
  ).href;
});

const cardClass = computed(() => {
  return props.back
    ? "back"
    : props.color
    ? props.color.toLowerCase()
    : "wild";
});

function getCardImage(
  color: string | null,
  type: string | null,
  value?: number | null
) {
  if (!color || !type) return "Deck.png";

  const c = color.charAt(0).toUpperCase() + color.slice(1).toLowerCase();
  const t = type.toLowerCase();

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
    case "wild":
      return `Wild.png`;
    case "wilddrawfour":
    case "wild_draw4":
    case "+4":
      return `Wild_DrawFour.png`; // ✅ korrekt navn
    default:
      return "Deck.png";
  }
}
</script>

<template>
  <div class="card" :class="cardClass">
    <img
      class="card-img"
      :src="imageUrl"
      :alt="props.back ? 'Back of card' : `${props.color ?? ''} ${props.type ?? ''}`"
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
