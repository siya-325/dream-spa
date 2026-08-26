"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { ArrowRight, ChevronDown, Menu, Phone, X } from "lucide-react"

import { Logo } from "@/components/brand/logo"
import { buttonVariants } from "@/components/ui/button"
import { primaryNav } from "@/data/navigation"
import { serviceCategories, servicesByCategory } from "@/data/services"
import { site } from "@/data/site"
import { cn } from "@/lib/utils"

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [visible, setVisible] = useState(true)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(true)

  const lastScrollY = useRef(0)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = Math.max(0, window.scrollY)
      const previousScrollY = lastScrollY.current
      const delta = currentScrollY - previousScrollY

      // Always visible when near the top of the page
      if (currentScrollY <= 20) {
        setScrolled(false)
        setVisible(true)
      } else {
        setScrolled(true)
        // Scroll threshold of 8px to prevent jitter from minor touch movements
        if (delta > 8 && !open) {
          setVisible(false)
          setDropdownOpen(false)
        } else if (delta < -8) {
          setVisible(true)
        }
      }

      lastScrollY.current = currentScrollY
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [open])

  useEffect(() => {
    setOpen(false)
    setDropdownOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setDropdownOpen(true)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setDropdownOpen(false)
    }, 150)
  }

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href)

  // Always keep header visible if mobile menu is open
  const isHeaderVisible = visible || open

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300 ease-in-out",
        isHeaderVisible
          ? "translate-y-0 opacity-100"
          : "-translate-y-full opacity-0 pointer-events-none",
        scrolled
          ? "border-b border-border/60 bg-background/85 backdrop-blur-md shadow-sm"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="shell flex h-20 items-center justify-between gap-6 lg:h-24">
        <Logo />

        <nav aria-label="Primary" className="hidden items-center gap-9 lg:flex">
          {primaryNav.map((link) => {
            const isServices = link.href === "/services"

            if (isServices) {
              return (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    href={link.href}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    aria-expanded={dropdownOpen}
                    aria-haspopup="true"
                    className={cn(
                      "relative flex items-center gap-1.5 py-1 text-[0.8125rem] tracking-[0.06em] uppercase transition-colors",
                      isActive(link.href) || dropdownOpen
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {link.label}
                    <ChevronDown
                      className={cn(
                        "size-3.5 transition-transform duration-200",
                        dropdownOpen && "rotate-180 text-accent",
                      )}
                    />
                    {isActive(link.href) && (
                      <span
                        aria-hidden="true"
                        className="absolute -bottom-0.5 left-0 h-px w-full bg-accent"
                      />
                    )}
                  </Link>

                  {/* Mega Dropdown */}
                  {dropdownOpen && (
                    <div
                      className="absolute top-full left-1/2 z-50 mt-2 w-[760px] -translate-x-1/2 rounded-2xl border border-border/80 bg-background/95 p-6 shadow-2xl backdrop-blur-xl transition-all duration-200"
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      {/* Top Header */}
                      <div className="mb-5 flex items-center justify-between border-b border-border pb-3.5">
                        <div className="flex items-center gap-2">
                          <span className="size-1.5 rounded-full bg-accent" />
                          <span className="eyebrow text-xs text-muted-foreground uppercase tracking-wider">
                            Treatment Menu
                          </span>
                        </div>
                        <Link
                          href="/services"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-1.5 text-xs font-medium text-accent transition-colors hover:text-accent/80"
                        >
                          Explore All Services <ArrowRight className="size-3.5" />
                        </Link>
                      </div>

                      {/* 4 Category Columns Grid */}
                      <div className="grid grid-cols-4 gap-6 text-left">
                        {serviceCategories.map((category) => {
                          const categoryServices = servicesByCategory(
                            category.slug,
                          )
                          return (
                            <div key={category.slug} className="flex flex-col gap-2">
                              <Link
                                href={`/services#${category.slug}`}
                                onClick={() => setDropdownOpen(false)}
                                className="eyebrow text-[0.725rem] font-semibold text-accent uppercase tracking-wider transition-colors hover:underline"
                              >
                                {category.name}
                              </Link>
                              <ul className="flex flex-col gap-0.5">
                                {categoryServices.map((service) => (
                                  <li key={service.slug}>
                                    <Link
                                      href={`/services/${service.slug}`}
                                      onClick={() => setDropdownOpen(false)}
                                      className="group/item flex flex-col rounded-md p-1.5 transition-colors hover:bg-accent/10"
                                    >
                                      <span className="text-[0.8125rem] font-medium text-foreground transition-colors group-hover/item:text-accent">
                                        {service.name}
                                      </span>
                                      <span className="text-[10px] text-muted-foreground">
                                        {service.duration}
                                      </span>
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )
            }

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={cn(
                  "relative py-1 text-[0.8125rem] tracking-[0.06em] uppercase transition-colors",
                  isActive(link.href)
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {link.label}
                {isActive(link.href) && (
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-0.5 left-0 h-px w-full bg-accent"
                  />
                )}
              </Link>
            )
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={site.phone.href}
            className="flex items-center gap-2 text-[0.8125rem] tracking-[0.04em] text-muted-foreground transition-colors hover:text-foreground"
          >
            <Phone className="size-3.5" aria-hidden="true" />
            {site.phone.display}
          </a>
          <Link
            href="/contact"
            className={cn(buttonVariants({ variant: "primary", size: "sm" }))}
          >
            Book a session
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="-mr-2 flex size-10 items-center justify-center text-foreground lg:hidden"
        >
          {open ? (
            <X className="size-5" aria-hidden="true" />
          ) : (
            <Menu className="size-5" aria-hidden="true" />
          )}
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        </button>
      </div>

      {/* Mobile panel */}
      <div
        id="mobile-nav"
        hidden={!open}
        className="fixed inset-x-0 top-20 bottom-0 z-50 flex flex-col justify-between overflow-y-auto border-t border-border bg-background px-5 pt-6 pb-10 lg:hidden"
      >
        <nav aria-label="Mobile" className="flex flex-col">
          {primaryNav.map((link, index) => {
            const isServices = link.href === "/services"

            if (isServices) {
              return (
                <div key={link.href} className="border-b border-border py-4">
                  <div className="flex items-center justify-between">
                    <Link
                      href={link.href}
                      className="display text-2xl"
                      onClick={() => setOpen(false)}
                    >
                      {link.label}
                    </Link>
                    <button
                      type="button"
                      onClick={() => setMobileServicesOpen((prev) => !prev)}
                      aria-expanded={mobileServicesOpen}
                      className="p-2 text-muted-foreground hover:text-foreground"
                    >
                      <ChevronDown
                        className={cn(
                          "size-5 transition-transform duration-200",
                          mobileServicesOpen && "rotate-180 text-accent",
                        )}
                      />
                    </button>
                  </div>

                  {mobileServicesOpen && (
                    <div className="mt-4 flex flex-col gap-5 pl-2">
                      <Link
                        href="/services"
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-1.5 text-xs font-semibold text-accent uppercase tracking-wider"
                      >
                        All Services <ArrowRight className="size-3.5" />
                      </Link>

                      {serviceCategories.map((category) => {
                        const categoryServices = servicesByCategory(
                          category.slug,
                        )
                        return (
                          <div key={category.slug} className="flex flex-col gap-2">
                            <span className="eyebrow text-[0.7rem] text-muted-foreground uppercase tracking-wider">
                              {category.name}
                            </span>
                            <div className="flex flex-col gap-2 border-l-2 border-border/80 pl-3">
                              {categoryServices.map((service) => (
                                <Link
                                  key={service.slug}
                                  href={`/services/${service.slug}`}
                                  onClick={() => setOpen(false)}
                                  className="flex items-center justify-between text-sm font-medium text-foreground transition-colors hover:text-accent"
                                >
                                  <span>{service.name}</span>
                                  <span className="text-[11px] text-muted-foreground font-normal">
                                    {service.duration}
                                  </span>
                                </Link>
                              ))}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            }

            return (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-baseline justify-between border-b border-border py-5"
              >
                <span className="display text-2xl">{link.label}</span>
                <span className="eyebrow text-muted-foreground">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </Link>
            )
          })}
        </nav>

        <div className="mt-8 flex flex-col gap-3">
          <Link
            href="/contact"
            className={cn(buttonVariants({ variant: "primary", size: "lg" }))}
          >
            Book a session
          </Link>
          <a
            href={site.phone.href}
            className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
          >
            <Phone aria-hidden="true" />
            {site.phone.display}
          </a>
        </div>
      </div>
    </header>
  )
}


