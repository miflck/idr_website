import '../styles/globals.scss'
import '../styles/Home.module.scss'
import '../styles/variables.scss'
import { appWithTranslation } from 'next-i18next'

import { AppWrapper } from '../context/AppContext'; // import based on where you put it

function MyApp({ Component, pageProps }) {

  
  return (
  <AppWrapper>
      <Component {...pageProps} />
  </AppWrapper>
  )
}



 export default appWithTranslation(MyApp)
