
import type { AppProps /*, AppContext */ } from 'next/app'
import { AuthProvider } from '@context/AuthContext';

import "@styles/globals.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return <AuthProvider><Component {...pageProps} /></AuthProvider>
}

export default MyApp
