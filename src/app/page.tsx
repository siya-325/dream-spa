import { Experience } from "@/components/home/experience"
import { Hero } from "@/components/home/hero"
import { Intro } from "@/components/home/intro"
import { ServicesPreview } from "@/components/home/services-preview"
import { SpaceGallery } from "@/components/home/space-gallery"
import { Testimonials } from "@/components/home/testimonials"
import { CtaBand } from "@/components/shared/cta-band"

export default function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <ServicesPreview />
      <Experience />
      <SpaceGallery />
      <Testimonials />
      <CtaBand />
    </>
  )
}

