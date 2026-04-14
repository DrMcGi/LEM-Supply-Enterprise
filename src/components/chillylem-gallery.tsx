"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type ChillylemGalleryProps = {
  items: Array<{
    type: "image" | "video";
    src: string;
    label: string;
  }>;
};

export function ChillylemGallery({ items }: ChillylemGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (!items.length) return;

      if (event.key === "ArrowRight") {
        setActiveIndex((current) => (current + 1) % items.length);
      }

      if (event.key === "ArrowLeft") {
        setActiveIndex((current) => (current - 1 + items.length) % items.length);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [items]);

  const activeItem = items[activeIndex] ?? null;

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
      <section className="supply-panel px-6 py-8 sm:px-8 sm:py-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-teal-700">ChillyLEM Gallery</p>
            <h1 className="mt-3 text-4xl font-black leading-tight text-stone-900 sm:text-5xl">Browse the full product gallery.</h1>
            <p className="mt-4 max-w-3xl text-lg leading-relaxed text-stone-700">
              View every uploaded ChillyLEM product image and move through the set with gallery navigation.
            </p>
          </div>

          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-teal-200 bg-white/80 px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-teal-800 transition hover:bg-teal-50"
          >
            Back to Home
          </Link>
        </div>
      </section>

      <section className="document-card overflow-hidden p-4 sm:p-6">
        {activeItem ? (
          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="overflow-hidden rounded-[1.75rem] border border-white/70 bg-stone-950 shadow-[0_28px_70px_-48px_rgba(0,0,0,0.45)]">
              <div className="relative aspect-[5/4] w-full">
                {activeItem.type === "video" ? (
                  <video
                    src={activeItem.src}
                    controls
                    playsInline
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                ) : (
                  <Image
                    src={activeItem.src}
                    alt={`ChillyLEM gallery image ${activeIndex + 1}`}
                    fill
                    priority
                    sizes="(min-width: 1024px) 760px, 100vw"
                    className="object-cover"
                  />
                )}
              </div>
            </div>

            <div className="flex flex-col justify-between gap-6 rounded-[1.75rem] border border-white/70 bg-linear-to-br from-white via-teal-50/55 to-amber-50/55 p-6 shadow-[0_24px_70px_-48px_rgba(0,0,0,0.24)]">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-teal-700">
                  {activeItem.type === "video" ? "Video" : "Image"} {activeIndex + 1} of {items.length}
                </p>
                <h2 className="mt-3 text-3xl font-bold text-stone-900">ChillyLEM product showcase</h2>
                <p className="mt-4 text-base leading-8 text-stone-700">
                  Use the navigation controls or thumbnails to move through the full ChillyLEM image set.
                </p>
                <p className="mt-4 text-sm font-semibold text-stone-700">{activeItem.label}</p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => setActiveIndex((current) => (current - 1 + items.length) % items.length)}
                  className="inline-flex items-center justify-center rounded-full border border-stone-200 bg-white px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-stone-700 transition hover:border-teal-300 hover:bg-teal-50 hover:text-teal-800"
                >
                  Previous Image
                </button>
                <button
                  type="button"
                  onClick={() => setActiveIndex((current) => (current + 1) % items.length)}
                  className="inline-flex items-center justify-center rounded-full border border-teal-200 bg-teal-700 px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-teal-600"
                >
                  Next Image
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex min-h-80 items-center justify-center rounded-[1.75rem] border border-dashed border-stone-300 bg-white/70 px-6 py-10 text-center text-stone-600">
            No gallery images are available yet.
          </div>
        )}
      </section>

      {items.length ? (
        <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((item, index) => {
            const isActive = index === activeIndex;

            return (
              <button
                key={`${item.type}:${item.src}`}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`group overflow-hidden rounded-[1.5rem] border bg-white/80 text-left shadow-[0_20px_60px_-44px_rgba(0,0,0,0.28)] transition ${isActive ? "border-teal-400 ring-2 ring-teal-200" : "border-white/70 hover:border-amber-200"}`}
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
                  {item.type === "video" ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-stone-900/5">
                      <p className="rounded-full border border-stone-200 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-stone-700">
                        Video
                      </p>
                    </div>
                  ) : (
                    <Image
                      src={item.src}
                      alt={`ChillyLEM thumbnail ${index + 1}`}
                      fill
                      sizes="(min-width: 1280px) 280px, (min-width: 768px) 33vw, 100vw"
                      className="object-cover transition duration-300 group-hover:scale-[1.03]"
                    />
                  )}
                </div>
                <div className="px-4 py-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-teal-700">ChillyLEM</p>
                  <p className="mt-2 text-lg font-bold text-stone-900">
                    {item.type === "video" ? "Gallery Video" : "Gallery Image"} {index + 1}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-stone-700">{item.label}</p>
                </div>
              </button>
            );
          })}
        </section>
      ) : null}
    </main>
  );
}