import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { I18nextProvider } from 'react-i18next'
import i18next from 'i18next'
import translationEN from './translation/en/transfrom_en'
import translationTH from './translation/th/transfrom_th'

i18next.init({
  resources: {
    en: {
      translation: translationEN,
    },
    th: {
      translation: translationTH,
    },
  },
  lng: 'th', // Default language
  interpolation: {
    escapeValue: false, // React already escapes values
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <I18nextProvider i18n={i18next}>
    <App />
  </I18nextProvider>
)
