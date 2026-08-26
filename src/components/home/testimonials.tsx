"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import * as motion from "motion/react-client"

import { Reveal } from "@/components/ui/reveal"
import { testimonials } from "@/data/testimonials"
import { cn } from "@/lib/utils"

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
  }

  const current = testimonials[currentIndex]

  return (
    <section className="bg-sand py-20 lg:py-28">
      <div className="shell">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 lg:items-center">
          {/* Left Column: Heading, Description & Desktop Nav Controls */}
          <div className="flex flex-col justify-between lg:col-span-5">
            <Reveal>
              <div>
                <span className="eyebrow flex items-center gap-3 text-xs text-muted-foreground uppercase tracking-wider">
                  <span aria-hidden="true" className="h-px w-8 bg-accent" />
                  In their words
                </span>
                <h2 className="display mt-5 text-balance text-3xl sm:text-4xl lg:text-[2.5rem] lg:leading-[1.2]">
                  What guests tell us afterwards.
                </h2>
                <p className="mt-4 text-pretty max-w-sm text-sm leading-relaxed text-muted-foreground">
                  A small reflection of what happens when you make room for yourself.
                </p>
              </div>
            </Reveal>

            {/* Desktop Navigation Buttons */}
            <Reveal className="mt-10 hidden items-center gap-3 lg:flex">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous testimonial"
                className="flex size-11 items-center justify-center rounded border border-border/70 text-foreground transition-all hover:border-accent hover:bg-accent hover:text-white active:scale-95"
              >
                <ChevronLeft className="size-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next testimonial"
                className="flex size-11 items-center justify-center rounded border border-border/70 text-foreground transition-all hover:border-accent hover:bg-accent hover:text-white active:scale-95"
              >
                <ChevronRight className="size-4" />
              </button>
            </Reveal>
          </div>

          {/* Right Column: Single Active Testimonial Card */}
          <div className="flex flex-col justify-center lg:col-span-7">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="flex min-h-[340px] flex-col justify-between text-left sm:min-h-[300px] lg:min-h-[330px] max-lg:items-center max-lg:text-center"
            >
              {/* Top Header: Quote Symbol (Left) & Star Rating (Right) */}
              <div className="flex w-full items-center justify-between">
                <span
                  aria-hidden="true"
                  className="display mb-1 text-5xl text-accent/60 select-none sm:text-6xl"
                >
                  “
                </span>
                <div
                  className="flex items-center gap-1"
                  aria-label={`${current.rating} out of 5 stars`}
                >
                  {Array.from({ length: 5 }).map((_, i) => {
                    const isFull = i < Math.floor(current.rating)
                    const isHalf =
                      i === Math.floor(current.rating) &&
                      current.rating % 1 !== 0

                    if (isFull) {
                      return (
                        <Star
                          key={i}
                          className="size-3.5 fill-accent text-accent transition-colors"
                          aria-hidden="true"
                        />
                      )
                    }

                    if (isHalf) {
                      return (
                        <div key={i} className="relative size-3.5" aria-hidden="true">
                          {/* Base star with solid white fill */}
                          <Star className="absolute inset-0 size-3.5 fill-white text-accent" />
                          {/* Left half overlay with accent fill */}
                          <div className="absolute inset-0 w-[50%] overflow-hidden">
                            <Star className="size-3.5 fill-accent text-accent" />
                          </div>
                        </div>
                      )
                    }

                    return (
                      <Star
                        key={i}
                        className="size-3.5 fill-white text-accent transition-colors"
                        aria-hidden="true"
                      />
                    )
                  })}
                </div>
              </div>

              {/* Quote text */}
              <blockquote className="flex flex-1 items-center py-2">
                <p className="display text-pretty font-thin text-2xl text-foreground sm:text-3xl lg:text-[2.35rem] lg:leading-[1.28]">
                  {current.quote}
                </p>
              </blockquote>

              {/* Author & Details */}
              <figcaption className="mt-4 flex flex-col gap-1 max-lg:items-center">
                <div className="flex items-center gap-3">
                  <span aria-hidden="true" className="h-px w-8 bg-accent" />
                  <span className="text-base font-semibold text-foreground">
                    {current.name}
                  </span>
                </div>
                <span className="eyebrow text-xs text-muted-foreground uppercase tracking-widest pl-11 max-lg:pl-0">
                  {current.context}
                </span>
              </figcaption>
            </motion.div>
          </div>
        </div>

        {/* Mobile / Small Screens Navigation Controls (Centered at bottom) */}
        <div className="mt-12 flex items-center justify-center gap-4 border-t border-border/50 pt-6 lg:hidden">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous testimonial"
            className="flex size-11 items-center justify-center rounded border border-border/70 text-foreground transition-all hover:border-accent hover:bg-accent hover:text-white active:scale-95"
          >
            <ChevronLeft className="size-4" />
          </button>
          <span className="eyebrow text-xs text-muted-foreground min-w-[50px] text-center">
            {currentIndex + 1} / {testimonials.length}
          </span>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next testimonial"
            className="flex size-11 items-center justify-center rounded border border-border/70 text-foreground transition-all hover:border-accent hover:bg-accent hover:text-white active:scale-95"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>
    </section>
  )
}

