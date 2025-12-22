import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import ThemeProvider from './themeProvider.tsx'
import { Toaster } from 'sonner';
import QueryWrapper from './queries/queryWrapper.tsx'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryWrapper>
    <ThemeProvider>
    <Toaster />

    <App />

    </ThemeProvider>

    </QueryWrapper>
   
  </StrictMode>,
)
