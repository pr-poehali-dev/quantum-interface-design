import { HighlightedText } from "./HighlightedText"
import Icon from "@/components/ui/icon"

export function CallToAction() {
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

          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3">
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
        </div>
      </div>
    </section>
  )
}
