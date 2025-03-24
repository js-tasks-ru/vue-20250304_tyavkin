<script setup></script>

<template>
  <div class="stretch-container">
    <slot />
  </div>
</template>

<style scoped>
.stretch-container > * {
  width: 100%;
  height: 100%;
}

.stretch-container > :slotted(img),
.stretch-container > :slotted(video),
.stretch-container > :slotted(picture) {
  object-fit: scale-down;
}
</style>
