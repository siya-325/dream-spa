import Image from "next/image"

import { Reveal } from "@/components/ui/reveal"

const steps = [
  {
    step: "Arrive",
    body: "Leave your phone at reception if you like. You are shown to a private room and given time to change and settle.",
  },
  {
    step: "Consult",
    body: "A short conversation about how you are feeling, where you hold tension and the pressure you actually enjoy.",
  },
  {
    step: "Treatment",
    body: "Your therapist works at a steady, unhurried pace with warm oil, checking in without interrupting the calm.",
  },
  {
    step: "Rest",
    body: "Warm water, a quiet few minutes and no one asking you to hurry out of the room.",
  },
]

export function Experience() {
  return (
    <section className="relative overflow-hidden bg-light-red-bg py-20 text-light-red-fg lg:py-28">
      <div className="shell">
        <div className="flex flex-col gap-14 lg:flex-row lg:gap-20">
          <div className="lg:w-[45%]">
            <Reveal>
              <span className="eyebrow flex items-center gap-3 text-light-red-fg/60">
                <span
                  aria-hidden="true"
                  className="h-px w-8 bg-light-red-fg/30"
                />
                The visit
              </span>
              <h2 className="display mt-6 text-3xl text-balance text-light-red-fg sm:text-4xl lg:text-[2.75rem]">
                Four unhurried stages, every time.
              </h2>
              <p className="mt-6 max-w-md text-base leading-relaxed text-pretty text-light-red-fg/70">
                The treatment changes from guest to guest. The care around it
                does not.
              </p>
            </Reveal>

            <Reveal index={1}>
              <figure className="relative mt-12 hidden aspect-4/3 overflow-hidden lg:block">
                <Image
                  src="/images/detail-towels.png"
                  alt="Rolled white spa towels stacked neatly on a pale oak shelf"
                  fill
                  sizes="45vw"
                  className="object-cover"
                />
              </figure>
            </Reveal>
          </div>

          <ol className="flex flex-col lg:w-[55%] lg:pt-4">
            {steps.map((item, index) => (
              <Reveal as="li" index={index} key={item.step}>
                <div className="flex flex-col gap-3 border-t border-light-red-fg/15 py-8 sm:flex-row sm:gap-10">
                  <span className="eyebrow shrink-0 pt-1 text-light-red-fg/45 sm:w-14">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="flex flex-col gap-3">
                    <h3 className="display text-2xl text-light-red-fg">
                      {item.step}
                    </h3>
                    <p className="max-w-lg text-sm leading-relaxed text-pretty text-light-red-fg/70">
                      {item.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
