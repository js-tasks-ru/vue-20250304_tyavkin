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

.stretch-container > img,
.stretch-container > video,
.stretch-container > picture {
  object-fit: scale-down;
}
</style>
