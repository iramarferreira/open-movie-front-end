export default defineNuxtRouteMiddleware((to, from) =>{

  if (localStorage.getItem('token') === undefined || localStorage.getItem('token') === null) {
    return navigateTo('/')
  }
  
})