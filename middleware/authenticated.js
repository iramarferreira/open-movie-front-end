export default defineNuxtRouteMiddleware((to, from) => {
  if (typeof window !== 'undefined') {
    console.log('You are on the browser')
    if (localStorage.getItem('token') === undefined || localStorage.getItem('token') === null) {
      return navigateTo('/')
    }
  } else {
    console.log('You are on the server')
    // 👉️ can't use localStorage
  }


})