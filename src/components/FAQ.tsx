import { useState } from "react"
import { Plus } from "lucide-react"

const faqs = [
  {
    question: "Из каких материалов вы изготавливаете изделия?",
    answer:
      "Мы работаем с ведущими брендами искусственного камня и кварцевого агломерата: Grandex, Staron, LG Hi-Macs, Corian, Vicostone, Caesarstone, Radianz, Quantra, Avant, Аварус, Primax и другими. Поможем подобрать оптимальный вариант под ваш бюджет и задачи.",
  },
  {
    question: "Сколько времени занимает изготовление?",
    answer:
      "Стандартные изделия — от 5 до 10 рабочих дней после утверждения замеров и материала. Срочные заказы возможны при наличии материала на складе. Точные сроки уточняем при оформлении заказа.",
  },
  {
    question: "Вы делаете замер и монтаж?",
    answer:
      "Да, работаем под ключ. Наш специалист приезжает на замер, затем мы изготавливаем изделие и доставляем с монтажом. Вам не нужно ничего организовывать самостоятельно.",
  },
  {
    question: "Можно ли сделать нестандартное изделие?",
    answer:
      "Конечно. Мы изготавливаем изделия любой формы и размера — радиусные столешницы, угловые барные стойки, встроенные раковины, ступени и многое другое. Работаем по чертежам или помогаем разработать проект с нуля.",
  },
  {
    question: "Работаете ли вы с дизайнерами интерьера?",
    answer:
      "Да, у нас есть специальные условия для дизайнеров и строительных компаний. Предоставляем образцы, консультируем по материалам и срокам, обеспечиваем точное исполнение проекта.",
  },
  {
    question: "Как оформить заказ?",
    answer:
      "Свяжитесь с нами любым удобным способом — по телефону, в мессенджере или через форму на сайте. Мы обсудим задачу, согласуем замер и подготовим расчёт стоимости.",
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-20 md:py-29">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mb-16">
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Вопросы</p>
          <h2 className="text-6xl font-medium leading-[1.15] tracking-tight mb-6 text-balance lg:text-7xl">
            Частые вопросы
          </h2>
        </div>

        <div>
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-border">
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full py-6 flex items-start justify-between gap-6 text-left group"
              >
                <span className="text-lg font-medium text-foreground transition-colors group-hover:text-foreground/70">
                  {faq.question}
                </span>
                <Plus
                  className={`w-6 h-6 text-foreground flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? "rotate-45" : "rotate-0"
                  }`}
                  strokeWidth={1.5}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-muted-foreground leading-relaxed pb-6 pr-12">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}