<script setup lang="ts">
import Footer from '../components/Footer.vue'
import Header from '../components/Header.vue'


</script>

<template>
    <div class="relative w-full h-screen flex flex-col ">
        <Header class="shrink-0"></Header>

        <slot />
        
        <Footer class="shrink-0"></Footer>

    </div>
</template>