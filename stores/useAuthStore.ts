import { defineStore } from 'pinia';
import User from '../models/User';

export const useAuthStore = defineStore('auth', () => {

    const token = ref();
    const user = ref<User>()

    function setToken(value:string){
        token.value = value;
    }

    function setUser(value: User){
        user.value = value
    }

    return{token, user, setToken, setUser}
    
})