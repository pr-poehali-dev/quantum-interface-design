import { useState } from "react"
import { Link } from "react-router-dom"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import Icon from "@/components/ui/icon"

const categories = ["Все", "Столешницы", "Подоконники", "Барные стойки", "Ванные комнаты", "Другое"]

const projects = [
  {
    id: 1,
    title: "Московский метрополитен",
    category: "Другое",
    description: "Изделия из акрилового камня для рабочего места кассира метро",
    location: "Москва, ТПУ Нижегородская",
    year: "2020",
    image: "https://cdn.poehali.dev/projects/3e6dd204-af77-4cb3-9f06-39c580169e0a/bucket/419645c3-a66f-4a38-954a-d1479558e36f.jpeg",
  },
  {
    id: 2,
    title: "Стойка ресепшн для отеля",
    category: "Барные стойки",
    description: "Столешница из кварцевого агломерата",
    location: "Казань, отель Мираж",
    year: "2024",
    image: "https://cdn.poehali.dev/projects/3e6dd204-af77-4cb3-9f06-39c580169e0a/bucket/7b6414be-643e-496b-b4d3-9f9dd968b5ee.jpg",
  },
  {
    id: 3,
    title: "Кухня в частном доме",
    category: "Столешницы",
    description: "Столешница из акрилового камня с интегрированной мойкой и подоконником",
    location: "Казань, ул. Односторонка Гривки",
    year: "2022",
    image: "https://cdn.poehali.dev/projects/3e6dd204-af77-4cb3-9f06-39c580169e0a/bucket/37f32424-ea0d-43b2-8fc5-01bedd1a884e.JPG",
  },
  {
    id: 4,
    title: "Подоконники в квартире",
    category: "Подоконники",
    description: "Подоконники из кварцевого агломерата",
    location: "Москва, Шелепихинская набережная",
    year: "2022",
    image: "https://cdn.poehali.dev/projects/3e6dd204-af77-4cb3-9f06-39c580169e0a/files/185f5e7a-5471-4b8c-92a0-a01d90324271.jpg",
  },
  {
    id: 5,
    title: "Работа появится здесь",
    category: "Столешницы",
    description: "Загрузите фото — и мы добавим вашу работу в портфолио",
    location: "",
    year: "",
    image: "",
  },
  {
    id: 6,
    title: "Работа появится здесь",
    category: "Подоконники",
    description: "Загрузите фото — и мы добавим вашу работу в портфолио",
    location: "",
    year: "",
    image: "",
  },
  {
    id: 7,
    title: "Работа появится здесь",
    category: "Барные стойки",
    description: "Загрузите фото — и мы добавим вашу работу в портфолио",
    location: "",
    year: "",
    image: "",
  },
  {
    id: 8,
    title: "Работа появится здесь",
    category: "Ванные комнаты",
    description: "Загрузите фото — и мы добавим вашу работу в портфолио",
    location: "",
    year: "",
    image: "",
  },
]

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("Все")

  const filtered = activeCategory === "Все"
    ? projects
    : projects.filter((p) => p.category === activeCategory)

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="pt-32 pb-24">
        <div className="container mx-auto px-6 md:px-12">

          <div className="mb-12 md:mb-16">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <Icon name="ArrowLeft" size={14} />
              На главную
            </Link>
            <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-4">Наши работы</p>
            <h1 className="text-4xl md:text-6xl font-medium tracking-tight leading-[1.1]">Портфолио</h1>
          </div>

          <div className="flex flex-wrap gap-2 mb-10 md:mb-14">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-sm border transition-colors duration-200 ${
                  activeCategory === cat
                    ? "bg-foreground text-background border-foreground"
                    : "bg-transparent text-muted-foreground border-border hover:text-foreground hover:border-foreground/40"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filtered.map((project) => (
              <article key={project.id} className="group">
                <div className="relative overflow-hidden aspect-[4/3] mb-4 bg-secondary">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-muted-foreground/40">
                      <Icon name="ImagePlus" size={32} />
                      <span className="text-xs tracking-wide uppercase">Фото скоро</span>
                    </div>
                  )}
                </div>
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="text-base font-medium mb-1">{project.title}</h3>
                    <p className="text-muted-foreground text-sm leading-snug">{project.description}</p>
                    {project.location && (
                      <p className="text-muted-foreground/60 text-xs mt-1">{project.location}</p>
                    )}
                  </div>
                  {project.year && (
                    <span className="text-muted-foreground/50 text-sm shrink-0">{project.year}</span>
                  )}
                </div>
              </article>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-muted-foreground mb-6">Хотите рассчитать изделие?</p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <a
                href="https://t.me/bashpromkzn"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-foreground text-background px-6 py-3 text-sm hover:bg-foreground/90 transition-colors"
              >
                <Icon name="Send" size={14} />
                Написать в Телеграм
              </a>
              <a
                href="mailto:stoleshni@gmail.com"
                className="inline-flex items-center justify-center gap-2 border border-border px-6 py-3 text-sm hover:bg-secondary transition-colors"
              >
                <Icon name="Mail" size={14} />
                Написать на почту
              </a>
              <a
                href="tel:+79172620338"
                className="inline-flex items-center justify-center gap-2 border border-border px-6 py-3 text-sm hover:bg-secondary transition-colors"
              >
                <Icon name="Phone" size={14} />
                +7 (917) 262-03-38
              </a>
              <a
                href="tel:+79178667034"
                className="inline-flex items-center justify-center gap-2 border border-border px-6 py-3 text-sm hover:bg-secondary transition-colors"
              >
                <Icon name="Phone" size={14} />
                +7 (917) 866-70-34
              </a>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  )
}