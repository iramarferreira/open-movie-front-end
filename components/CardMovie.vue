<script setup lang="ts">
import { StarIcon } from '@heroicons/vue/24/outline'


</script>


<template>
    <div class="card h-auto w-full flex flex-row items-center rounded-lg sm:flex-col sm:w-64 bg-base-100 shadow-lg">
        <div class="w-1/3 sm:w-full flex items-center justify-center">
            <figure class="rounded-lg "><img src="https://placeimg.com/400/225/arch" alt="Shoes" /></figure>
        </div>

        <div class="w-2/3 sm:w-full card-body">
            <div class="flex w-full">
                <p class="card-title text-base">
                    Shoes!
                </p>
                <button > 
                    <StarIcon class=" h-6 w-6"></StarIcon>
                </button>
            </div>

            <p class="text-sm">If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-end">
                <div class="badge badge-outline">Fashion</div>
                <div class="badge badge-outline">Products</div>
            </div>
        </div>
    </div>
</template>