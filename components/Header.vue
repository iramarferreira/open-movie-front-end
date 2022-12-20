<script setup lang="ts">
import { ArrowRightOnRectangleIcon } from '@heroicons/vue/24/outline'

function signOut(){
    localStorage.removeItem('token')
    window.location.href = '/'
}

</script>

<template>

    <div class="navbar bg-primary text-primary-content">
        <div class="flex-1">
            <a class="btn btn-ghost normal-case text-xl">OMDB TST</a>
        </div>
        <div class="flex-none">
            <button @click="signOut" class="btn btn-square btn-ghost">
                <ArrowRightOnRectangleIcon class="w-6 h-6 " />
            </button>
        </div>
    </div>

</template>