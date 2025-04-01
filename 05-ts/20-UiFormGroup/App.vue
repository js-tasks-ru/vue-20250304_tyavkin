<script setup lang="ts">
import { ref } from 'vue'
import { UiButton, UiContainer, UiInput, UiStory, UiIcon, UiFlex, UiLink } from '@shgk/vue-course-ui'
import UiFormGroup from './UiFormGroup.vue'

const text = ref('')
</script>

<template>
  <UiContainer>
    <UiStory title="Простое использование">
      <UiFlex gap="larger" column>
        <UiFormGroup for="password0" label="Пароль" hint="Это поле обязательно для заполнения" :invalid="!text">
          <UiInput id="password0" v-model="text" />
        </UiFormGroup>

        <UiFormGroup
          for="password1"
          label="Повторите пароль"
          hint="Это поле обязательно для заполнения"
          :invalid="!text"
        >
          <UiInput id="password1" v-model="text" />
        </UiFormGroup>

        <UiButton kind="primary">Зарегистрироваться</UiButton>
      </UiFlex>
    </UiStory>

    <UiStory title="С описанием и подсказкой">
      <UiFlex gap="larger" column>
        <UiFormGroup
          for="password2"
          label="Пароль"
          description="Пароль важен для защиты вашего аккаунта"
          hint="По возможности используйте сгенерированный пароль"
          show-hint
        >
          <UiInput id="password2" v-model="text" />
        </UiFormGroup>
        <UiFormGroup
          for="password3"
          label="Пароль"
          description="Пароль важен для защиты вашего аккаунта"
          hint="Требуется одна буква, цифра, иероглиф, постоянная планка"
          invalid
        >
          <UiInput id="password3" v-model="text" />
        </UiFormGroup>
      </UiFlex>
    </UiStory>

    <UiStory title="Кастомный контент">
      <UiFlex gap="larger" column>
        <UiFormGroup for="password4" show-hint invalid>
          <template #label>
            <UiFlex gap="small">
              <UiIcon icon="key" />
              Пароль
            </UiFlex>
          </template>
          <template #description>
            Ознакомьтесь с информацией о безопасности пароля в
            <UiLink href="https://en.wikipedia.org/wiki/Password" target="_blank">wiki</UiLink>.
          </template>
          <UiInput id="password4" v-model="text" />
        </UiFormGroup>
      </UiFlex>
    </UiStory>
  </UiContainer>
</template>
