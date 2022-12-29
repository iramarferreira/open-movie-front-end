<script setup lang="ts">
import { StarIcon, ChatBubbleOvalLeftIcon, ChatBubbleOvalLeftEllipsisIcon, ChatBubbleLeftRightIcon } from '@heroicons/vue/24/outline'
import Movie from '../models/Movie';
import axios from 'axios';
import { useFavoriteStore } from '~~/stores/useFavoriteStore';
import { useReviewStore } from '~~/stores/useReviewStore';

import ModalReview from './ModalReview.vue';
import ModalComments from './ModalComments.vue';

const movieInfo = ref<Movie>({
    imdbID: 'tt19498174',
    genre: ['Documentary', 'Music', 'Documentary'],
    image: 'https://m.media-amazon.com/images/M/MV5BNWJiYjRmZGQtMDdlZC00MmM1LTk3ZDAtM2Q4ZDhjMTJkY2I0XkEyXkFqcGdeQXVyNjg2NjQxOTQ@._V1_SX300.jpg',
    title: 'OKAY! The ASD Band Film',
    year: '2022',
    isFavorite: false
})

const showModal = ref(false)
const modalType = ref('')
const titleModal = ref('')
const messageModal = ref('')
const token = ref('')
const favoriteStore = useFavoriteStore()
const showModalReview = ref(false)
const movieReview = ref()
const reviewStore = useReviewStore()
const arrayComments = ref([])
const showModalComments = ref(false)


const props = defineProps({
    movieInfoProps: { type: Object, required: true }
})

onMounted(() => {
    movieInfo.value = props.movieInfoProps;
})

watch(() => props.movieInfoProps, () => {
    movieInfo.value = props.movieInfoProps
})

async function saveFavoriteMovie() {

    let response = await favoriteStore.saveFavorite(movieInfo.value?.imdbID)

    if (response != undefined && response == 200) {

        movieInfo.value.isFavorite = true;
    }
    else if (response == 422) {
        titleModal.value = 'Error'
        modalType.value = 'warning'
        messageModal.value = favoriteStore.messageError
        showModal.value = true
    } else {

        titleModal.value = 'Error'
        modalType.value = 'error'
        messageModal.value = favoriteStore.messageError
        showModal.value = true

    }
}

async function removeFavoriteMovie() {

    let response = await favoriteStore.deleteFavorite(movieInfo.value?.imdbID)

    if (response != undefined && response == 200) {

        movieInfo.value.isFavorite = false;
    }
    else if (response == 422) {
        titleModal.value = 'Error'
        modalType.value = 'warning'
        messageModal.value = favoriteStore.messageError
        showModal.value = true
    } else {

        titleModal.value = 'Error'
        modalType.value = 'error'
        messageModal.value = favoriteStore.messageError
        showModal.value = true

    }

}

// check function save or delete
function btStar() {
    if (movieInfo.value.isFavorite) {
        removeFavoriteMovie();
    } else {
        saveFavoriteMovie();
    }
}

function btReview() {
    showModalReview.value = true
}

async function listReview(){
    let response = await reviewStore.getReviewsMovie(movieInfo.value.imdbID);
    if(response?.status == 200){
        // console.log(response.data.reviews)
        arrayComments.value = response.data.reviews;
        showModalComments.value = true
    }
    
}

</script>


<template>

    <ModalSimple :show-modal-props="showModal" :title-modal-props="titleModal" :message-modal-props="messageModal"
        :modal-type-props="modalType" @close-modal="(value) => showModal = value" />

    <ModalReview :movie-review-props="movieInfo" :show-modal-review-props="showModalReview"
        @close-modal-review="(valueClose) => showModalReview = valueClose" />

    <ModalComments :array-comments-props="arrayComments" :show-modal-comments-props="showModalComments"
        @close-modal-comments="(closeComments) => showModalComments = closeComments" />

    <div class="h-48 w-screen px-2 sm:h-64 flex flex-row  rounded-lg sm:w-96 bg-base-100 shadow-lg">
        <div class="h-full  w-1/3 sm:w-full flex items-center justify-center">
            <figure class="w-full h-full flex items-center"><img
                    class="h-48 w-full max-h-48 sm:h-60 sm:max-h-60 w-36 sm:w-40 rounded-lg " :src="movieInfo.image"
                    :alt="movieInfo.title" /></figure>
        </div>

        <div class="w-2/3  sm:w-full flex flex-col mt-1 relative">
            <div class="flex mb-2 w-full justify-between items-center px-2">
                <p class=" text-base font-medium leading-4 tracking-tight">
                    {{ movieInfo.title }}
                </p>
                <button @click="btStar">
                    <span :class="{ 'text-yellow-300': movieInfo.isFavorite }">
                        <StarIcon class="h-6 w-6"></StarIcon>
                    </span>
                </button>
            </div>

            <div class="w-full px-2 grid grid-flow-col sm:grid-flow-row tracking-tight ">
                <div v-for="badge in movieInfo.genre" class="m-0.5 badge badge-outline text-xs">{{ badge }}</div>
            </div>

            <div v-if="movieInfo.isFavorite" class="absolute bottom-2 right-2 flex items-center">
                <button @click="listReview" class="mr-2">
                    <span >
                        <ChatBubbleLeftRightIcon class="h-6 w-6"></ChatBubbleLeftRightIcon>
                    </span>
                </button>

                <button @click="btReview">
                    <span v-if="!movieInfo?.hasReview">
                        <ChatBubbleOvalLeftIcon class="h-6 w-6"></ChatBubbleOvalLeftIcon>
                    </span>
                    <span v-if="movieInfo?.hasReview">
                        <ChatBubbleOvalLeftEllipsisIcon class="h-6 w-6"></ChatBubbleOvalLeftEllipsisIcon>
                    </span>
                </button>
            </div>

        </div>
    </div>
</template>