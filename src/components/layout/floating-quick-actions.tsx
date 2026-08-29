import { MessageCircle, Phone } from "lucide-react"

import { site } from "@/data/site"

export function FloatingQuickActions() {
  return (
    <aside
      aria-label="Quick Contact Actions"
      className="fixed left-3 sm:left-5 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-3"
    >
      {/* WhatsApp Button */}
      <a
        href={site.phone.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="group relative flex size-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl active:scale-95"
      >
        <MessageCircle className="size-6 fill-current stroke-none" />
        <span className="pointer-events-none absolute left-full ml-3 -translate-x-1 whitespace-nowrap rounded-md bg-foreground px-3 py-1.5 text-xs font-semibold text-background opacity-0 shadow-md transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100">
          Chat on WhatsApp
        </span>
      </a>

      {/* Direct Phone Call Button */}
      <a
        href={site.phone.href}
        aria-label={`Call ${site.phone.display}`}
        className="group relative flex size-12 items-center justify-center rounded-full bg-white text-accent border border-clay/40 shadow-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl active:scale-95"
      >
        {/* Continuous Radar Ping Effect */}
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-full bg-accent/35 animate-ping pointer-events-none"
        />

        <Phone className="relative z-10 size-5 text-accent" />
        <span className="pointer-events-none absolute left-full ml-3 -translate-x-1 whitespace-nowrap rounded-md bg-foreground px-3 py-1.5 text-xs font-semibold text-background opacity-0 shadow-md transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100">
          Call {site.phone.display}
        </span>
      </a>
    </aside>
  )
}
