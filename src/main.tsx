import { createRoot } from 'react-dom/client'
import axios from 'axios'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AppRoutes } from './app/routing/AppRoutes.tsx'
import { AuthProvider, setupAxios } from './app/modules/auth/index.ts'

import { MetronicI18nProvider } from './_metronic/i18n/Metronici18n.tsx'
import './_metronic/assets/sass/style.react.scss'
import './_metronic/assets/fonticon/fonticon.css'
import './_metronic/assets/keenicons/duotone/style.css'
import './_metronic/assets/keenicons/outline/style.css'
import './_metronic/assets/keenicons/solid/style.css'

import './_metronic/assets/sass/style.scss'

setupAxios(axios)

const queryClient = new QueryClient()
const container = document.getElementById('root')

if (container) {
  createRoot(container).render(
    <QueryClientProvider client={queryClient}>
      <MetronicI18nProvider>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </MetronicI18nProvider>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  )
}

