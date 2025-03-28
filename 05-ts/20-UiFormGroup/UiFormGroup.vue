<script setup lang="ts"></script>

<template>
  <div class="form-group">
    <div class="form-group__label-wrapper">
      <label for="FOR" class="form-group__label">LABEL</label>
      <div class="form-group__description">DESCRIPTION</div>
    </div>
    <div class="form-group__control">CONTENT</div>
    <div class="form-group__hint form-group__hint--invalid">HINT | ERROR</div>
  </div>
</template>

<style scoped>
/* _form-group.css */
.form-group {
}

.form-group__label-wrapper {
  margin-block-end: var(--spacing-small);
}

.form-group__label {
  display: block;
  font-size: var(--font-size-control);
}

.form-group__description {
  color: var(--color-dimmed);
}

.form-group__hint {
  font-size: var(--font-size-small);
  color: var(--color-dimmed);
  min-height: 1lh;

  &.form-group__hint--invalid {
    color: var(--color-danger);
  }
}
</style>
