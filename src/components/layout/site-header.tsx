"use client"

import Image from "next/image"
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
  const isTransparentHeader = !scrolled && !open

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300 ease-in-out",
        isHeaderVisible
          ? "translate-y-0 opacity-100"
          : "-translate-y-full opacity-0 pointer-events-none",
        open
          ? "bg-background border-b border-border shadow-md"
          : scrolled
            ? "border-b border-border/60 bg-background/85 backdrop-blur-md shadow-sm"
            : "border-b border-transparent bg-transparent shadow-none",
      )}
    >
      <div className="shell flex h-20 items-center justify-between gap-6 lg:h-24">
        <Logo tone={open ? "ink" : isTransparentHeader && pathname === "/" ? "light" : "ink"} />

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
                      "relative flex items-center gap-1.5 py-1 text-[0.8125rem] tracking-[0.06em] uppercase font-medium transition-colors",
                      isActive(link.href) || dropdownOpen
                        ? "text-foreground font-semibold"
                        : "text-foreground/90 hover:text-foreground",
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
                      className="absolute top-full left-1/2 z-50 mt-3 w-[840px] -translate-x-1/2 rounded-2xl border border-clay/60 bg-background p-7 shadow-2xl transition-all duration-200 text-foreground"
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      {/* Top Header */}
                      <div className="mb-6 flex items-center justify-between border-b border-border/80 pb-4">
                        <div className="flex items-center gap-3">
                          <span className="size-2 rounded-full bg-accent" />
                          <span className="eyebrow text-xs font-semibold text-foreground/80 uppercase tracking-widest">
                            Treatment Menu
                          </span>
                          <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-[11px] font-medium text-accent">
                            9 Signature Services
                          </span>
                        </div>
                        <Link
                          href="/services"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-1.5 text-xs font-semibold text-accent transition-colors hover:text-accent/80"
                        >
                          Explore All Services <ArrowRight className="size-3.5" />
                        </Link>
                      </div>

                      {/* 4 Columns Grid: 3 Category Lists + 1 Featured Card */}
                      <div className="grid grid-cols-4 gap-7 text-left">
                        {/* Col 1: Massage Therapies */}
                        <div className="flex flex-col gap-3">
                          <Link
                            href="/services#massage-therapies"
                            onClick={() => setDropdownOpen(false)}
                            className="eyebrow text-[0.725rem] font-bold text-accent uppercase tracking-wider transition-colors hover:underline"
                          >
                            Massage Therapies
                          </Link>
                          <ul className="flex flex-col gap-1">
                            {servicesByCategory("massage-therapies").map((service) => (
                              <li key={service.slug}>
                                <Link
                                  href={`/services/${service.slug}`}
                                  onClick={() => setDropdownOpen(false)}
                                  className="group flex flex-col rounded-lg p-2 transition-all duration-200 hover:bg-accent/8 hover:translate-x-0.5"
                                >
                                  <span className="text-[0.8125rem] font-medium text-foreground transition-colors group-hover:text-accent">
                                    {service.name}
                                  </span>
                                  <span className="text-[10px] text-muted-foreground mt-0.5">
                                    {service.duration}
                                  </span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Col 2: Wellness & Couples */}
                        <div className="flex flex-col gap-5">
                          <div className="flex flex-col gap-3">
                            <Link
                              href="/services#wellness-rituals"
                              onClick={() => setDropdownOpen(false)}
                              className="eyebrow text-[0.725rem] font-bold text-accent uppercase tracking-wider transition-colors hover:underline"
                            >
                              Wellness Rituals
                            </Link>
                            <ul className="flex flex-col gap-1">
                              {servicesByCategory("wellness-rituals").map((service) => (
                                <li key={service.slug}>
                                  <Link
                                    href={`/services/${service.slug}`}
                                    onClick={() => setDropdownOpen(false)}
                                    className="group flex flex-col rounded-lg p-2 transition-all duration-200 hover:bg-accent/8 hover:translate-x-0.5"
                                  >
                                    <span className="text-[0.8125rem] font-medium text-foreground transition-colors group-hover:text-accent">
                                      {service.name}
                                    </span>
                                    <span className="text-[10px] text-muted-foreground mt-0.5">
                                      {service.duration}
                                    </span>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="flex flex-col gap-3 border-t border-border/60 pt-4">
                            <Link
                              href="/services#couple-experiences"
                              onClick={() => setDropdownOpen(false)}
                              className="eyebrow text-[0.725rem] font-bold text-accent uppercase tracking-wider transition-colors hover:underline"
                            >
                              Couple Experiences
                            </Link>
                            <ul className="flex flex-col gap-1">
                              {servicesByCategory("couple-experiences").map((service) => (
                                <li key={service.slug}>
                                  <Link
                                    href={`/services/${service.slug}`}
                                    onClick={() => setDropdownOpen(false)}
                                    className="group flex flex-col rounded-lg p-2 transition-all duration-200 hover:bg-accent/8 hover:translate-x-0.5"
                                  >
                                    <span className="text-[0.8125rem] font-medium text-foreground transition-colors group-hover:text-accent">
                                      {service.name}
                                    </span>
                                    <span className="text-[10px] text-muted-foreground mt-0.5">
                                      {service.duration}
                                    </span>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Col 3: Beauty & Skin */}
                        <div className="flex flex-col gap-3">
                          <Link
                            href="/services#beauty-and-skin"
                            onClick={() => setDropdownOpen(false)}
                            className="eyebrow text-[0.725rem] font-bold text-accent uppercase tracking-wider transition-colors hover:underline"
                          >
                            Beauty &amp; Skin
                          </Link>
                          <ul className="flex flex-col gap-1">
                            {servicesByCategory("beauty-and-skin").map((service) => (
                              <li key={service.slug}>
                                <Link
                                  href={`/services/${service.slug}`}
                                  onClick={() => setDropdownOpen(false)}
                                  className="group flex flex-col rounded-lg p-2 transition-all duration-200 hover:bg-accent/8 hover:translate-x-0.5"
                                >
                                  <span className="text-[0.8125rem] font-medium text-foreground transition-colors group-hover:text-accent">
                                    {service.name}
                                  </span>
                                  <span className="text-[10px] text-muted-foreground mt-0.5">
                                    {service.duration}
                                  </span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Col 4: Featured Treatment Card */}
                        <div className="flex flex-col rounded-xl border border-clay/40 bg-sand/60 p-3.5 text-left">
                          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-sand-deep">
                            <Image
                              src="/images/services/signature-body-massage.png"
                              alt="Signature Body Massage"
                              fill
                              className="object-cover"
                            />
                            <span className="absolute top-2 left-2 rounded-full bg-accent px-2 py-0.5 text-[9px] font-semibold text-accent-foreground uppercase tracking-wider">
                              Most Popular
                            </span>
                          </div>
                          <div className="mt-3 flex flex-col gap-1">
                            <h4 className="font-serif text-sm font-semibold text-foreground">
                              Signature Body Massage
                            </h4>
                            <p className="text-[11px] leading-relaxed text-muted-foreground line-clamp-2">
                              Read your tension first and set the pressure to match your body.
                            </p>
                            <Link
                              href="/services/signature-body-massage"
                              onClick={() => setDropdownOpen(false)}
                              className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-accent transition-colors hover:underline"
                            >
                              Learn More <ArrowRight className="size-3" />
                            </Link>
                          </div>
                        </div>
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
                  "relative py-1 text-[0.8125rem] tracking-[0.06em] uppercase font-medium transition-colors",
                  isActive(link.href)
                    ? "text-foreground font-semibold"
                    : "text-foreground/90 hover:text-foreground",
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
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "rounded-none bg-white text-foreground hover:bg-white/90 shadow-sm",
            )}
          >
            <Phone className="size-3.5" aria-hidden="true" />
            {site.phone.display}
          </a>
          <Link
            href="/contact"
            className={cn(buttonVariants({ variant: "primary", size: "sm" }), "rounded-none")}
          >
            Book a session
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className={cn(
            "-mr-2 flex size-10 items-center justify-center lg:hidden relative z-50 transition-colors",
            open ? "text-foreground" : isTransparentHeader ? "text-white" : "text-foreground",
          )}
        >
          {open ? (
            <X className="size-6" aria-hidden="true" />
          ) : (
            <Menu className="size-6" aria-hidden="true" />
          )}
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        </button>
      </div>

      {/* Mobile Full-Screen Overlay Panel */}
      {open && (
        <div
          id="mobile-nav"
          className="fixed inset-0 top-0 z-40 min-h-screen w-full flex flex-col justify-between overflow-y-auto bg-[#FAF7F2] px-6 pt-24 pb-12 text-foreground lg:hidden shadow-2xl"
        >
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <span className="eyebrow text-xs font-semibold uppercase tracking-widest text-accent">
                Navigation Menu
              </span>
              <span className="text-xs text-muted-foreground font-medium">
                Dream Spa Ahmedabad
              </span>
            </div>

            <nav aria-label="Mobile" className="flex flex-col">
              {primaryNav.map((link, index) => {
                const isServices = link.href === "/services"

                if (isServices) {
                  return (
                    <div key={link.href} className="border-b border-border/80 py-4">
                      <div className="flex items-center justify-between">
                        <Link
                          href={link.href}
                          className="display font-serif text-3xl font-medium text-foreground"
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
                              "size-6 transition-transform duration-200",
                              mobileServicesOpen && "rotate-180 text-accent",
                            )}
                          />
                        </button>
                      </div>

                      {mobileServicesOpen && (
                        <div className="mt-4 flex flex-col gap-6 pl-2">
                          <Link
                            href="/services"
                            onClick={() => setOpen(false)}
                            className="flex items-center gap-1.5 text-xs font-semibold text-accent uppercase tracking-wider"
                          >
                            Explore All Services <ArrowRight className="size-3.5" />
                          </Link>

                          {serviceCategories.map((category) => {
                            const categoryServices = servicesByCategory(
                              category.slug,
                            )
                            return (
                              <div key={category.slug} className="flex flex-col gap-2.5">
                                <span className="eyebrow text-[0.75rem] font-bold uppercase tracking-wider text-accent">
                                  {category.name}
                                </span>
                                <div className="flex flex-col gap-2 border-l-2 border-accent/30 pl-3">
                                  {categoryServices.map((service) => (
                                    <Link
                                      key={service.slug}
                                      href={`/services/${service.slug}`}
                                      onClick={() => setOpen(false)}
                                      className="flex items-center justify-between text-sm font-medium text-foreground transition-colors hover:text-accent"
                                    >
                                      <span>{service.name}</span>
                                      <span className="text-[11px] font-normal text-muted-foreground">
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
                    onClick={() => setOpen(false)}
                    className="flex items-baseline justify-between border-b border-border/80 py-5"
                  >
                    <span className="display font-serif text-3xl font-medium text-foreground">
                      {link.label}
                    </span>
                    <span className="eyebrow text-xs font-medium text-muted-foreground">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </Link>
                )
              })}
            </nav>
          </div>

          <div className="mt-10 flex flex-col gap-3.5 border-t border-border pt-6">
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className={cn(
                buttonVariants({ variant: "primary", size: "lg" }),
                "h-12 justify-center rounded-none text-xs font-semibold uppercase tracking-widest",
              )}
            >
              Book a session
            </Link>
            <a
              href={site.phone.href}
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-12 justify-center rounded-none border-border-strong bg-white text-xs font-semibold uppercase tracking-widest text-foreground shadow-sm hover:bg-white/90",
              )}
            >
              <Phone className="size-4" aria-hidden="true" />
              {site.phone.display}
            </a>
          </div>
        </div>
      )}
    </header>
  )
}


