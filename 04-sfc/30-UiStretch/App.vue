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
        <img
          src="https://sun9-20.userapi.com/impg/5J6XWFfYyaiivevjewGYwkuZ6mIuWVIeSCJYQA/XLfa0ZAKBDE.jpg?size=604x340&quality=95&sign=d123ee835289677c71cef0062c6c55b5&type=album"
          alt=""
        />
      </UiStretch>

      <UiStretch class="sample">
        <img src="https://masterpiecer-images.s3.yandex.net/625adec7907211ee843d56181a0358a2:upscaled" alt="" />
      </UiStretch>

      <UiStretch class="sample">
        <img src="https://i.pinimg.com/736x/d3/c0/4e/d3c04ec9566cb5caa4bc92a61e07163f.jpg" alt="" />
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
