<script setup lang="ts">
definePageMeta({
    middleware: ["authenticated"]
    // or middleware: 'auth'
})
</script>

<template>
    <div>
        <h1>Hello</h1>
    </div>
</template>