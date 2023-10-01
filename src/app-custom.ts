import { defineAsyncComponent } from 'vue'
import { SetupCalendar } from 'v-calendar'
import { plugin as VueTippy } from 'vue-tippy'
import { START_LOCATION } from 'vue-router'

import { useNotyf } from './composable/useNotyf'
import { useUserSession } from './stores/userSession'

import type { VueroAppContext } from './app'

// Lazy load aditional components
export async function registerGlobalComponents({ app }: VueroAppContext) {
  const background = (await import('./directives/background')).default
  const tooltip = (await import('./directives/tooltip')).default

  app.use(SetupCalendar, {})
  app.use(VueTippy, {
    component: 'Tippy',
    defaultProps: {
      theme: 'light',
    },
  })

  app.component(
    // eslint-disable-next-line vue/multi-word-component-names
    'Multiselect',
    defineAsyncComponent({
      loader: () => import('@vueform/multiselect').then((mod) => mod.default),
      delay: 0,
      suspensible: false,
    })
  )
  app.component(
    // eslint-disable-next-line vue/multi-word-component-names
    'Slider',
    defineAsyncComponent({
      loader: () => import('@vueform/slider').then((mod) => mod.default),
      delay: 0,
      suspensible: false,
    })
  )
  app.component(
    'VCalendar',
    defineAsyncComponent({
      loader: () => import('v-calendar').then((mod) => mod.Calendar),
      delay: 0,
      suspensible: false,
    })
  )
  app.component(
    'VDatePicker',
    defineAsyncComponent({
      loader: () => import('v-calendar').then((mod) => mod.DatePicker),
      delay: 0,
      suspensible: false,
    })
  )

  app.directive('background', background)
  app.directive('tooltip', tooltip)
}

export function registerRouterNavigationGuards({ router }: VueroAppContext) {
  router.beforeEach(async (to, from) => {
    const userSession = useUserSession()
    const notyf = useNotyf()
    const preferredLanguage = navigator.language;

    if (from === START_LOCATION && userSession.isLoggedIn) {
      try {
        const user = JSON.parse(localStorage.getItem('user') || '')
        const token = localStorage.getItem('token') || ''

        userSession.setUser(user)
        userSession.setToken(token)
        notyf.success(`Bienvenidos, ${user.name}`)
      } catch (err) {

        let _message = preferredLanguage == 'en-US' ? 'Your session is invalid' :
          preferredLanguage == 'pt-BR' ? 'A sua sessão não é válida' :
            'Sesión inválida'

        // delete stored token if it fails
        userSession.logoutUser()
        notyf.error(_message)

        if (to.meta.requiresAuth) {
          // redirect the user somewhere
          return {
            // Will follow the redirection set in /@src/pages/auth/index.vue
            name: 'auth',
            // save the location we were at to come back later
            query: { redirect: to.fullPath },
          }
        }
      }
    } else if (to.meta.requiresAuth && !userSession.isLoggedIn) {

      let _message = preferredLanguage == 'en-US' ? 'Sorry, you should loggin to access this section (anything will work)' :
        preferredLanguage == 'pt-BR' ? 'Desculpe, você deve fazer login para acessar esta seção (Qualquer coisa funcionará)' :
          'Lo sentimos, debe iniciar sesión para acceder a esta sección (todo funcionará)'

      notyf.error({
        message: _message,
        duration: 7000,
      })

      return {
        name: 'auth',
        query: { redirect: to.fullPath },
      }
    }
  })
}
