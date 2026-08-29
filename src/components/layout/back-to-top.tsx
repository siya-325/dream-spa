"use client"

import { useEffect, useState } from "react"
import { ArrowUp } from "lucide-react"

import { cn } from "@/lib/utils"

export function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 350)
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll back to top"
      className={cn(
        "fixed bottom-6 right-4 z-40 flex size-11 items-center justify-center rounded-full bg-foreground text-background shadow-xl transition-all duration-300 hover:scale-110 hover:bg-accent hover:text-white active:scale-95 sm:right-6",
        visible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0",
      )}
    >
      <ArrowUp className="size-5" />
      <span className="sr-only">Back to top</span>
    </button>
  )
}
