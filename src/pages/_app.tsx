import type { AppProps } from 'next/app';
import Layout from './_layout';
import { Figtree } from 'next/font/google';
import '@/styles/globals.css';
import AuthProvider from '@/contexts/UserContext';

const Fig = Figtree({ subsets: ['latin'] });

function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <main className={Fig.className}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </main>
    </AuthProvider>
  )
};

export default App;