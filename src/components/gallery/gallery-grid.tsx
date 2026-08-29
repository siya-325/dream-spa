import Image from "next/image"
import { ArrowRight, Maximize2, X } from "lucide-react"

import { Reveal } from "@/components/ui/reveal"
import type { GalleryItem } from "@/data/gallery"

type GalleryGridProps = {
  filteredItems: GalleryItem[]
  selectedImage: GalleryItem | null
  onSelectImage: (item: GalleryItem) => void
  onCloseModal: () => void
}

export function GalleryGrid({
  filteredItems,
  selectedImage,
  onSelectImage,
  onCloseModal,
}: GalleryGridProps) {
  return (
    <section className="bg-background py-16 lg:py-24">
      <div className="shell">
        {/* Masonry / Grid Display */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {filteredItems.map((item, index) => (
            <Reveal key={item.id} index={index}>
              <div
                onClick={() => onSelectImage(item)}
                className="group relative flex cursor-pointer flex-col overflow-hidden rounded-xl border border-border/80 bg-sand/30 transition-all duration-300 hover:border-clay/60 hover:shadow-md"
              >
                <div
                  className={`relative ${item.aspect} w-full overflow-hidden bg-sand-deep`}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="rounded-full bg-white/90 p-3 text-foreground shadow-md backdrop-blur-md transition-transform duration-300 group-hover:scale-110">
                      <Maximize2 className="size-4" />
                    </span>
                  </div>
                  <span className="absolute top-3 left-3 rounded-full bg-background/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-foreground shadow-sm backdrop-blur-md">
                    {item.categoryLabel}
                  </span>
                </div>

                <div className="flex flex-col gap-1.5 p-5">
                  <h3 className="font-serif text-lg font-medium text-foreground transition-colors group-hover:text-accent">
                    {item.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Modal / Lightbox for Selected Image */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 sm:p-8 backdrop-blur-md transition-opacity duration-300"
          onClick={onCloseModal}
        >
          <div
            className="relative max-w-4xl w-full overflow-hidden rounded-2xl bg-background border border-clay/40 shadow-2xl text-foreground"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={onCloseModal}
              className="absolute top-4 right-4 z-20 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black"
              aria-label="Close image preview"
            >
              <X className="size-5" />
            </button>

            <div className="relative aspect-[16/10] w-full bg-black">
              <Image
                src={selectedImage.image}
                alt={selectedImage.title}
                fill
                className="object-contain"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-background p-6 sm:p-8">
              <div>
                <span className="eyebrow text-xs font-semibold uppercase tracking-widest text-accent">
                  {selectedImage.categoryLabel}
                </span>
                <h3 className="mt-1 font-serif text-2xl font-semibold text-foreground">
                  {selectedImage.title}
                </h3>
                <p className="mt-2 max-w-lg text-sm text-muted-foreground">
                  {selectedImage.description}
                </p>
              </div>

              <a
                href="/contact"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-none bg-btn-primary px-6 py-3 text-xs font-semibold text-white transition-colors hover:bg-btn-primary-hover"
              >
                Book a Session
                <ArrowRight className="size-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
