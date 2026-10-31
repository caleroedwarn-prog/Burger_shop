import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import CartProvider from './context/cartContext.tsx'
import { ProductModalProvider } from './context/ProductModalContext.tsx'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <CartProvider>
          <ProductModalProvider>
            <App />
          </ProductModalProvider>
        </CartProvider>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
)
