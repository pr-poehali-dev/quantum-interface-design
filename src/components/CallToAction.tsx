import { useState } from "react"
import { HighlightedText } from "./HighlightedText"
import Icon from "@/components/ui/icon"

const SUBMIT_URL = "https://functions.poehali.dev/5dcddfd8-f3ff-4cac-aa7b-49e093572cab"

export function CallToAction() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" })
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    try {
      const res = await fetch(SUBMIT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus("success")
        setForm({ name: "", phone: "", message: "" })
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  return (
    <section id="contact" className="py-32 md:py-29 bg-foreground text-primary-foreground">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-primary-foreground/60 text-sm tracking-[0.3em] uppercase mb-8">Оставить заявку</p>

          <h2 className="text-2xl md:text-4xl lg:text-6xl font-medium leading-[1.1] tracking-tight mb-6 md:mb-8 text-balance">
            Создадим изделие
            <br />
            вашей <HighlightedText>мечты</HighlightedText>
          </h2>

          <p className="text-primary-foreground/70 text-base md:text-xl leading-relaxed mb-8 md:mb-12 max-w-2xl mx-auto">
            Расскажите о вашем проекте — мы бесплатно проконсультируем, подберём материал и рассчитаем стоимость.
          </p>

          {status === "success" ? (
            <div className="max-w-md mx-auto flex flex-col items-center gap-4 py-8">
              <Icon name="CheckCircle" size={48} className="text-primary-foreground/80" />
              <p className="text-xl font-medium">Заявка отправлена!</p>
              <p className="text-primary-foreground/60">Мы свяжемся с вами в ближайшее время.</p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-2 text-sm text-primary-foreground/50 hover:text-primary-foreground/80 underline transition-colors"
              >
                Отправить ещё одну
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto flex flex-col gap-4 text-left">
              <input
                type="text"
                placeholder="Ваше имя *"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="bg-transparent border border-primary-foreground/30 px-5 py-4 text-sm text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:border-primary-foreground/70 transition-colors"
              />
              <input
                type="tel"
                placeholder="Телефон"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="bg-transparent border border-primary-foreground/30 px-5 py-4 text-sm text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:border-primary-foreground/70 transition-colors"
              />
              <textarea
                placeholder="Опишите ваш проект"
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="bg-transparent border border-primary-foreground/30 px-5 py-4 text-sm text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:border-primary-foreground/70 transition-colors resize-none"
              />
              {status === "error" && (
                <p className="text-red-400 text-sm">Ошибка отправки. Попробуйте ещё раз.</p>
              )}
              <button
                type="submit"
                disabled={status === "loading"}
                className="inline-flex items-center justify-center gap-3 bg-primary-foreground text-foreground px-8 py-4 text-sm tracking-wide hover:bg-primary-foreground/90 transition-colors duration-300 disabled:opacity-60"
              >
                {status === "loading" ? "Отправляем..." : "Отправить заявку"}
                {status !== "loading" && <Icon name="ArrowRight" size={16} />}
              </button>
              <div className="flex flex-col sm:flex-row gap-3 mt-2">
                <a
                  href="https://t.me/bashpromkzn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border border-primary-foreground/30 px-6 py-3 text-sm tracking-wide hover:bg-primary-foreground/10 transition-colors duration-300"
                >
                  <Icon name="Send" size={14} />
                  Написать в Телеграм
                </a>
                <a
                  href="mailto:stoleshni@gmail.com"
                  className="inline-flex items-center justify-center gap-2 border border-primary-foreground/30 px-6 py-3 text-sm tracking-wide hover:bg-primary-foreground/10 transition-colors duration-300"
                >
                  <Icon name="Mail" size={14} />
                  Написать на почту
                </a>
                <a
                  href="tel:+79172620338"
                  className="inline-flex items-center justify-center gap-2 border border-primary-foreground/30 px-6 py-3 text-sm tracking-wide hover:bg-primary-foreground/10 transition-colors duration-300"
                >
                  <Icon name="Phone" size={14} />
                  +7 (917) 262-03-38
                </a>
                <a
                  href="tel:+79178667034"
                  className="inline-flex items-center justify-center gap-2 border border-primary-foreground/30 px-6 py-3 text-sm tracking-wide hover:bg-primary-foreground/10 transition-colors duration-300"
                >
                  <Icon name="Phone" size={14} />
                  +7 (917) 866-70-34
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}