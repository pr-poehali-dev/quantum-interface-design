import { useState } from "react"
import Icon from "@/components/ui/icon"

const GET_REQUESTS_URL = "https://functions.poehali.dev/6a3f8ac9-df2c-4af4-9b65-dcf961d6d97f"

interface Request {
  id: number
  name: string
  phone: string
  message: string
  created_at: string
}

export default function Admin() {
  const [password, setPassword] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle")
  const [requests, setRequests] = useState<Request[] | null>(null)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    try {
      const res = await fetch(GET_REQUESTS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      })
      const data = await res.json()
      if (res.ok) {
        const parsed = typeof data === "string" ? JSON.parse(data) : data
        setRequests(parsed.requests)
        setStatus("idle")
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  const formatDate = (iso: string) => {
    const d = new Date(iso)
    return d.toLocaleString("ru-RU", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" })
  }

  if (requests === null) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <Icon name="Lock" size={32} className="mx-auto mb-4 text-foreground/40" />
            <h1 className="text-2xl font-medium text-foreground">Админ-панель</h1>
            <p className="text-foreground/50 text-sm mt-2">Введите пароль для доступа</p>
          </div>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoFocus
              className="border border-foreground/20 px-4 py-3 text-sm focus:outline-none focus:border-foreground/60 transition-colors bg-transparent"
            />
            {status === "error" && (
              <p className="text-red-500 text-sm">Неверный пароль</p>
            )}
            <button
              type="submit"
              disabled={status === "loading"}
              className="bg-foreground text-background px-6 py-3 text-sm tracking-wide hover:bg-foreground/90 transition-colors disabled:opacity-60"
            >
              {status === "loading" ? "Проверяем..." : "Войти"}
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-medium text-foreground">Заявки</h1>
            <p className="text-foreground/50 text-sm mt-1">{requests.length} {requests.length === 1 ? "заявка" : requests.length < 5 ? "заявки" : "заявок"}</p>
          </div>
          <button
            onClick={() => { setRequests(null); setPassword("") }}
            className="text-sm text-foreground/40 hover:text-foreground/70 transition-colors flex items-center gap-2"
          >
            <Icon name="LogOut" size={14} />
            Выйти
          </button>
        </div>

        {requests.length === 0 ? (
          <div className="text-center py-24 text-foreground/40">
            <Icon name="Inbox" size={40} className="mx-auto mb-4" />
            <p>Заявок пока нет</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {requests.map((req) => (
              <div key={req.id} className="border border-foreground/10 p-6 hover:border-foreground/20 transition-colors">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <p className="font-medium text-foreground">{req.name}</p>
                    {req.phone && (
                      <a href={`tel:${req.phone}`} className="text-sm text-foreground/60 hover:text-foreground transition-colors">
                        {req.phone}
                      </a>
                    )}
                  </div>
                  <span className="text-xs text-foreground/40 whitespace-nowrap">{formatDate(req.created_at)}</span>
                </div>
                {req.message && (
                  <p className="text-sm text-foreground/70 leading-relaxed">{req.message}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
