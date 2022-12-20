<script setup lang="ts">

const showModal = ref(false)
const modalType = ref('')
const titleModal = ref('')
const messageModal = ref('')

const props = defineProps({
    messageModalProps: {type:String, required: true},
    showModalProps: {type:Boolean, required: true},
    modalTypeProps: {type:String, required: true},
    titleModalProps: {type:String, required: true}
})

const emit = defineEmits(['closeModal'])

onMounted(() => {

    showModal.value = props.showModalProps;
    modalType.value = props.modalTypeProps;
    titleModal.value = props.titleModalProps;
    messageModal.value = props.messageModalProps;
    
})

watch(() => props.messageModalProps, (newValue) => {
    messageModal.value = newValue
})

watch(() => props.showModalProps, (newValue) => {
    showModal.value = newValue
})

watch(() => props.modalTypeProps, (newValue) => {
    modalType.value = newValue
})

watch(() => props.titleModalProps, (newValue) => {
    titleModal.value = newValue
})


function closeModal(){
    showModal.value = false
    emit('closeModal', showModal.value)
}

</script>

<template>
    <!-- Put this part before </body> tag -->
    <div :class="{ 'modal-open': showModal }" class="modal" id="my-modal-3">
        <div :class="{
            'alert-error': modalType == 'error',
            'alert-warning': modalType == 'warning', 'alert-success': modalType == 'success'
        }" class="modal-box  relative">
            <button for="my-modal-3" @click="closeModal"
                class="btn btn-sm btn-circle absolute right-2 top-2">
                ✕ </button>
            <h3 class="font-bold text-lg ">{{ titleModal }}</h3>
            <p class="py-4">{{ messageModal }}</p>

        </div>
    </div>

</template>