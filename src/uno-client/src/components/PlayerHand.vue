<script setup lang="ts">
import Card from "./Card.vue"

defineProps<{ // object props with types
  hand: { color: string; type: string }[]
  onPlay?: (card: { color: string; type: string }) => void
}>() // props definition
</script>

<template>
  <div class="player-hand">
    <Card
      v-for="(card, i) in hand"
      :key="i"
      :color="card.color"
      :type="card.type"
      @click="onPlay && onPlay(card)"
    />
  </div>
</template>

<style scoped>
.player-hand {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px;
}
</style>
