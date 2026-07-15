import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import TabBar from './TabBar'

const TAB_PATHS = ['/', '/hexagrams', '/community', '/profile']

export default function AppLayout() {
  const { pathname } = useLocation()
  const showTab = TAB_PATHS.includes(pathname)

  return (
    <div className="min-h-screen">
      <Sidebar />
      <main className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 lg:pl-64 py-4 lg:py-8">
        <Outlet />
      </main>
      {showTab && <TabBar showTab={showTab} />}
    </div>
  )
}
