"use client"

import * as motion from "motion/react-client"
import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

type RevealProps = {
  children: ReactNode
  className?: string
  /** Stagger index — each step adds 70ms. */
  index?: number
  as?: "div" | "li" | "section" | "figure"
}

/**
 * Single, restrained entrance: a short rise and fade as the element enters view.
 * Respects reduced-motion via the global CSS override.
 */
export function Reveal({
  children,
  className,
  index = 0,
  as = "div",
}: RevealProps) {
  const Component = motion[as]

  return (
    <Component
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.07,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn(className)}
    >
      {children}
    </Component>
  )
}
