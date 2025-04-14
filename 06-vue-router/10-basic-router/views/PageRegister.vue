<script setup lang="ts">
import { UiButton, UiCheckbox, UiFormGroup, UiInput } from '@shgk/vue-course-ui'
import { ref } from 'vue'
import MeetupsAuthForm from '../components/MeetupsAuthForm.vue'
import LayoutAuth from '../components/LayoutAuth.vue'
import { register } from '../api.ts'

const email = ref('demo@email')
const fullname = ref('Demo Organizer')
const password = ref('password')
const password2 = ref('password')
const agree = ref(true)

async function onSubmit() {
  try {
    await register({
      email: email.value,
      fullname: fullname.value,
      password: password.value,
    })
    // Регистрация прошла успешно
  } catch (error) {
    alert((error as Error).message)
  }
}
</script>

<template>
  <LayoutAuth title="Регистрация">
    <MeetupsAuthForm @submit="onSubmit">
      <UiFormGroup label="Email">
        <UiInput v-model="email" name="email" type="email" placeholder="demo@email" required />
      </UiFormGroup>

      <UiFormGroup label="Имя">
        <UiInput v-model="fullname" name="fullname" placeholder="Alice John" required />
      </UiFormGroup>

      <UiFormGroup label="Пароль">
        <UiInput v-model="password" name="password" type="password" required minlength="6" placeholder="••••••" />
      </UiFormGroup>

      <UiFormGroup label="Повтор пароля">
        <UiInput v-model="password2" type="password" required minlength="6" placeholder="••••••" />
      </UiFormGroup>

      <UiCheckbox v-model="agree" name="agree" required>Я согласен с условиями</UiCheckbox>

      <template #submit>
        <UiButton kind="primary" size="large" wide type="submit">Зарегистрироваться</UiButton>
      </template>

      <template #append>
        Уже есть аккаунт?
        <a href="/login">Войдите</a>
      </template>
    </MeetupsAuthForm>
  </LayoutAuth>
</template>
