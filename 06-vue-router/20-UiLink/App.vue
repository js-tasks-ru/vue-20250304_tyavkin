<script setup lang="ts">
import { UiContainer } from '@shgk/vue-course-ui'
import UiLink from './components/UiLink.vue'
</script>

<template>
  <div class="wrapper">
    <main class="main">
      <RouterView />

      <UiContainer>
        <ul>
          <li>
            <UiLink to="/foo">Page Foo</UiLink>
          </li>
          <li>
            <UiLink :to="{ name: 'bar' }">Page Bar</UiLink>
          </li>
          <li>
            <UiLink href="https://vuejs.org" target="_blank">vuejs.org</UiLink>
          </li>
        </ul>
      </UiContainer>
    </main>
  </div>
</template>

<style scoped>
.wrapper {
  background-color: var(--color-bg-plain);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main {
  flex: 1 0 auto;
}
</style>
