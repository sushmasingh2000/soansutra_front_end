
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Toaster } from 'react-hot-toast'
import App from './App.js'
import { LoginModalProvider } from './context/Login.js'

// Create a client
const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LoginModalProvider>
    <QueryClientProvider client={queryClient}>
    <Toaster
        toastOptions={{
          className: "",
          style: {
            border: `1px solid `,
            color: "#25D366",
            fontSize: "15px",
            marginTop: "100px",
            borderRadius: "10px",
          },
        }}
        autoClose={1000}
        limit={1}
      />
      <App/>
    </QueryClientProvider>
    </LoginModalProvider>
   
  </StrictMode>
)