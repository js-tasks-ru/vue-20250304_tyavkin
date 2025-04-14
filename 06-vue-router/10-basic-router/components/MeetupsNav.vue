<script setup lang="ts"></script>

<template>
  <nav class="nav">
    <a href="/index" class="nav__link">Главная</a>
    <a href="/foo" class="nav__link">Страница Foo</a>
    <a href="/bar" class="nav__link">Страница Bar</a>
    <a href="/login" class="nav__link">Вход</a>
    <a href="/login?from=/foo" class="nav__link">Вход /login?from=/foo</a>
    <a href="/login?from=/bar" class="nav__link">Вход /login?from=/bar</a>
    <a href="/register" class="nav__link">Регистрация</a>
  </nav>
</template>

<style scoped>
.nav {
  display: flex;
  justify-content: center;
  flex-direction: column;
  flex-wrap: wrap;
  margin-inline-start: var(--spacing-large);
  font-size: var(--font-size-control);
}

.nav__link {
  position: relative;
  display: inline-flex;
  padding: 0 var(--spacing-base);
  color: var(--color-text);
  text-decoration: none;

  &:hover {
    color: var(--color-text-primary);
  }

  &:before {
    content: '';
    position: absolute;
    inset-inline-start: 0;
    inset-block-start: 50%;
    border-radius: 50%;
    width: 5px;
    height: 5px;
    background-color: var(--color-primary-element-light);
    transform: translate(-2px, -50%);
  }
}

@media (min-width: 768px) {
  .nav {
    flex-direction: row;
    align-items: center;
    margin-inline-start: 0;
  }

  .nav__link:first-child:before {
    display: none;
  }
}
</style>
