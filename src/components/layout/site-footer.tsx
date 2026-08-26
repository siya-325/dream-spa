import Image from "next/image"
import Link from "next/link"
import { MapPin, MessageCircle, Phone } from "lucide-react"

import { primaryNav } from "@/data/navigation"
import { services } from "@/data/services"
import { site } from "@/data/site"

export function SiteFooter() {
  return (
    <footer className="bg-light-red-bg text-light-red-fg">
      <div className="shell py-16 lg:py-20">
        <div className="flex flex-col gap-14 lg:flex-row lg:justify-between">
          <div className="max-w-sm">
            <Image
              src="/images/logo-lockup-white.svg"
              alt={`${site.name} logo`}
              width={231}
              height={152}
              className="h-20 w-auto"
            />
            <p className="mt-6 text-sm leading-relaxed text-light-red-fg/70">
              A quiet beauty and wellness spa in Gurukul, Ahmedabad. Personalised
              therapies, trained therapists, private rooms.
            </p>
            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2">
              {site.social.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="eyebrow text-light-red-fg/60 transition-colors hover:text-light-red-fg"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-12 sm:flex-row sm:gap-16 lg:gap-24">
            <nav aria-label="Footer" className="flex flex-col gap-4">
              <h2 className="eyebrow text-light-red-fg/50">Explore</h2>
              {primaryNav.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-light-red-fg/80 transition-colors hover:text-light-red-fg"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <nav aria-label="Treatments" className="flex flex-col gap-4">
              <h2 className="eyebrow text-light-red-fg/50">Treatments</h2>
              {services.slice(0, 6).map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="text-sm text-light-red-fg/80 transition-colors hover:text-light-red-fg"
                >
                  {service.name}
                </Link>
              ))}
            </nav>

            <div className="flex flex-col gap-4">
              <h2 className="eyebrow text-light-red-fg/50">Visit</h2>
              <address className="flex items-start gap-3 text-sm leading-relaxed text-light-red-fg/80 not-italic">
                <MapPin
                  className="mt-0.5 size-4 shrink-0 text-light-red-fg/50"
                  aria-hidden="true"
                />
                <span>
                  {site.address.line1}
                  <br />
                  {site.address.line2}
                  <br />
                  {site.address.area}
                  <br />
                  {site.address.city} {site.address.pincode}
                </span>
              </address>
              <a
                href={site.phone.href}
                className="flex items-center gap-3 text-sm text-light-red-fg/80 transition-colors hover:text-light-red-fg"
              >
                <Phone
                  className="size-4 text-light-red-fg/50"
                  aria-hidden="true"
                />
                {site.phone.display}
              </a>
              <a
                href={site.phone.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-light-red-fg/80 transition-colors hover:text-light-red-fg"
              >
                <MessageCircle
                  className="size-4 text-light-red-fg/50"
                  aria-hidden="true"
                />
                WhatsApp
              </a>
              <div className="mt-2 flex flex-col gap-1">
                {site.hours.map((entry) => (
                  <p
                    key={entry.days}
                    className="text-sm text-light-red-fg/60"
                  >
                    {entry.days} · {entry.time}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-light-red-fg/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-light-red-fg/50">
            © {new Date().getFullYear()} {site.name}, Ahmedabad. All rights
            reserved.
          </p>
          <p className="text-xs text-light-red-fg/50">
            {site.hoursNote}
          </p>
        </div>
      </div>
    </footer>
  )
}
