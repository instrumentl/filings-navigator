import '@/styles/main.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { store } from '@/state/store'
import Navbar from '@/components/navbar'
import Script from "next/script"
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Head>
        <meta name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </Head>
      <Script 
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha2/dist/js/bootstrap.bundle.min.js" 
        integrity="sha384-qKXV1j0HvMUeCBQ+QVp7JcfGl760yU08IQ+GpUo5hlbpg51QRiuqHAJz8+BrxE/N" 
        crossOrigin="anonymous" 
      />
      <Navbar />
      <Component {...pageProps} />
    </Provider>
  )
}
