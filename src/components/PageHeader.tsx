import { type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PageHeaderProps {
  title: string
  subtitle?: string
  right?: ReactNode
  onBack?: () => void
  className?: string
}

export default function PageHeader({ title, subtitle, right, onBack, className }: PageHeaderProps) {
  const navigate = useNavigate()
  return (
    <header
      className={cn(
        'sticky top-0 z-20 bg-[hsl(var(--warm-white))]/90 backdrop-blur-md border-b border-[hsl(var(--border))]',
        'flex items-center gap-2 px-3 h-12',
        className
      )}
    >
      <button
        onClick={() => (onBack ? onBack() : navigate(-1))}
        className="flex items-center justify-center w-8 h-8 -ml-1 text-foreground active:scale-90 transition-transform"
        aria-label="返回"
      >
        <ChevronLeft size={24} />
      </button>
      <div className="flex-1 min-w-0">
        <h1 className="title-serif text-base truncate leading-tight">{title}</h1>
        {subtitle && <p className="text-[11px] text-muted-foreground truncate leading-tight">{subtitle}</p>}
      </div>
      <div className="w-8 flex justify-end">{right}</div>
    </header>
  )
}
