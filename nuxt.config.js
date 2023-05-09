import colors from 'vuetify/es5/util/colors'
import nl from 'vuetify/src/locale/nl'
import en from 'vuetify/src/locale/en'


export default {

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - ' + process.env.PROJECT_NAME || 'Project',
    title: 'PROJECT NAAM',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: 'images/favicon.ico' }
    ]
  },

  auth: {
    rewriteRedirects: true,
    redirect:false,
    localStorage: false,
    strategies: {
      cookie: {
        user: {
          property: 'data.user', // <--- Default "user"
        },
        endpoints: {
          login: {
            url: '/api/login',
            method: 'post',
            withCredentials: true
          },
          logout: {
            url: '/api/logout',
            method: 'get'
          },
          user: {
            url: '/api/user',
            method: 'get',
          }
        },
        tokenRequired: false,
        tokenType: false
      }
    }
  },
  server: {
    port: process.env.CLIENT_PORT
  },

  axios: {
    // baseURL: process.env.BASE_API_URL,
    credentials: true,
    proxy: true
  },
  proxy: {
    '/api/': { target: process.env.BASE_API_URL, pathRewrite: { '^/api/': '' } }
  },

  router: {
    // middleware: ['auth', 'auth-redirect', 'firstTimeLogin', 'ssr-cookie']
    middleware: ['ssr-cookie']
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/vee-validate.js',
    '~/plugins/notifier.js',
    '~/plugins/composition-api.js',
    // '~/plugins/axios.js',
    //{ src: '@/plugins/forward-set-cookies.js', mode: 'client' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],
  target: 'server',
  ssr: true,
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    'cookie-universal-nuxt',
  ],

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    lang: {
      locales: { nl, en },
      current: 'nl',
    },
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  publicRuntimeConfig: {
    SID: process.env.SID || 'template-sid',
    PROJECT_NAME: process.env.PROJECT_NAME || 'Project'
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ["vee-validate/dist/rules"]
  },
}
