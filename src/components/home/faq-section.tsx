"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ChevronDown, HelpCircle } from "lucide-react"

import { Reveal } from "@/components/ui/reveal"
import { cn } from "@/lib/utils"

const faqItems = [
  {
    question: "Which area in Ahmedabad are you located in?",
    answer:
      "We are located on the 1st floor of Sanskrut Galleria, just off Drive-In Road near Subhash Chowk in Gurukul, Ahmedabad. Dedicated private parking is available for all our guests.",
  },
  {
    question: "Do I need to book an appointment in advance?",
    answer:
      "We strongly recommend reserving your treatment session in advance to secure your preferred room and therapist. Walk-ins are welcomed subject to daily schedule availability.",
  },
  {
    question: "Can I customize the pressure and focus areas for my massage?",
    answer:
      "Yes, absolutely. Every session begins with a short personal consultation where you set the pressure level, select your essential oil blend, and specify sore or target areas.",
  },
  {
    question: "What are your operating hours?",
    answer:
      "We are open daily from 10:00 am to 9:00 pm, Monday through Sunday. Last appointment booking starts at 8:00 pm.",
  },
]

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="border-t border-border bg-sand/50 py-20 lg:py-28">
      <div className="shell">
        <div className="flex flex-col gap-16 lg:flex-row lg:items-center lg:gap-16">
          {/* Left Column: FAQ List */}
          <div className="flex flex-col lg:w-[58%]">
            <Reveal>
              <div className="mb-4 flex size-10 items-center justify-center rounded-full bg-accent text-white shadow-xs">
                <HelpCircle className="size-5" />
              </div>
              <span className="eyebrow text-xs uppercase tracking-widest text-muted-foreground">
                Frequently Asked Questions
              </span>
              <h2 className="display mt-3 font-serif text-3xl text-foreground sm:text-4xl lg:text-[2.65rem] lg:leading-[1.18]">
                Common questions about your visit.
              </h2>
            </Reveal>

            <div className="mt-10 flex flex-col gap-4">
              {faqItems.map((item, index) => {
                const isOpen = openIndex === index
                return (
                  <Reveal index={index} key={item.question}>
                    <div
                      className={cn(
                        "rounded-2xl border bg-background/90 p-5 shadow-xs transition-all duration-200 sm:p-6",
                        isOpen
                          ? "border-clay/80 bg-background shadow-sm"
                          : "border-clay/40 hover:border-clay/80",
                      )}
                    >
                      <button
                        type="button"
                        onClick={() => toggleFaq(index)}
                        aria-expanded={isOpen}
                        className="flex w-full items-center justify-between gap-4 text-left"
                      >
                        <span className="font-serif text-lg font-medium text-foreground sm:text-xl">
                          {item.question}
                        </span>
                        <span
                          className={cn(
                            "flex size-8 shrink-0 items-center justify-center rounded-full border border-clay/60 text-accent transition-transform duration-200",
                            isOpen && "rotate-180 bg-accent/10",
                          )}
                        >
                          <ChevronDown className="size-4" />
                        </span>
                      </button>

                      {isOpen && (
                        <div className="mt-4 border-t border-border/60 pt-4 text-sm leading-relaxed text-muted-foreground">
                          <p>{item.answer}</p>
                        </div>
                      )}
                    </div>
                  </Reveal>
                )
              })}
            </div>
          </div>

          {/* Right Column: Arched Image + Floating Callout Box */}
          <div className="relative mx-auto w-full max-w-md lg:w-[42%] lg:max-w-none">
            <Reveal>
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-t-[8rem] rounded-b-2xl border border-clay/40 bg-sand-deep shadow-md">
                <Image
                  src="/images/hero-treatment-room.png"
                  alt="Tranquil treatment room at Dream Spa Gurukul"
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>

              {/* Floating Dark Terracotta Card */}
              <div className="absolute -bottom-6 -right-2 sm:-right-4 w-[85%] max-w-[290px] rounded-2xl bg-accent p-6 text-white shadow-2xl sm:p-8">
                <h3 className="font-serif text-2xl font-medium leading-tight text-white sm:text-3xl">
                  Got A Question? Ask Away
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-white/80">
                  Our front desk is here to help with reservations and
                  inquiries.
                </p>
                <Link
                  href="/contact"
                  className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-white hover:underline"
                >
                  Send A Message <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
