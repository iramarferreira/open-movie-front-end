<script setup lang="ts">
import Footer from '../components/Footer.vue'
import Header from '../components/Header.vue'
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline'
import axios from 'axios'
import ModalSimple from '~~/components/ModalSimple.vue';
import CardMovie from '../components/CardMovie.vue'
import { title } from 'process';
import Movie from '~~/models/Movie';
import { userInfo } from 'os';
import { useAuthStore } from '~~/stores/useAuthStore';

definePageMeta({
    middleware: ["authenticated"]
    // or middleware: 'auth'
})


const showModal = ref(false)
const modalType = ref('')
const titleModal = ref('')
const messageModal = ref('')
const titleSearch = ref('')
const yearSearch = ref('')
const isLoadingSearch = ref(false)
const token = ref('')
const movieInfo = ref<Movie>()
const authStore = useAuthStore()


onMounted(() => {
    if (localStorage.getItem('user')) {
        authStore.setUser(JSON.parse(localStorage.getItem('user')))
    }
    if (localStorage.getItem('token')) {
        authStore.setToken(localStorage.getItem('token') || '')
    }

    // console.log(authStore.token)
    // console.log(authStore.user)
})

async function searchMovie() {
    isLoadingSearch.value = true
    const runtimeConfig = useRuntimeConfig()
    let baseUrl = runtimeConfig.public.API_BASE_URL_OMDB
    let apiKey = runtimeConfig.public.API_KEY

    // check empty fields
    if (titleSearch.value.length != 0 || yearSearch.value.length != 0) {

        let response;
        try {
            response = await axios.get(baseUrl + `/?t=${titleSearch.value}&y=${yearSearch.value}&apikey=${apiKey}`)

            if (response != undefined && response.status == 200 && response.data.Response) {
                let movie = {
                    imdbID: response.data.imdbID,
                    title: response.data.Title,
                    year: response.data.Year,
                    image: response.data.Poster,
                    genre: response.data.Genre?.split(", "),
                    isFavorite: false
                }
                movieInfo.value = movie
                titleSearch.value = ''
                yearSearch.value = ''
            }

            // console.log(response)
        } catch (error) {

            console.error(error)
            titleModal.value = 'Error'
            modalType.value = 'error'
            messageModal.value = 'Desculpa, aconteceu algum erro'
            showModal.value = true
        }
    } else {
        titleModal.value = 'Aviso'
        modalType.value = 'warning'
        messageModal.value = 'Para realizar uma busca é necessário preencher um dos campos'
        showModal.value = true
    }
    isLoadingSearch.value = false
}



</script>

<template>


    <ModalSimple :show-modal-props="showModal" :title-modal-props="titleModal" :message-modal-props="messageModal"
        :modal-type-props="modalType" @close-modal="(value) => showModal = value" />


    <div class="h-full w-full flex flex-col sm:items-center ">
        <!-- div fields -->
        <p class="pt-4 px-4 font-medium text-base sm:text-lg">Busque um filme ou série por seu título e ano</p>
        <div class="px-4 flex flex-col w-full items-start justify-center sm:flex-row sm:items-center">

            <div class="flex items-center">
                <p class="mr-1">Título: </p>
                <input type="text" class="input input-bordered w-full max-w-xs " v-model="titleSearch" />

            </div>

            <div class="flex items-center">
                <p class="mx-1">Ano: </p>
                <input type="text" class="input w-20 input-bordered outline-none appearance-none"
                    v-model="yearSearch" />

                <button @click="searchMovie" :class="{ 'loading': isLoadingSearch }"
                    class="btn btn-primary w-fit rounded-full   m-2">
                    <MagnifyingGlassIcon class="h-5 w-5"></MagnifyingGlassIcon>
                </button>
            </div>

        </div>

        <div v-if="movieInfo != undefined">
            <CardMovie :movie-info-props="movieInfo"></CardMovie>
        </div>
    </div>





</template>