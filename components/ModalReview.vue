<script setup lang="ts">
import { useReviewStore } from '~~/stores/useReviewStore';
import Swal from 'sweetalert2';


const reviewStore = useReviewStore()
const showModalReview = ref(false)
const movieReview = ref('')

const props = defineProps({
    movieReviewProps: { type: Object, required: true },
    showModalReviewProps: { type: Boolean, required: true },
})

const emit = defineEmits(['closeModalReview'])

onMounted(() => {

    showModalReview.value = props.showModalReviewProps;
    movieReview.value = props.movieReviewProps;

})

watch(() => props.movieReviewProps, (newValue) => {
    movieReview.value = newValue
})

watch(() => props.showModalReviewProps, (newValue) => {
    showModalReview.value = newValue
})



async function saveReviewMovie() {

    let response = await reviewStore.saveReview(movieReview.value.myReview,
        movieReview.value.myStars, movieReview.value.imdbID)

    if (response != undefined && response == 200) {
        Swal.fire("Review criado com sucesso")
        movieReview.value.hasReview = true;
    }
    else if (response == 422) {
        Swal.fire(reviewStore.messageError)
    } else {

        Swal.fire(reviewStore.messageError)
    }
}

async function deleteReviewMovie() {

    let response = await reviewStore.deleteReview(movieReview.value.imdbID)

    if (response != undefined && response == 200) {
        Swal.fire("Review deletado com sucesso")

        movieReview.value.hasReview = false;
    }
    else if (response == 422) {
        Swal.fire(reviewStore.messageError)

    } else {
        Swal.fire(reviewStore.messageError)

    }
}

async function btReview() {
    // has review
    if (movieReview.value.myStars == undefined) {
        movieReview.value.myStars = 0
    }
    if (movieReview.value.hasReview) {

        if (movieReview.value.myReview == '') {
            // console.log("delete ")
            deleteReviewMovie();
        } else {
            // console.log("delete e save")
            await deleteReviewMovie();
            await saveReviewMovie();
        }

    } else { // save review
        // console.log("save")
        await saveReviewMovie();
    }
}

function closeModalReview() {
    showModalReview.value = false
    emit('closeModalReview', showModalReview.value)
}

function range(event: any) {
    // console.log(Number(event.target.value))
    movieReview.value.myStars = Number(event.target.value)
    // console.log(movieReview.value.myStars)
    // console.log(movieReview.value.myReview)
}

</script>

<template>


    <!-- Put this part before </body> tag -->
    <div :class="{ 'modal-open': showModalReview }" class="modal" id="my-modal-3">
        <div class="modal-box  relative">
            <button for="my-modal-3" @click="closeModalReview" class="btn btn-sm btn-circle absolute right-2 top-2">
                ✕ </button>

            <!-- div rank -->
            <div>
                <p class="text-base font-medium">Defina uma classificação:</p>
                <input @input="range($event)" type="range" min="0" max="5" :value="movieReview.myStars" class="range" step="1" />
                <div class="w-full flex justify-between text-xs px-2">
                    <span>0</span>
                    <span>1</span>
                    <span>2</span>
                    <span>3</span>
                    <span>4</span>
                    <span>5</span>
                </div>
            </div>
            <!-- div comment -->
            <div class="mt-2">
                <p class="mb-1 text-base font-medium">Digite seu comentário sobre o filme <span class="font-bold">{{
        movieReview.title
}}</span>: </p>
                <textarea v-model="movieReview.myReview" class="w-full textarea textarea-primary"></textarea>
            </div>
            <button @click="btReview" class="btn">Salvar</button>

        </div>
    </div>

</template>