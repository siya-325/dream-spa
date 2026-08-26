import Image from "next/image"
import type { Metadata } from "next"

import { CtaBand } from "@/components/shared/cta-band"
import { PageHeader } from "@/components/shared/page-header"
import { Reveal } from "@/components/ui/reveal"
import { SectionHeading } from "@/components/ui/section-heading"
import { site, yearsOfCare } from "@/data/site"

export const metadata: Metadata = {
  title: "About",
  description:
    "Dream Spa is a small beauty and wellness spa in Gurukul, Ahmedabad. Meet the approach behind our massage therapies, ayurvedic treatments and skin care.",
}

const principles = [
  {
    title: "We ask before we begin",
    body: "Every session starts with a short conversation — where you are sore, how much pressure you enjoy, how much time you have. The treatment is built from your answers, not from a script.",
  },
  {
    title: "One guest at a time",
    body: "We keep the room quiet and the schedule unhurried. You will not be moved along to make space for the next appointment, and you will not be sold anything on the way out.",
  },
  {
    title: "Trained hands, traditional technique",
    body: "Our therapists work in classic Swedish, deep tissue and ayurvedic traditions. The technique is conventional and well practised; what changes is how it is applied to you.",
  },
  {
    title: "Clean, private, predictable",
    body: "Fresh linen for every guest, private treatment rooms, and clear pricing discussed before the session begins. No surprises at the counter.",
  },
]

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow={`Since ${site.established}`}
        title="A small spa that treats an hour as something worth protecting."
        description="Dream Spa opened in Gurukul with a simple idea: most people do not need a longer menu, they need someone to actually pay attention for sixty minutes."
        aside={
          <dl className="flex gap-10 sm:gap-14">
            <div>
              <dt className="eyebrow text-muted-foreground">Established</dt>
              <dd className="display mt-3 text-3xl">{site.established}</dd>
            </div>
            <div>
              <dt className="eyebrow text-muted-foreground">Years of care</dt>
              <dd className="display mt-3 text-3xl">{yearsOfCare}+</dd>
            </div>
          </dl>
        }
      />

      <section className="py-20 lg:py-28">
        <div className="shell flex flex-col gap-14 lg:flex-row lg:gap-20">
          <Reveal className="lg:w-[46%]">
            <figure className="relative aspect-4/5 overflow-hidden bg-sand-deep">
              <Image
                src="/images/about-reception.png"
                alt="The Dream Spa reception with warm wood, linen and soft daylight"
                fill
                sizes="(min-width: 1024px) 46vw, 100vw"
                className="object-cover"
              />
            </figure>
          </Reveal>

          <Reveal className="flex flex-col justify-center lg:w-[54%]" index={1}>
            <SectionHeading
              eyebrow="Our story"
              title="Built around the treatment, not the upsell."
            />
            <div className="mt-8 flex max-w-xl flex-col gap-6 text-base leading-relaxed text-pretty text-muted-foreground">
              <p>
                We are a neighbourhood spa on the first floor of Sanskrut
                Galleria, a few steps from Subhash Chowk. There is no grand
                lobby and no long list of packages — just a handful of rooms, a
                small team, and treatments we are confident in.
              </p>
              <p>
                Most of our guests come from within a few kilometres, and many
                return every few weeks. That shapes how we work: if you are
                going to come back, the session has to be genuinely good rather
                than impressive on paper.
              </p>
              <p>
                We work with warm oils, traditional strokes and pressure that
                you set. If a treatment is not right for you on a given day, we
                will say so and suggest something else — including nothing at
                all.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-border bg-sand py-20 lg:py-28">
        <div className="shell">
          <SectionHeading
            eyebrow="How we work"
            title="Four things we do not compromise on."
          />

          <ul className="mt-14 grid gap-x-16 gap-y-12 sm:grid-cols-2">
            {principles.map((principle, index) => (
              <Reveal as="li" key={principle.title} index={index}>
                <div className="flex flex-col border-t border-border-strong pt-6">
                  <h3 className="display text-xl sm:text-2xl">
                    {principle.title}
                  </h3>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-pretty text-muted-foreground">
                    {principle.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="shell flex flex-col gap-14 lg:flex-row-reverse lg:items-center lg:gap-20">
          <Reveal className="lg:w-[42%]">
            <figure className="relative aspect-square overflow-hidden bg-sand-deep">
              <Image
                src="/images/detail-towels.png"
                alt="Neatly folded spa towels stacked beside a small bowl of oil"
                fill
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="object-cover"
              />
            </figure>
          </Reveal>

          <Reveal className="lg:w-[58%]" index={1}>
            <SectionHeading
              eyebrow="Before you visit"
              title="A few practical notes."
            />
            <dl className="mt-10 flex flex-col gap-8">
              {[
                {
                  term: "Arrive ten minutes early",
                  detail:
                    "Enough time to change, rinse and settle so the treatment starts calmly rather than in a rush.",
                },
                {
                  term: "Appointments are recommended",
                  detail: site.hoursNote,
                },
                {
                  term: "Tell us about your health",
                  detail:
                    "Pregnancy, recent injuries, skin conditions or medication all change what we recommend. Please mention them at the start.",
                },
                {
                  term: "Payment and pricing",
                  detail:
                    "Rates are confirmed on call or at reception before the session begins. Ask us anything before you commit.",
                },
              ].map((item) => (
                <div
                  key={item.term}
                  className="flex flex-col gap-2 border-t border-border pt-6 sm:flex-row sm:gap-10"
                >
                  <dt className="eyebrow shrink-0 pt-1 text-foreground sm:w-52">
                    {item.term}
                  </dt>
                  <dd className="max-w-lg text-sm leading-relaxed text-pretty text-muted-foreground">
                    {item.detail}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      <CtaBand
        eyebrow="Come by"
        title="We are ten minutes from Subhash Chowk."
        description="Call ahead and we will hold a room and a therapist for the time you want."
      />
    </>
  )
}
