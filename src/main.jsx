import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom' // BrowserRouter 컴포넌트 import

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* 라우터를 사용하기 위해서 App 태그를 BrowserRouter 태그에 포함시킨다 */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
