export default defineNuxtRouteMiddleware((to, from) =>{
  console.log(to)
  if (localStorage.getItem('token') === undefined) {
    return navigateTo('/')
  }
  
})