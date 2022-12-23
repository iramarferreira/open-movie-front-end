// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  
  // app
  app: {
    head: {
      title: 'Open Movie',
      titleTemplate: 'Open Movie',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {

          content: 'Open Movie',
        },
      ],
      // link: [{ rel: 'icon', type: 'image/x-icon', href: config.settings.html.icon || '/favicon.ico' }],
    },
  },


  modules: [
    '@nuxtjs/tailwindcss', 
    '@pinia/nuxt'
  ],

  

  runtimeConfig: {
    // The private keys which are only available server-side
    apiSecret: '123',
    // Keys within public are also exposed client-side
    public: {
      API_BASE_URL_TST: process.env.API_BASE_URL_TST || '' ,
      API_BASE_URL_OMDB: process.env.API_BASE_URL_OMDB || '' ,
      API_KEY: process.env.API_KEY || '' ,
    }
  }


  
})
