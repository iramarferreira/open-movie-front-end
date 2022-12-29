<script setup lang="ts">


const showModalComments = ref(false)
const arrayComments = ref([])


const props = defineProps({
    arrayCommentsProps: {type: Object, required: true},
    showModalCommentsProps: {type:Boolean, required: true},

})

const emit = defineEmits(['closeModalComments'])

onMounted(() => {

    showModalComments.value = props.showModalCommentsProps;
    arrayComments.value = props.arrayCommentsProps;

    
})

watch(() => props.arrayCommentsProps, (newValue) => {
    arrayComments.value = newValue
})

watch(() => props.showModalCommentsProps, (newValue) => {
    showModalComments.value = newValue
})


function closeModal(){
    showModalComments.value = false
    emit('closeModalComments', showModalComments.value)
}

</script>

<template>
    <!-- Put this part before </body> tag -->
    <div :class="{ 'modal-open': showModalComments }" class="modal" id="my-modal-3">
        <div class="modal-box  relative">
            <button for="my-modal-3" @click="closeModal"
                class="btn btn-sm btn-circle absolute right-2 top-2">
                ✕ </button>
            <div>
                <p class="text-xl font-bold" >Lista de Reviews</p>
                <hr />
                <div v-for="review in arrayComments" :key="review.imdbID">
                    
                    <p class="text-base  font-bold">Usuário: {{ review.user.name }}</p>
                    <p class="text-base font-medium">Comentário: {{ review.comment }}</p>
                    <hr />
                </div>
            </div>

        </div>
    </div>

</template>