<!-- components/Modal.vue 
den klasse bruges til at lave modaler (pop-up vinduer) i applikationen
solt bruges til at indsætte brugerdefineret indhold i modalens header, body og footer 

“I implemented a reusable Modal component using both a default slot and named slots.
The header and footer slots allow the parent component to inject custom UI, while the default slot provides the main modal content.
The modal emits a close event when clicking outside, which lets the parent control visibility.
This demonstrates flexible component composition as taught in lesson 4.”
-->
<template>
  <div class="overlay" @click="emitClose">
    <div class="modal" @click.stop>
      
      <!-- header slot -->
      <header class="modal-header">
        <slot name="header">Default Header</slot>
      </header>

      <!-- main content -->
      <main class="modal-body">
        <slot></slot>
      </main>

      <!-- footer slot -->
      <footer class="modal-footer">
        <slot name="footer"></slot>
      </footer>

    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(["close"]);
function emitClose() {
  emit("close");
}
</script>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.6);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: white;
  padding: 1.5rem;
  border-radius: 10px;
  width: 300px;
  max-width: 90%;
}

.modal-header {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.modal-body {
  margin-bottom: 1rem;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}
</style>
