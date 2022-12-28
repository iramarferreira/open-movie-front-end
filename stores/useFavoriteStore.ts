import { defineStore } from 'pinia';
import { useAuthStore } from './useAuthStore';
import Movie from '../models/Movie';
import axios from 'axios';

export const useFavoriteStore = defineStore('favorite', () => {
    const favoritesId = ref([])
    const favorites = ref([])
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
            response = await axios.delete(baseUrl + `/favorites/${imdbID}`, {
                headers: {
                    'Authorization': `Bearer ` + authStore.token
                }
            })

            if (response != undefined && response.status == 200) {
                await getFavorites().then(async (response) => {
                    await getFavoritesAllOMDB(response.data.favorites);
                });
                
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
        console.log(authStore.token)
        try {
            response = await axios.get(baseUrl + `/favorites`, {
                headers: {
                    'Authorization': `Bearer ` + authStore.token
                }
            })

            if (response != undefined && response.status == 200) {
                favoritesId.value = response.data.favorites
                return response;
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


    async function getMovieOMD(id: string) {
        let baseUrl = runtimeConfig.public.API_BASE_URL_OMDB
        let apiKey = runtimeConfig.public.API_KEY
        let response;

        try {
            response = await axios.get(baseUrl + `/?i=${id}&apikey=${apiKey}`)

            if (response != undefined && response.status == 200 && response.data.Response) {
                let objMovie: Movie = {
                    imdbID: response.data.imdbID,
                    image: response.data.Poster,
                    genre: response.data.Genre.split(', '),
                    myReview: '',
                    isFavorite: true,
                    title: response.data.Title,
                    year: response.data.Year
                }
                return objMovie;
            }

        } catch (error) {
            return null
            console.log(error)
        }

    }

    // get favoritesAll OMDB
    async function getFavoritesAllOMDB(arr: []) {
        favorites.value = []

        let response;

        for (let i = 0; i < arr.length; i++) {
            console.log(i)
            let obj = await getMovieOMD(arr[i].imdbID)
            console.log(obj)
            if (obj != null)
                favorites.value.push(obj)
        }

        // Promise.all(favorites.value).then( () => console.log('all done'))

    }

    return { favoritesId, favorites, messageError, saveFavorite, deleteFavorite, getFavorites, getFavoritesAllOMDB }

})