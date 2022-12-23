import { defineStore } from 'pinia';
import { useAuthStore } from './useAuthStore';
import axios from 'axios';


export const useReviewStore = defineStore('review', () => {

    const authStore = useAuthStore()
    const myReviews = ref()
    const reviewsMovie = ref()
    const messageError = ref()
    const runtimeConfig = useRuntimeConfig()

    // save review
    async function saveReview(msg: string, stars: number, imdbID: string) {
        let baseUrl = runtimeConfig.public.API_BASE_URL_TST

        let response;
        let obj = {
            msg,
            stars
        }
        try {
            response = await axios.post(baseUrl + `/reviews/${imdbID}`, obj, {
                headers: {
                    'Authorization': `Bearer ` + authStore.token
                }
            })

            if (response != undefined && response.status == 200) {

                return 200;
            }

            console.log(response)
        } catch (error) {

            if (error?.response?.status == 422) {

                messageError.value = error?.response?.data.msg
                return 422
            } else {
                console.error(error)
                messageError.value = 'Desculpa, aconteceu algum erro'
                return error?.response?.status
            }
        }
    }


    // delete review
    async function deleteReview(imdbID: string) {
        let baseUrl = runtimeConfig.public.API_BASE_URL_TST

        let response;
        let obj = {
            msg,
            stars
        }
        try {
            response = await axios.delete(baseUrl + `/reviews/${imdbID}`, {
                headers: {
                    'Authorization': `Bearer ` + authStore.token
                }
            })

            if (response != undefined && response.status == 200) {

                return 200;
            }

            console.log(response)
        } catch (error) {

            if (error?.response?.status == 422) {

                messageError.value = error?.response?.data.msg
                return 422
            } else {
                console.error(error)
                messageError.value = 'Desculpa, aconteceu algum erro'
                return error?.response?.status
            }
        }
    }

    // get my reviews
    async function getReviewsMy() {
        let baseUrl = runtimeConfig.public.API_BASE_URL_TST

        let response;

        try {
            response = await axios.get(baseUrl + `/reviews/my`, {
                headers: {
                    'Authorization': `Bearer ` + authStore.token
                }
            })

            if (response != undefined && response.status == 200) {
                myReviews.value = response.data.reviews
                return 200;
            }

            console.log(response)
        } catch (error) {

            if (error?.response?.status == 422) {

                messageError.value = error?.response?.data.msg
                return 422
            } else {
                console.error(error)
                messageError.value = 'Desculpa, aconteceu algum erro'
                return error?.response?.status
            }
        }
    }


    // get reviews Movie
    async function getReviewsMovie(imdbID: string) {
        let baseUrl = runtimeConfig.public.API_BASE_URL_TST

        let response;

        try {
            response = await axios.get(baseUrl + `/reviews/${imdbID}`, {
                headers: {
                    'Authorization': `Bearer ` + authStore.token
                }
            })

            if (response != undefined && response.status == 200) {
                reviewsMovie.value = response.data.reviews
                return 200;
            }

            console.log(response)
        } catch (error) {

            if (error?.response?.status == 422) {

                messageError.value = error?.response?.data.msg
                return 422
            } else {
                console.error(error)
                messageError.value = 'Desculpa, aconteceu algum erro'
                return error?.response?.status
            }
        }
    }

    return {myReviews, reviewsMovie, messageError, saveReview, deleteReview, getReviewsMy, getReviewsMovie}

})