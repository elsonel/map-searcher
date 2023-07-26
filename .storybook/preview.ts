import type { Preview } from '@storybook/vue3'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import { setup } from '@storybook/vue3'
import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import '../src/assets/main.css'

setup((app) => {
  app.use(PrimeVue, { ripple: true })
  app.use(ToastService)
})

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    }
  }
}

export default preview
