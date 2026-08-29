import Image from "next/image"
import Link from "next/link"
import { MapPin, MessageCircle, Phone } from "lucide-react"

import { primaryNav } from "@/data/navigation"
import { services } from "@/data/services"
import { site } from "@/data/site"

const socialIcons: Record<string, React.ReactNode> = {
  Instagram: (
    <svg
      aria-hidden="true"
      className="size-4.5 fill-none stroke-current stroke-[2]"
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  ),
  Facebook: (
    <svg
      aria-hidden="true"
      className="size-4.5 fill-current"
      viewBox="0 0 24 24"
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  ),
  Google: (
    <svg
      aria-hidden="true"
      className="size-4.5 fill-current"
      viewBox="0 0 24 24"
    >
      <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
    </svg>
  ),
  Justdial: (
    <Image
      src="/JD.svg"
      alt="Justdial"
      width={20}
      height={15}
      className="size-4.5 object-contain opacity-90 transition-opacity hover:opacity-100"
    />
  ),
}

export function SiteFooter() {
  return (
    <footer className="bg-light-red-bg text-light-red-fg">
      <div className="shell py-16 pb-24 lg:py-20">
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
            <div className="mt-7 flex items-center gap-3">
              {site.social.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className="flex size-10 items-center justify-center rounded-full border border-light-red-fg/20 text-light-red-fg/75 transition-all duration-200 hover:border-light-red-fg hover:bg-light-red-fg/10 hover:text-light-red-fg"
                >
                  {socialIcons[item.label] || item.label}
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-12 min-[415px]:grid-cols-2 min-[415px]:gap-x-8 min-[415px]:gap-y-12 sm:grid-cols-3 sm:gap-8 lg:flex lg:gap-24">
            <nav aria-label="Footer" className="flex flex-col gap-4 min-[415px]:col-span-1 sm:col-span-1">
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

            <nav aria-label="Treatments" className="flex flex-col gap-4 min-[415px]:col-span-1 sm:col-span-1">
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

            <div className="flex flex-col gap-4 min-[415px]:col-span-2 sm:col-span-1">
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
