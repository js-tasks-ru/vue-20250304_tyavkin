<script>
import { computed, defineComponent } from 'vue'

export default defineComponent({
  name: 'MeetupCover',

  props: {
    title: {
      type: String,
    },

    image: {
      type: String,
    },
  },

  setup(props) {
    const bgStyle = computed(() => (props.image ? { '--bg-url': `url('${props.image}')` } : undefined))
    return {
      bgStyle,
    }
  },
})
</script>

<template>
  <div class="meetup-cover" :style="bgStyle">
    <h1 class="meetup-cover__title">{{ title }}</h1>
  </div>
</template>

<style scoped>
.meetup-cover {
  --bg-url: var(--default-cover);
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), var(--bg-url);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 410px;
  max-width: 1216px;
  margin: 0 auto;
}

.meetup-cover__title {
  color: var(--white);
  font-weight: bold;
  font-size: 36px;
  line-height: var(--line-height);
  padding: 0 16px;
  text-align: center;
}

@media all and (min-width: 992px) {
  .meetup-cover__title {
    font-size: 72px;
    line-height: 84px;
  }
}
</style>
