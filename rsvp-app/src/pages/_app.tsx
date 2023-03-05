import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Lora, Parisienne } from 'next/font/google'

// setup fonts here naming them with a css variable, there's then set in the tailwind theme
// as described here: https://nextjs.org/docs/basic-features/font-optimization
const parisienne = Parisienne({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-parisienne',
})
const lora = Lora({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-lora',
})


export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${lora.variable} ${parisienne.variable} font-serif`}>
      <Component {...pageProps} />
    </main>
  )
}
