import { createApp as createClientApp, h, Suspense } from 'vue'

import { createHead } from '@vueuse/head'
import { createPinia } from 'pinia'
import { createI18n } from './i18n'
import { createRouter } from './router'
import VueroApp from './VueroApp.vue'
import VueGoodTablePlugin from 'vue-good-table-next'
import VueSweetalert2 from 'vue-sweetalert2';

import './styles'

import { initDarkmode } from '/@src/stores/darkmode'
import { createApi } from '/@src/composable/useApi'
import JsonCSV from 'vue-json-csv'

export type VueroAppContext = Awaited<ReturnType<typeof createApp>>

// import { registerGlobalComponents, registerRouterNavigationGuards } from './app-custom'
import { registerGlobalComponents } from './app-custom'

export async function createApp() {
  const head = createHead()
  const i18n = createI18n()
  const router = createRouter()
  const pinia = createPinia()
  const api = createApi()

  const app = createClientApp({
    // This is the global app setup function
    setup() {
      /**
       * Initialize the darkmode watcher
       *
       * @see /@src/stores/darkmode
       */
      initDarkmode()

      /**
       * Here we are creating a render function for our main app with
       * the main VueroApp component, wrapped in a Suspense component
       * to handle async loading of the app.
       * Template equivalent would be:
       *
       * <template>
       *   <Susupense>
       *     <VueroApp />
       *   </Susupense>
       * </template>
       */
      return () => {
        /**
         * The Suspense component is needed to use async in child components setup
         * @see https://v3.vuejs.org/guide/migration/suspense.html
         */
        return h(Suspense, null, {
          default: () => h(VueroApp),
        })
      }
    },
  })

  const vuero = {
    app,
    api,
    router,
    i18n,
    head,
    pinia,
  }

  await registerGlobalComponents(vuero)
  app.use(vuero.pinia)
  app.use(vuero.head)
  app.use(vuero.i18n)
  app.use(VueGoodTablePlugin)
  app.component('downloadCsv', JsonCSV)
  app.use(VueSweetalert2)

  app.config.globalProperties.$filters = {
    formatCurrency(value: number) {
      return new Intl.NumberFormat('mx-MX').format(value);
    }
  }

  // registerRouterNavigationGuards(vuero)
  app.use(vuero.router)

  return vuero
}
