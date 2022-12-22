<script setup lang="ts">
import { ref, watch } from 'vue';
import User from '~~/models/User';
import ModalSimple from '../components/ModalSimple.vue'
import axios from 'axios'
import { EnvelopeIcon, EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/outline'

definePageMeta({
  layout: false,
});

const user = ref<User>({
  email: '',
  password: '',
  name: ''
})


const rememberCheck = ref(false)
const isLoading = ref(false)

const showModal = ref(false)
const modalType = ref('')
const titleModal = ref('')
const messageModal = ref('')
const isPasswordSecret = ref(true)
const inputEmail = ref('')
const inputPassword = ref('')


onMounted(() => {
  if (localStorage.getItem('user')) {
    user.value = JSON.parse(localStorage.getItem('user'))
    inputEmail.value = user.value.email
    inputPassword.value = user.value.password
  }
})

watch(rememberCheck, (newValue) => {
  if (newValue) {
    localStorage.setItem('user', JSON.stringify(user.value))
  }
  console.log(newValue)
})


watch(inputEmail, (newValue) => {

  user.value.email = newValue
  if (rememberCheck.value) {
    localStorage.setItem('user', JSON.stringify(user.value))
  }
})

watch(inputPassword, (newValue) => {

  user.value.password = newValue;
  if (rememberCheck.value) {
    localStorage.setItem('user', JSON.stringify(user.value))
  }
})



async function signIn() {
  isLoading.value = true
  const runtimeConfig = useRuntimeConfig()
  let baseUrl = runtimeConfig.public.API_BASE_URL_TST


  console.log(user.value)
  // check empty fields
  if (user.value.email?.length != 0 && user.value.password?.length != 0) {
    let response;
    try {
      let objRequest = {
        email: user.value.email,
        password: user.value.password,
      }

      // request endpoint
      response = await axios.post(baseUrl + '/auth/signin', objRequest)
      if (response != undefined && response.status == 200) {
        localStorage.setItem('user', JSON.stringify(user.value))
        localStorage.setItem('token', response.data.user.token)
        window.location.href = '/home'


      }
    } catch (error) {
      if (error?.response?.status == 401) {
        titleModal.value = 'Aviso'
        modalType.value = 'warning'
        messageModal.value = 'E-mail/senha inválidos'
        showModal.value = true
      } else {
        console.error(error)
        titleModal.value = 'Error'
        modalType.value = 'error'
        messageModal.value = 'Desculpa, aconteceu algum erro'
        showModal.value = true
      }

    }


  } else {
    titleModal.value = 'Aviso'
    modalType.value = 'warning'
    messageModal.value = 'Para realizar o cadastro é necessário preencher todos os campos'
    showModal.value = true
  }


  isLoading.value = false

}

function toggleSecret() {
  isPasswordSecret.value = !isPasswordSecret.value
}

</script>



<template>

  <div class="h-screen w-full flex flex-col items-center justify-center">
    <div class="form-control w-full flex items-center">
      <h1 class="text-primary text-3xl font-medium mb-1">Faça login em sua conta</h1>
      <hr class="w-full w-full max-w-sm mb-6 " />
      <input type="text" placeholder="email" v-model="inputEmail" class="input input-bordered  w-full max-w-sm m-1" />
      <!-- div password -->
      <div class="flex relative w-full max-w-sm m-1 items-center justify-end">
        <input v-if="isPasswordSecret" type="password" placeholder="password" v-model="inputPassword"
          class="input input-bordered   w-full max-w-sm  " />
        <input v-else type="text" placeholder="password" v-model="inputPassword"
          class="input input-bordered   w-full max-w-sm  " />

        <button @click="toggleSecret" class="absolute mr-2">
          <EyeIcon v-if="isPasswordSecret" class="w-6 h-6 " />
          <EyeSlashIcon v-else class="w-6 h-6 " />

        </button>

      </div>

      <button @click="signIn" :class="{ 'loading': isLoading }"
        class="btn btn-primary w-full max-w-sm  m-2">Entrar</button>
    </div>
    <div class="w-full max-w-sm m-1 flex  items-center justify-between">
      <label class="label cursor-pointer ">
        <input type="checkbox" :checked="rememberCheck" @input="rememberCheck = !rememberCheck"
          class="checkbox checkbox-primary checkbox-sm" />
        <p class="text-sm ml-1">Lembrar</p>

      </label>

      <div class="flex">
        <p class="text-sm">Ainda não tem conta?</p>
        <NuxtLink class="btn-link ml-0.5 text-sm" href="/signupUser">Cadastre-se</NuxtLink>
      </div>

    </div>

    <ModalSimple :show-modal-props="showModal" :title-modal-props="titleModal" :message-modal-props="messageModal"
      :modal-type-props="modalType" @close-modal="(value) => showModal = value" />


  </div>

</template>
