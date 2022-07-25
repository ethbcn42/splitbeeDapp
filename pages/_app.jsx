import { MoralisProvider } from "react-moralis";
import { ChakraProvider } from '@chakra-ui/react';
import { ToastContainer } from "react-toastify";


import SEOHeader from '@components/SEO';
import { store } from "@store";
import { Provider } from "react-redux";


import "@/styles/global.css";

import 'react-toastify/dist/ReactToastify.css';


function MyApp({ Component, pageProps}) {
  const { seo } = pageProps;

  return (
    <Provider store={store}>
      <ChakraProvider>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <SEOHeader {...seo}/>
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  )
}

export default MyApp