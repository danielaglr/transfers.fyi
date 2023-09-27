import type { AppProps } from 'next/app';
import Layout from './_layout';
import { Figtree } from 'next/font/google';
import '@/styles/globals.css';

const Fig = Figtree({ subsets: ['latin'] });

function App({ Component, pageProps }: AppProps) {
  return (
    <main className={Fig.className}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </main>
  )
};

export default App;