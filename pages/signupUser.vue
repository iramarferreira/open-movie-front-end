<script setup lang="ts">
import axios from 'axios'
import User from '~~/models/User';
import ModalSimple from '~~/components/ModalSimple.vue';
import { EnvelopeIcon, EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/outline'

const user = ref<User>({
  email: '',
  password: '',
  name: ''
})

const isLoading = ref(false)
const showModal = ref(false)
const modalType = ref('')
const titleModal = ref('')
const messageModal = ref('')
const isPasswordSecret = ref(true)

async function signUp() {
  isLoading.value = true
  const runtimeConfig = useRuntimeConfig()
  let baseUrl = runtimeConfig.public.API_BASE_URL_TST

  // check empty fields
  if (user.value.email.length != 0 && user.value.name?.length != 0 && user.value.password.length != 0) {
    let response;
    try {

      // request endpoint
      response = await axios.post(baseUrl + '/auth/signup', user.value)
      if (response != undefined && response.status == 200) {
        titleModal.value = 'Sucesso'
        modalType.value = 'success'
        messageModal.value = 'Cadastro realizado com sucesso'
        showModal.value = true

        user.value.name = ''
        user.value.email = ''
        user.value.password = ''
      }
    } catch (error) {
      if (error?.response?.status == 422) {
        titleModal.value = 'Aviso'
        modalType.value = 'warning'
        messageModal.value = 'Já existe usuário com esse email'
        showModal.value = true
      } else {
        console.error(error)
        titleModal.value = 'Error'
        modalType.value = 'error'
        messageModal.value = 'Desculpa, aconteceu algum erro'
        showModal.value = true
      }

    }


    console.log(response)
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
      <h1 class="text-primary text-3xl font-medium mb-1">Crie sua conta</h1>
      <hr class="w-full w-full  max-w-sm mb-6" />
      <input type="text" required placeholder="email " class="input input-bordered  w-full max-w-sm m-1"
        v-model="user.email" />
      <input type="text" placeholder="nome" class="input input-bordered  w-full max-w-sm m-1" v-model="user.name" />
      <!-- div password -->
      <div class="flex relative w-full max-w-sm m-1 items-center justify-end">
        <input v-if="isPasswordSecret" type="password" placeholder="password" v-model="user.password"
          class="input input-bordered   w-full max-w-sm  " />
        <input v-else type="text" placeholder="password" v-model="user.password"
          class="input input-bordered   w-full max-w-sm  " />

        <button @click="toggleSecret" class="absolute mr-1">
          <EyeIcon v-if="isPasswordSecret" class="w-6 h-6 " />
          <EyeSlashIcon v-else class="w-6 h-6 " />

        </button>

      </div>
      <button :class="{ 'loading': isLoading }" class="btn btn-primary w-full max-w-sm  m-2 "
        @click="signUp">Cadastrar</button>
    </div>

    <div class="w-full max-w-sm m-1 flex  items-center justify-end">

      <div class="flex">
        <p class="text-sm">Já tem uma conta?</p>
        <NuxtLink class="btn-link ml-0.5 text-sm" href="/">Faça o login</NuxtLink>
      </div>

    </div>


    <ModalSimple :show-modal-props="showModal" :title-modal-props="titleModal" :message-modal-props="messageModal"
      :modal-type-props="modalType" @close-modal="(value) => showModal = value" />

  </div>
</template>