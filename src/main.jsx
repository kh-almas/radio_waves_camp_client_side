import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import AuthProvider from "./Providers/AuthProvider.jsx";
import {RouterProvider} from "react-router-dom";
import router from "./Route/Route.jsx";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import LoaderProvider from "./Providers/LoaderProvider.jsx";

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <QueryClientProvider client={queryClient}>
          <AuthProvider>
              <LoaderProvider>
                  <RouterProvider router={router} />
              </LoaderProvider>
          </AuthProvider>
      </QueryClientProvider>
  </React.StrictMode>,
)
