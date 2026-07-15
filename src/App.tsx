import { Routes, Route } from 'react-router-dom'
import AppLayout from '@/components/AppLayout'
import Home from '@/pages/Home'
import Hexagrams from '@/pages/Hexagrams'
import Community from '@/pages/Community'
import Profile from '@/pages/Profile'
import Learn from '@/pages/Learn'
import Divination from '@/pages/Divination'
import Stats from '@/pages/Stats'
import Achievements from '@/pages/Achievements'
import Checkin from '@/pages/Checkin'
import Leaderboard from '@/pages/Leaderboard'
import Friends from '@/pages/Friends'
import Events from '@/pages/Events'
import Membership from '@/pages/Membership'
import Certification from '@/pages/Certification'
import Exam from '@/pages/Exam'
import DivineOrder from '@/pages/DivineOrder'
import AdminDivine from '@/pages/AdminDivine'
import Login from '@/pages/Login'
import AccountSettings from '@/pages/AccountSettings'
import PostDetail from '@/pages/PostDetail'
import CreatePost from '@/pages/CreatePost'
import Market from '@/pages/Market'
import ContentDetail from '@/pages/ContentDetail'
import PublishContent from '@/pages/PublishContent'
import Qa from '@/pages/Qa'
import { Toaster } from '@/components/ui/sonner'

export default function App() {
  return (
    <>
      <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/admin/divine" element={<AdminDivine />} />
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/hexagrams" element={<Hexagrams />} />
        <Route path="/community" element={<Community />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/account" element={<AccountSettings />} />
        <Route path="/learn/:id" element={<Learn />} />
        <Route path="/divination" element={<Divination />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/checkin" element={<Checkin />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/friends" element={<Friends />} />
        <Route path="/events" element={<Events />} />
        <Route path="/membership" element={<Membership />} />
        <Route path="/certification" element={<Certification />} />
        <Route path="/exam" element={<Exam />} />
        <Route path="/divine-order" element={<DivineOrder />} />
        <Route path="/post/:id" element={<PostDetail />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/market" element={<Market />} />
        <Route path="/content/:id" element={<ContentDetail />} />
        <Route path="/publish-content" element={<PublishContent />} />
        <Route path="/qa" element={<Qa />} />
      </Route>
    </Routes>
    <Toaster />
    </>
  )
}
