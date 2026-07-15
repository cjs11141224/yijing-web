import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import { useStore } from '@/store/useStore'
import { useSession } from '@/store/useSession'
import './index.css'

function Root() {
  const storeInit = useStore((s) => s.init)
  const sessionInit = useSession((s) => s.init)
  useEffect(() => {
    storeInit()
    sessionInit().then(() => {
      const u = useSession.getState().currentUser
      if (u) useStore.getState().applyAccountUser(u)
    })
  }, [storeInit, sessionInit])
  return <App />
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Root />
    </BrowserRouter>
  </StrictMode>
)
