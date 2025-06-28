import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom"
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query"
import { SelectedUserProvider } from './store/SelectedUserContext.jsx'

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <SelectedUserProvider>
          <App />
        </SelectedUserProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
)
