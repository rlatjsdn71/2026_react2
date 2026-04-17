import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom' // BrowserRouter 컴포넌트 import
import { Provider } from 'react-redux' // redux를 사용하기 위해서 Provider 컴포넌트 import
import { QueryClient, QueryClientProvider } from '@tanstack/react-query' // Tanstack Query를 사용하기 위해서 QueryClient 컴포넌트 imoprt

// redux를 사용하기 위해서 store를 import, Provider 컴포넌트에 전달
import store from './store.js'

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Tanstack Query를 사용하기 위해서 App 태그를 QueryClientProvider 태그에 포함시킨다 */}
    <QueryClientProvider client={queryClient}>
      {/* redux를 사용하기 위해서 App 태그를 Provider 태그에 포함시킨다 */}
      <Provider store={store}>
        {/* 라우터를 사용하기 위해서 App 태그를 BrowserRouter 태그에 포함시킨다 */}
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </QueryClientProvider>
  </StrictMode>,
)
