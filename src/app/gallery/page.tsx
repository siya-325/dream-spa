"use client"

import { useState } from "react"

import { GalleryGrid } from "@/components/gallery/gallery-grid"
import { GalleryHero } from "@/components/gallery/gallery-hero"
import { CtaBand } from "@/components/shared/cta-band"
import { galleryItems, type GalleryItem } from "@/data/gallery"

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null)

  const filteredItems =
    activeCategory === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory)

  return (
    <>
      <GalleryHero
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        filteredCount={filteredItems.length}
        onSelectFeaturedImage={setSelectedImage}
        featuredItem={galleryItems[0]}
      />

      <GalleryGrid
        filteredItems={filteredItems}
        selectedImage={selectedImage}
        onSelectImage={setSelectedImage}
        onCloseModal={() => setSelectedImage(null)}
      />

      <CtaBand
        eyebrow="Visit Dream Spa"
        title="Experience the atmosphere in person."
        description="Book your treatment session or reach out to us with any questions before visiting our Gurukul spa."
      />
    </>
  )
}
