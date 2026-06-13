import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { Header } from "../components/Header"
import { Hero } from "../components/Hero"
import { Philosophy } from "../components/Philosophy"
import { Projects } from "../components/Projects"
import { Expertise } from "../components/Expertise"
import { FAQ } from "../components/FAQ"
import { CallToAction } from "../components/CallToAction"
import { Footer } from "../components/Footer"

export default function Index() {
  const { hash } = useLocation()

  useEffect(() => {
    if (!hash) return
    const id = hash.replace("#", "")
    const el = document.getElementById(id)
    if (el) {
      setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 100)
    }
  }, [hash])

  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Expertise />
      <Projects />
      <Philosophy />
      <FAQ />
      <CallToAction />
      <Footer />
    </main>
  )
}