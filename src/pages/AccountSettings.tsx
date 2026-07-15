import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogOut } from 'lucide-react'
import { toast } from 'sonner'
import PageHeader from '@/components/PageHeader'
import { useSession } from '@/store/useSession'
import { useStore } from '@/store/useStore'
import { accountApi } from '@/services/account'

export default function AccountSettings() {
  const nav = useNavigate()
  const { currentUser, isGuest, clearSession } = useSession()
  const clearAccountUser = useStore((s) => s.clearAccountUser)

  const [nickName, setNickName] = useState('')
  const [bio, setBio] = useState('')
  const [avatar, setAvatar] = useState('')
  const [saving, setSaving] = useState(false)

  const [oldPwd, setOldPwd] = useState('')
  const [newPwd, setNewPwd] = useState('')
  const [confirmPwd, setConfirmPwd] = useState('')
  const [changing, setChanging] = useState(false)

  useEffect(() => {
    if (isGuest) {
      nav('/login?redirect=/account')
      return
    }
    if (currentUser) {
      setNickName(currentUser.nickName || '')
      setBio(currentUser.bio || '')
      setAvatar(currentUser.avatar || '')
    }
  }, [isGuest, currentUser, nav])

  if (isGuest || !currentUser) return null

  const idText = currentUser.username || currentUser.phone || currentUser.email || '—'
  const inputCls = 'w-full mt-1 bg-yiji-warm-gray rounded-xl px-3 py-2.5 text-sm outline-none'

  const saveProfile = async () => {
    setSaving(true)
    try {
      const { user } = await accountApi.updateProfile({ nickName, bio, avatar })
      useSession.setState({ currentUser: user })
      useStore.getState().setAccountUserInfo(user)
      toast.success('资料已更新')
    } catch (e: any) {
      toast.error(e?.message || '更新失败')
    } finally {
      setSaving(false)
    }
  }

  const changePassword = async () => {
    if (newPwd.length < 6) { toast.error('新密码至少 6 位'); return }
    if (newPwd !== confirmPwd) { toast.error('两次密码不一致'); return }
    setChanging(true)
    try {
      await accountApi.changePassword({ oldPassword: oldPwd, newPassword: newPwd })
      toast.success('密码已修改')
      setOldPwd('')
      setNewPwd('')
      setConfirmPwd('')
    } catch (e: any) {
      toast.error(e?.message || '修改失败')
    } finally {
      setChanging(false)
    }
  }

  const onLogout = async () => {
    try { await accountApi.logout() } catch {}
    clearSession()
    clearAccountUser()
    toast.success('已退出登录')
    nav('/')
  }

  return (
    <div className="min-h-screen">
      <PageHeader title="账号设置" onBack={() => nav('/profile')} />

      <div className="px-4 py-4 space-y-4">
        {/* 账号信息 */}
        <div className="yi-card rounded-2xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-yiji-gold to-yiji-gold/70 flex items-center justify-center text-white title-serif text-2xl overflow-hidden">
              {avatar ? <img src={avatar} alt="" className="w-full h-full object-cover" /> : (nickName[0] || '易')}
            </div>
            <div className="min-w-0">
              <div className="title-serif text-base truncate">{nickName}</div>
              <div className="text-xs text-muted-foreground mt-0.5">账号：{idText}</div>
              <div className="text-[11px] text-muted-foreground">注册于 {currentUser.createdAt?.slice(0, 10)}</div>
            </div>
          </div>
        </div>

        {/* 资料编辑 */}
        <div className="bg-white rounded-2xl shadow-card p-4 space-y-3">
          <h3 className="title-serif text-sm">资料编辑</h3>
          <div>
            <label className="text-xs text-muted-foreground">昵称</label>
            <input className={inputCls} value={nickName} onChange={(e) => setNickName(e.target.value)} />
          </div>
          <div>
            <label className="text-xs text-muted-foreground">头像（图片链接，选填）</label>
            <input className={inputCls} placeholder="https://..." value={avatar} onChange={(e) => setAvatar(e.target.value)} />
          </div>
          <div>
            <label className="text-xs text-muted-foreground">个性签名</label>
            <textarea className={inputCls + ' resize-none'} rows={2} value={bio} onChange={(e) => setBio(e.target.value)} />
          </div>
          <button onClick={saveProfile} disabled={saving} className="w-full h-11 rounded-xl bg-yiji-gold text-white title-serif active:scale-[0.98] transition disabled:opacity-50">
            保存资料
          </button>
        </div>

        {/* 修改密码 */}
        <div className="bg-white rounded-2xl shadow-card p-4 space-y-3">
          <h3 className="title-serif text-sm">修改密码</h3>
          <div>
            <label className="text-xs text-muted-foreground">原密码</label>
            <input type="password" className={inputCls} value={oldPwd} onChange={(e) => setOldPwd(e.target.value)} />
          </div>
          <div>
            <label className="text-xs text-muted-foreground">新密码（至少 6 位）</label>
            <input type="password" className={inputCls} value={newPwd} onChange={(e) => setNewPwd(e.target.value)} />
          </div>
          <div>
            <label className="text-xs text-muted-foreground">确认新密码</label>
            <input type="password" className={inputCls} value={confirmPwd} onChange={(e) => setConfirmPwd(e.target.value)} />
          </div>
          <button onClick={changePassword} disabled={changing} className="w-full h-11 rounded-xl bg-yiji-gold text-white title-serif active:scale-[0.98] transition disabled:opacity-50">
            修改密码
          </button>
        </div>

        <button
          onClick={onLogout}
          className="w-full h-11 rounded-xl bg-white border border-[hsl(var(--border))] text-sm text-muted-foreground active:scale-[0.98] transition flex items-center justify-center gap-2"
        >
          <LogOut size={16} /> 退出登录
        </button>
      </div>
    </div>
  )
}
