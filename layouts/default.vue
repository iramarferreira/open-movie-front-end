<script setup lang="ts">
import Footer from '../components/Footer.vue'
import Header from '../components/Header.vue'


</script>

<template>
    <div class="relative w-full min-h-screen flex flex-col ">
        <Header class="shrink-0"></Header>

        <slot />
        
        <Footer class="mt-auto "></Footer>

    </div>
</template>