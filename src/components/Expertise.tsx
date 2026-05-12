import { useEffect, useRef, useState } from "react"
import { HighlightedText } from "./HighlightedText"
import Icon from "@/components/ui/icon"

const expertiseAreas = [
  {
    title: "Столешницы",
    description: "Кухонные и барные столешницы, островки любой формы и размера, стеновые панели, а так же мойки и прочие аксессуары",
    icon: "ChefHat",
  },
  {
    title: "Подоконники",
    description:
      "Подоконники, которые легко моются и не теряют внешний вид с течением времени. Идеальная замена пластику или дереву в любом интерьере",
    icon: "Minus",
  },
  {
    title: "Барные стойки",
    description:
      "Стильные барные стойки для кухни, кафе или ресторана. Создаём под любой размер и дизайн — от классики до модерна.",
    icon: "GlassWater",
  },
  {
    title: "Изделия на заказ",
    description:
      "Подоконные полки, ступени, раковины, панели для ванной — изготовим любое изделие по вашим эскизам или идее.",
    icon: "Layers",
  },
]

export function Expertise() {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const sectionRef = useRef<HTMLElement>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index"))
          if (entry.isIntersecting) {
            setVisibleItems((prev) => [...new Set([...prev, index])])
          }
        })
      },
      { threshold: 0.2 },
    )

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="services" ref={sectionRef} className="py-32 md:py-29">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mb-20">
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Наши изделия</p>
          <h2 className="text-6xl font-medium leading-[1.15] tracking-tight mb-6 text-balance lg:text-8xl">
            Изготовим <HighlightedText>индивидуально</HighlightedText>
            <br />
            для Вашего интерьера
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            из кварцевого агломерата или искусственного акрилового камня
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
          {expertiseAreas.map((area, index) => (
            <div
              key={area.title}
              ref={(el) => {
                itemRefs.current[index] = el
              }}
              data-index={index}
              className={`relative pl-8 border-l border-border transition-all duration-700 ${
                visibleItems.includes(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div
                className={`transition-all duration-1000 ${
                  visibleItems.includes(index) ? "animate-draw-stroke" : ""
                }`}
                style={{
                  transitionDelay: `${index * 150}ms`,
                }}
              >
                <Icon name={area.icon} size={40} className="mb-4 text-foreground" />
              </div>
              <h3 className="text-xl font-medium mb-4">{area.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{area.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}