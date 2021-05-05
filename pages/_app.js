import '../styles/globals.scss'
import '../styles/Home.module.scss'
import '../styles/variables.scss'
import { appWithTranslation } from 'next-i18next'

import NavMenu from '../components/Menu/navMenu';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}



 export default appWithTranslation(MyApp)
