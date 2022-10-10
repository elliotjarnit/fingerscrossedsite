// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  typescript: {
      shim: false
  },
  app: { 
    head: { 
      title: "Fingers Crossed Wine",
      link: [ 
        {rel: 'icon', type: "image/x-icon", href: '/favicon.ico?v2'} 
      ]
    } 
  }
})
