<script setup lang="ts">
import { StarIcon } from '@heroicons/vue/24/outline'
import Movie from '../models/Movie';
import axios from 'axios'

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

const props = defineProps({
    movieInfoProps: {type: Object, required: true}
})


onMounted(() => {
    if(localStorage.getItem('token') != undefined){
        token.value = localStorage.getItem('token')
    }
    console.log(token.value)
})

onMounted(() => {
    movieInfo.value = props.movieInfoProps;
})

watch(() => props.movieInfoProps, () =>{
    movieInfo.value = props.movieInfoProps
})

async function saveFavorite() {
    const runtimeConfig = useRuntimeConfig()
    let baseUrl = runtimeConfig.public.API_BASE_URL_TST

    let response;
    let obj = {
        imdbID: movieInfo.value?.imdbID
    }
    try {
        response = await axios.post(baseUrl + `/favorites`, obj, {
            headers:{
                'Authorization': `Bearer ` + token.value
            }
        })

        if (response != undefined && response.status == 200) {

            movieInfo.value.isFavorite = true;
        }
        else if (response != undefined && response.status == 422) {
            titleModal.value = 'Aviso'
            modalType.value = 'warning'
            messageModal.value =  response.data.msg
            showModal.value = true
        }
        console.log(response)
    } catch (error) {

        console.error(error)
        titleModal.value = 'Error'
        modalType.value = 'error'
        messageModal.value = 'Desculpa, aconteceu algum erro'
        showModal.value = true
    }
}

async function removeFavorite() {
    const runtimeConfig = useRuntimeConfig()

    let baseUrl = runtimeConfig.public.API_BASE_URL_TST

    let response;

    try {
        response = await axios.delete(baseUrl + `/favorites/${movieInfo.value.imdbID}`,{
            headers:{
                'Authorization': `Bearer ` + token.value
            }
        })

        if (response != undefined && response.status == 200) {

            movieInfo.value.isFavorite = false;
            
        }
        else if (response != undefined && response.status == 422) {
            titleModal.value = 'Aviso'
            modalType.value = 'warning'
            messageModal.value =  response.data.msg
            showModal.value = true
        }
        console.log(response)
    } catch (error) {

        console.error(error)
        titleModal.value = 'Error'
        modalType.value = 'error'
        messageModal.value = 'Desculpa, aconteceu algum erro'
        showModal.value = true
    }

}

// check function save or delete
function btStar(){
    if(movieInfo.value.isFavorite){
        removeFavorite();
    }else{
        saveFavorite();
    }
}

</script>


<template>
    
    <ModalSimple :show-modal-props="showModal" :title-modal-props="titleModal" :message-modal-props="messageModal"
            :modal-type-props="modalType" @close-modal="(value) => showModal = value" />

    <div class="card w-full flex flex-row  rounded-lg sm:w-96 bg-base-100 shadow-lg">
        <div class="w-1/3 sm:w-full flex items-center justify-center">
            <figure class="rounded-lg w-full"><img :src="movieInfo.image" :alt="movieInfo.title" /></figure>
        </div>

        <div class="w-2/3  sm:w-full flex flex-col mt-1">
            <div class="flex mb-2 w-full justify-between items-center px-2">
                <p class=" text-base font-medium leading-4 tracking-tight">
                    {{ movieInfo.title }}
                </p>
                <button @click="btStar" > 
                    <span :class="{'text-yellow-300': movieInfo.isFavorite}">
                        <StarIcon class="h-6 w-6"></StarIcon>
                    </span>
                </button>
            </div>

            <div class="w-full px-2 grid grid-flow-col sm:grid-flow-row tracking-tight ">
                <div v-for="badge in movieInfo.genre" class="m-0.5 badge badge-outline text-xs">{{badge}}</div>
            </div>
        </div>
    </div>
</template>