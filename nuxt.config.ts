// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  typescript: {
      shim: false
  },
  buildModules: [
    '@nuxtjs/google-fonts'
  ],
  googleFonts: {
    families: {
      Lato: true
    }
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
