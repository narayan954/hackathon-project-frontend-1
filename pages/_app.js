import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';
import Head from 'next/head';
import { store } from '../state/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Provider store={store}>
        <Head>
          <title>Doctor on Demand</title>
          <meta http-equiv="X-UA-Compatible" content="IE=7" />
          <meta
            name="description"
            content="Consult a big city doctor instantly on call, 24x7.
              Doctor-on-Demand enables you to speak with experienced and
              licensed specialist doctors instantly at any time of the day."
          />
        </Head>
        <Component {...pageProps} />
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          draggable
          theme="dark"
        />
      </Provider>
    </ChakraProvider>
  );
}

export default MyApp;
