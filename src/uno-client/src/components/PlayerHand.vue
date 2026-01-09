<script setup lang="ts">
import Card from "./Card.vue"

//Emits
defineProps<{  hand: { color: string; type: string; value?: number | null }[] }>()

defineEmits<{ playCard: [index: number] }>()
</script>

<template>
  <div class="player-hand">
    <Card
      v-for="(card, i) in hand"
      :key="i"
      :color="card.color"
      :type="card.type"
      :value="card.value"
      @click="$emit('playCard', i)"
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
