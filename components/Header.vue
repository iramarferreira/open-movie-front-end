<script setup lang="ts">
import { ArrowRightOnRectangleIcon, StarIcon } from '@heroicons/vue/24/outline'
import { useAuthStore } from '~~/stores/useAuthStore';


const authStore = useAuthStore()


// onMounted(() => {
//     if (localStorage.getItem('user')) {
//         authStore.setUser(JSON.parse(localStorage.getItem('user')))
//     }
//     if (localStorage.getItem('token')) {
//         authStore.setToken(localStorage.getItem('token') || '')
//     }

//     console.log(authStore.token)
//     console.log(authStore.user)
// })

function signOut() {
    localStorage.removeItem('token')
    window.location.href = '/'
}

function toPageFavorites() {
    window.location.href = '/favorites'
}

</script>

<template>

    <div class="navbar bg-primary text-primary-content">
        <div class="flex-1">
            <a href="/home" class="btn btn-ghost normal-case text-xl">OMDB TST</a>
        </div>
        <div class="flex flex-col items-end">
            <p class="text-base font-medium mr-4">Olá, {{ authStore.user?.name }}</p>
            <div>
                <button @click="toPageFavorites" class="btn btn-square btn-ghost">
                    <StarIcon class="w-6 h-6 " />
                </button>
                <button @click="signOut" class="btn btn-square btn-ghost">
                    <ArrowRightOnRectangleIcon class="w-6 h-6 " />
                </button>
            </div>

        </div>
    </div>

</template>