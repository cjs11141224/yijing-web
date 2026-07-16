import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { UserPlus, LogIn } from 'lucide-react'
import { toast } from 'sonner'
import { useStore } from '@/store/useStore'
import { useSession } from '@/store/useSession'
import { accountApi } from '@/services/account'

export default function Login() {
  const nav = useNavigate()
  const [params] = useSearchParams()
  const redirect = params.get('redirect') || '/'
  const applyAccountUser = useStore((s) => s.applyAccountUser)
  const setSession = useSession((s) => s.setSession)

  const [tab, setTab] = useState<'login' | 'register'>('login')
  // 登录
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  // 注册
  const [rUsername, setRUsername] = useState('')
  const [rPhone, setRPhone] = useState('')
  const [rEmail, setREmail] = useState('')
  const [rPassword, setRPassword] = useState('')
  const [rConfirm, setRConfirm] = useState('')
  const [rNick, setRNick] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const inputCls = 'w-full mt-1 bg-yiji-warm-gray rounded-xl px-3 py-2.5 text-sm outline-none'

  const doLogin = async () => {
    if (!identifier.trim()) { toast.error('请输入账号'); return }
    if (!password) { toast.error('请输入密码'); return }
    setSubmitting(true)
    try {
      const { token, user } = await accountApi.login({ identifier: identifier.trim(), password })
      setSession(token, user)
      applyAccountUser(user)
      toast.success('登录成功')
      nav(redirect)
    } catch (e: any) {
      toast.error(e?.message || '登录失败')
    } finally {
      setSubmitting(false)
    }
  }

  const doRegister = async () => {
    if (!rUsername.trim() && !rPhone.trim() && !rEmail.trim()) {
      toast.error('请至少填写用户名 / 手机号 / 邮箱之一')
      return
    }
    if (rPassword.length < 6) { toast.error('密码至少 6 位'); return }
    if (rPassword !== rConfirm) { toast.error('两次密码不一致'); return }
    setSubmitting(true)
    try {
      const { token, user } = await accountApi.register({
        username: rUsername.trim() || undefined,
        phone: rPhone.trim() || undefined,
        email: rEmail.trim() || undefined,
        password: rPassword,
        nickName: rNick.trim() || undefined,
      })
      setSession(token, user)
      applyAccountUser(user)
      toast.success('注册成功，已自动登录')
      nav(redirect)
    } catch (e: any) {
      toast.error(e?.message || '注册失败')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-8 relative overflow-hidden">
      <div className="relative w-full max-w-xs">
        {/* Logo */}
        <div className="text-center mb-8">
          <img
            src="/logo.png"
            alt="易学"
            className="w-20 h-20 mx-auto rounded-3xl mb-4 shadow-card object-cover ring-1 ring-[rgba(212,168,67,0.3)]"
          />
          <h1 className="title-serif text-2xl">易学</h1>
          <p className="text-xs text-muted-foreground mt-1">游戏化学习易经智慧</p>
        </div>

        {/* Tabs */}
        <div className="flex bg-yiji-warm-gray rounded-xl p-1 mb-4">
          <button
            onClick={() => setTab('login')}
            className={`flex-1 py-2 rounded-lg text-sm flex items-center justify-center gap-1.5 transition ${tab === 'login' ? 'bg-white shadow-sm text-yiji-gold font-medium' : 'text-muted-foreground'}`}
          >
            <LogIn size={15} /> 登录
          </button>
          <button
            onClick={() => setTab('register')}
            className={`flex-1 py-2 rounded-lg text-sm flex items-center justify-center gap-1.5 transition ${tab === 'register' ? 'bg-white shadow-sm text-yiji-gold font-medium' : 'text-muted-foreground'}`}
          >
            <UserPlus size={15} /> 注册
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-card p-5 space-y-3">
          {tab === 'login' ? (
            <>
              <div>
                <label className="text-xs text-muted-foreground">账号（用户名 / 手机号 / 邮箱）</label>
                <input
                  className={inputCls}
                  placeholder="请输入账号"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">密码</label>
                <input
                  type="password"
                  className={inputCls}
                  placeholder="请输入密码"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                onClick={doLogin}
                disabled={submitting}
                className="w-full h-11 rounded-xl bg-yiji-gold text-white title-serif active:scale-[0.98] transition disabled:opacity-50"
              >
                登录
              </button>
            </>
          ) : (
            <>
              <div>
                <label className="text-xs text-muted-foreground">用户名（选填）</label>
                <input className={inputCls} placeholder="用于登录，唯一" value={rUsername} onChange={(e) => setRUsername(e.target.value)} />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">手机号（选填）</label>
                <input className={inputCls} placeholder="11 位手机号" value={rPhone} onChange={(e) => setRPhone(e.target.value.replace(/\D/g, ''))} maxLength={11} />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">邮箱（选填）</label>
                <input className={inputCls} placeholder="you@example.com" value={rEmail} onChange={(e) => setREmail(e.target.value)} />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">密码（至少 6 位）</label>
                <input type="password" className={inputCls} placeholder="设置密码" value={rPassword} onChange={(e) => setRPassword(e.target.value)} />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">确认密码</label>
                <input type="password" className={inputCls} placeholder="再次输入密码" value={rConfirm} onChange={(e) => setRConfirm(e.target.value)} />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">昵称（选填）</label>
                <input className={inputCls} placeholder="默认取账号名" value={rNick} onChange={(e) => setRNick(e.target.value)} />
              </div>
              <button
                onClick={doRegister}
                disabled={submitting}
                className="w-full h-11 rounded-xl bg-yiji-gold text-white title-serif active:scale-[0.98] transition disabled:opacity-50"
              >
                注册并登录
              </button>
            </>
          )}
        </div>

        <button onClick={() => nav(redirect)} className="w-full mt-4 text-sm text-muted-foreground active:scale-[0.98] transition">
          游客模式进入 →
        </button>

        <p className="text-[10px] text-muted-foreground text-center mt-6 leading-relaxed">
          登录即表示同意《用户协议》与《隐私政策》<br />账号由后端加密存储，密码不会明文保存
        </p>
      </div>
    </div>
  )
}
