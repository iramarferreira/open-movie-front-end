<script setup lang="ts">
import { useAuthStore } from '~~/stores/useAuthStore';
import { useFavoriteStore } from '~~/stores/useFavoriteStore';



definePageMeta({
    middleware: ["authenticated"]
    // or middleware: 'auth'
})

const authStore = useAuthStore()
const favoriteStore = useFavoriteStore()


onMounted(async () => {
    if (localStorage.getItem('user')) {
        authStore.setUser(JSON.parse(localStorage.getItem('user')))
    }
    if (localStorage.getItem('token')) {
        authStore.setToken(localStorage.getItem('token') || '')
    }
    await favoriteStore.getFavorites().then(async (response) => {
        // console.log(response)
        await favoriteStore.getFavoritesAllOMDB(response.data.favorites)
    })
    // favoriteStore.getFavoritesAllOMDB()
    // console.log(favoriteStore.favoritesId)
    // console.log(favoriteStore.favorites)
    // console.log(authStore.token)
    // console.log(authStore.user)
})



</script>

<template>

    <div class="w-full h-full flex flex-col items-center p-2 flex-initial">
        <p class="text-2xl sm:text-4xl font-medium mb-2">Lista de filmes</p>
        <div v-if="favoriteStore.favorites.length > 0"
            class="flex-1 w-full h-full grid  grid-cols-1 gap-2 justify-items-center lg:grid-cols-3 md:grid-cols-2 ">
            <div v-for="favorite in favoriteStore.favorites">
                <CardMovie :movie-info-props="favorite"></CardMovie>
            </div>
        </div>
    </div>


</template>