import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import rootReducer from './reducer/index.js'
import { PrimeReactProvider } from 'primereact/api';

// importing css files
import Tailwind from "primereact/passthrough/tailwind";

import './primeReactComponents.css'
import './index.css'
import './components/common/loader.css'

// importing app
import App from './App.jsx'


const store = configureStore({
  reducer : rootReducer
});

createRoot(document.getElementById('root')).render(
  
  <Provider store={store}>
    <BrowserRouter>
      <PrimeReactProvider value={{ pt: Tailwind }}>
        <App />
        <Toaster/>
      </PrimeReactProvider>
    </BrowserRouter>
  </Provider>,
)
