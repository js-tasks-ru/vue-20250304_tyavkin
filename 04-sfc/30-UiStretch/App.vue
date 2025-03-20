<script setup>
import UiStretch from './UiStretch.vue'
</script>

<template>
  <div class="page">
    <div class="row" style="--width: 272px; --height: 272px">
      <UiStretch class="sample">
        <div class="text">Text in the center</div>
      </UiStretch>

      <UiStretch class="sample">
        <img src="https://picsum.photos/400/300" alt="" />
      </UiStretch>

      <UiStretch class="sample">
        <img src="https://picsum.photos/200/200" alt="" />
      </UiStretch>

      <UiStretch class="sample">
        <img src="https://picsum.photos/300/400" alt="" />
      </UiStretch>

      <UiStretch class="sample">
        <video src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" controls></video>
      </UiStretch>
    </div>

    <div class="row" style="--width: 1400px; --height: 200px">
      <UiStretch class="sample">
        <video src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" controls></video>
      </UiStretch>
    </div>

    <div class="row" style="--width: 1400px; --height: 700px">
      <UiStretch class="sample">
        <video src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4" controls></video>
      </UiStretch>
    </div>
  </div>
</template>

<style scoped>
.page {
  padding: 1rem;
}

.row {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}

.sample {
  border: 2px solid var(--blue);
  width: var(--width);
  height: var(--height);
  flex: 0 0 auto;
  background-color: #fff;
}

.text {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
