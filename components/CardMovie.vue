<script setup lang="ts">
import { StarIcon } from '@heroicons/vue/24/outline'
import Movie from '../models/Movie';

const movieInfo = ref<Movie>({
    imdbID: 'tt19498174',
    genre: ['Documentary', 'Music', 'Documentary'],
    image: 'https://m.media-amazon.com/images/M/MV5BNWJiYjRmZGQtMDdlZC00MmM1LTk3ZDAtM2Q4ZDhjMTJkY2I0XkEyXkFqcGdeQXVyNjg2NjQxOTQ@._V1_SX300.jpg',
    title: 'OKAY! The ASD Band Film',
    year: '2022',
    isFavorite: false
})

const props = defineProps({
    movieInfoProps: {type: Object, required: true}
})

onMounted(() => {
    movieInfo.value = props.movieInfoProps;
})

watch(() => props.movieInfoProps, () =>{
    movieInfo.value = props.movieInfoProps
})

</script>


<template>
    <div class="card w-full flex flex-row  rounded-lg sm:w-96 bg-base-100 shadow-lg">
        <div class="w-1/3 sm:w-full flex items-center justify-center">
            <figure class="rounded-lg w-full"><img :src="movieInfo.image" :alt="movieInfo.title" /></figure>
        </div>

        <div class="w-2/3  sm:w-full flex flex-col mt-1">
            <div class="flex mb-2 w-full justify-between items-center px-2">
                <p class=" text-base font-medium leading-4 tracking-tight">
                    {{ movieInfo.title }}
                </p>
                <button  > 
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