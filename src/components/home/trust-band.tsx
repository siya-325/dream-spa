import { site, yearsOfCare } from "@/data/site"

export function TrustBand() {
  return (
    <section className="w-full bg-sand">
      <div className="relative z-20 -translate-y-1/2 w-full px-3 sm:px-12 lg:px-20 bg-background rounded-full py-6 sm:py-10 shadow-sm">
        <dl className="grid grid-cols-3 gap-x-2 text-center sm:gap-x-12 lg:gap-x-20">
          <div className="flex flex-col items-center justify-center text-center">
            <dt className="eyebrow text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider sm:tracking-widest">
              Since
            </dt>
            <dd className="display mt-1 font-serif text-2xl min-[400px]:text-3xl sm:text-5xl lg:text-6xl text-foreground tracking-tight">
              {site.established}
            </dd>
          </div>
          <div className="flex flex-col items-center justify-center text-center">
            <dt className="eyebrow text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider sm:tracking-widest">
              Years of care
            </dt>
            <dd className="display mt-1 font-serif text-2xl min-[400px]:text-3xl sm:text-5xl lg:text-6xl text-foreground tracking-tight">
              {yearsOfCare}+
            </dd>
          </div>
          <div className="flex flex-col items-center justify-center text-center">
            <dt className="eyebrow text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider sm:tracking-widest">
              Open daily
            </dt>
            <dd className="display mt-1 font-serif text-2xl min-[400px]:text-3xl sm:text-5xl lg:text-6xl text-foreground tracking-tight">
              10 – 9
            </dd>
          </div>
        </dl>
      </div>
    </section>
  )
}
