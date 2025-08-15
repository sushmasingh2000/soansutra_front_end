
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router-dom'
import router from './routes/index.jsx'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Toaster } from 'react-hot-toast'

// Create a client
const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
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
      <RouterProvider router={router}/>
    </QueryClientProvider>
  </StrictMode>
)