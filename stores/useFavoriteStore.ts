import { defineStore } from 'pinia';
import { useAuthStore } from './useAuthStore';
import axios from 'axios';

export const useFavoriteStore = defineStore('favorite', () => {
    const favoritesId = ref([])
    const favorites = ref()
    const authStore = useAuthStore()
    const messageError = ref()
    const runtimeConfig = useRuntimeConfig()

    // save favorite
    async function saveFavorite(imdbID: string) {
        let baseUrl = runtimeConfig.public.API_BASE_URL_TST

        let response;
        let obj = {
            imdbID
        }
        try {
            response = await axios.post(baseUrl + `/favorites`, obj, {
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

     // delete favorite
     async function deleteFavorite(imdbID: string) {
        let baseUrl = runtimeConfig.public.API_BASE_URL_TST

        let response;
        let obj = {
            imdbID
        }
        try {
            response = await axios.delete(baseUrl + `/favorites/${imdbID}`,  {
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

    // get favorites
    async function getFavorites() {
       
        let baseUrl = runtimeConfig.public.API_BASE_URL_TST

        let response;
        
        try {
            response = await axios.delete(baseUrl + `/favorites`,  {
                headers: {
                    'Authorization': `Bearer ` + authStore.token
                }
            })

            if (response != undefined && response.status == 200) {
                favoritesId.value = response.data.favorites
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
                error?.response?.status
            }
        }
    }

    return {favoritesId, messageError, saveFavorite, deleteFavorite, getFavorites}

})