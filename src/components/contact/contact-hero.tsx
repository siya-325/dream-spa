import { PageHeader } from "@/components/shared/page-header"

export function ContactHero() {
  return (
    <section className="relative w-full border-b border-border bg-sand/40">
      <PageHeader
        eyebrow="Contact & Visit"
        title="We are ten minutes from Subhash Chowk."
        description="Call ahead to reserve a room and therapist, or drop by our Gurukul location during opening hours."
      />
    </section>
  )
}
