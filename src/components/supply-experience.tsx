"use client";

import Image from "next/image";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import type { MouseEvent, ReactNode } from "react";

const supplyCategories = [
  {
    title: "Maintenance & Engineering Consumables",
    items: [
      "Engine oil (e.g. Mobil Delvac)",
      "Grease (SKF grease)",
      "Hydraulic oil",
      "Welding rods",
      "Drill bits",
      "Fasteners (nuts, bolts, washers)",
      "Cutting/grinding discs",
    ],
    accent: "from-amber-100 via-white to-orange-50",
  },
  {
    title: "Electrical Consumables",
    items: [
      "Insulation tapes (various colours)",
      "Cable lugs",
      "Electrical connectors",
      "Fuses",
      "Light bulbs",
      "Batteries",
    ],
    accent: "from-teal-100 via-white to-cyan-50",
  },
  {
    title: "General Supplies",
    items: [
      "Paper towels / tissue roll",
      "Hand cleaner (liquid soap)",
      "Disposable nitrile gloves",
      "Office stationery",
      "Coffee mug (branded)",
      "Drinking water bottle",
    ],
    accent: "from-stone-100 via-white to-amber-50",
  },
  {
    title: "Processing Plant Consumables",
    items: [
      "Flocculant (e.g. SNF Floerger)",
      "Lime (hydrated/quicklime)",
      "Cyanide solution",
      "Grinding media (steel balls)",
    ],
    accent: "from-sky-100 via-white to-teal-50",
  },
  {
    title: "Health, Safety & PPE Consumables",
    items: [
      "Hard hat (safety helmet)",
      "Safety glasses / goggles",
      "Dust mask / respirator",
      "Protective gloves",
      "Ear protection (if implied in set)",
    ],
    accent: "from-emerald-100 via-white to-lime-50",
  },
] as const;

const operatingPillars = [
  {
    title: "Strategic sourcing",
    description: "Supply decisions shaped around operational reality, urgency, and long-term value.",
  },
  {
    title: "Responsive fulfilment",
    description: "Fast-moving support for businesses that need dependable supply continuity.",
  },
  {
    title: "Category diversity",
    description: "A wider supply lens across technical, general, plant, and safety requirements.",
  },
  {
    title: "Group alignment",
    description: "Integrated under the broader LEM Projects vision for connected business support.",
  },
] as const;

type SupplyExperienceProps = {
  logoPath: string | null;
  productImagePath: string | null;
  investmentDocumentPath: string | null;
  galleryImages: string[];
  galleryHref: string | null;
};

type MagneticAnchorProps = {
  href: string;
  label: string;
  variant?: "primary" | "secondary";
  target?: string;
  rel?: string;
};

const staggerParent = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const revealUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

function MagneticAnchor({ href, label, variant = "primary", target, rel }: MagneticAnchorProps) {
  const prefersReducedMotion = useReducedMotion();
  const offsetX = useMotionValue(0);
  const offsetY = useMotionValue(0);
  const springX = useSpring(offsetX, { stiffness: 190, damping: 18, mass: 0.4 });
  const springY = useSpring(offsetY, { stiffness: 190, damping: 18, mass: 0.4 });

  const handlePointerMove = (event: MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const pointerX = event.clientX - bounds.left;
    const pointerY = event.clientY - bounds.top;

    event.currentTarget.style.setProperty("--glow-x", `${pointerX}px`);
    event.currentTarget.style.setProperty("--glow-y", `${pointerY}px`);

    offsetX.set((pointerX / bounds.width - 0.5) * 14);
    offsetY.set((pointerY / bounds.height - 0.5) * 12);
  };

  const reset = () => {
    offsetX.set(0);
    offsetY.set(0);
  };

  return (
    <motion.div
      style={prefersReducedMotion ? undefined : { x: springX, y: springY }}
      onMouseMove={handlePointerMove}
      onMouseLeave={reset}
      className="inline-flex"
    >
      <a href={href} target={target} rel={rel} className={`magnetic-button ${variant === "secondary" ? "magnetic-button-secondary" : ""}`}>
        <span className="relative z-10">{label}</span>
      </a>
    </motion.div>
  );
}

function ContactIcon({ kind }: { kind: "whatsapp" | "phone" | "mail" }) {
  if (kind === "whatsapp") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden className="h-4 w-4 fill-current">
        <path d="M20.52 3.48A11.84 11.84 0 0 0 12.07 0C5.55 0 .24 5.3.24 11.82c0 2.08.54 4.11 1.57 5.91L0 24l6.47-1.7a11.8 11.8 0 0 0 5.6 1.43h.01c6.52 0 11.83-5.3 11.83-11.82 0-3.16-1.23-6.12-3.39-8.43Zm-8.45 18.26h-.01a9.8 9.8 0 0 1-4.98-1.36l-.36-.21-3.84 1 1.03-3.74-.24-.38a9.82 9.82 0 0 1-1.5-5.23C2.17 6.41 6.58 2 12 2c2.62 0 5.08 1.01 6.93 2.86a9.72 9.72 0 0 1 2.88 6.94c0 5.42-4.41 9.84-9.74 9.84Zm5.4-7.38c-.29-.15-1.74-.86-2.01-.96-.27-.1-.47-.15-.66.15-.2.29-.76.96-.94 1.15-.17.2-.35.22-.64.08-.29-.15-1.24-.45-2.35-1.43-.87-.77-1.45-1.72-1.63-2.01-.17-.29-.02-.45.13-.6.14-.14.29-.35.44-.52.15-.17.2-.29.29-.49.1-.2.05-.37-.02-.52-.08-.15-.66-1.59-.91-2.18-.24-.57-.48-.49-.66-.5h-.56c-.2 0-.52.08-.79.37-.27.29-1.04 1.01-1.04 2.47 0 1.45 1.06 2.86 1.2 3.05.15.2 2.08 3.18 5.05 4.46.71.31 1.27.49 1.7.63.71.23 1.35.2 1.86.12.57-.08 1.74-.71 1.99-1.4.25-.69.25-1.28.17-1.41-.07-.12-.27-.2-.56-.34Z" />
      </svg>
    );
  }

  if (kind === "phone") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden className="h-4 w-4 fill-current">
        <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1C10.61 21 3 13.39 3 4c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.58.11.35.03.74-.25 1.01l-2.2 2.2Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden className="h-4 w-4 fill-current">
      <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4.24-7.47 4.67a1 1 0 0 1-1.06 0L4 8.24V6l8 5 8-5v2.24Z" />
    </svg>
  );
}

function ContactChip({ href, icon, value }: { href?: string; icon: ReactNode; value: string }) {
  const content = (
    <>
      <span className="text-teal-200">{icon}</span>
      <span>{value}</span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noreferrer" : undefined}
        className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/6 px-3 py-2 text-sm font-semibold text-stone-100 transition hover:border-teal-300/40 hover:bg-white/10"
      >
        {content}
      </a>
    );
  }

  return <div className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/6 px-3 py-2 text-sm font-semibold text-stone-100">{content}</div>;
}

function GalleryCard({ galleryImages, productImagePath, galleryHref }: { galleryImages: string[]; productImagePath: string | null; galleryHref: string | null }) {
  const slideImages = galleryImages.length ? galleryImages : productImagePath ? [productImagePath] : [];
  const [activeSlide, setActiveSlide] = useState(0);
  const opensInternalGallery = galleryHref?.startsWith("/") ?? false;

  useEffect(() => {
    if (slideImages.length <= 1) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slideImages.length);
    }, 3200);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [slideImages]);

  return (
    <motion.article variants={revealUp} className="document-card relative min-h-72 overflow-hidden p-0 sm:min-h-80 lg:min-h-96">
      <div className="absolute inset-0 bg-linear-to-br from-stone-950 via-stone-900 to-teal-950" />

      {slideImages.length ? (
        <div className="absolute inset-0">
          {slideImages.map((imagePath, index) => (
            <div key={imagePath} className={`absolute inset-0 transition-opacity duration-700 ${index === activeSlide ? "opacity-100" : "opacity-0"}`}>
              <Image
                src={imagePath}
                alt={`ChillyLEM gallery highlight ${index + 1}`}
                fill
                sizes="(min-width: 1024px) 720px, 100vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="absolute inset-0 bg-linear-to-br from-white via-teal-50/60 to-amber-50/60" />
      )}

      <div className="absolute inset-0 bg-linear-to-r from-stone-950/82 via-stone-900/44 to-transparent" />
      <div className="absolute inset-0 bg-linear-to-t from-stone-950/80 via-transparent to-stone-950/24" />

      <div className="relative z-10 flex min-h-72 flex-col justify-between p-6 text-white sm:min-h-80 sm:p-7 lg:min-h-96">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-teal-200">ChillyLEM</div>
          <h3 className="mt-4 max-w-sm text-3xl font-bold text-white sm:text-4xl">Product Gallery</h3>
        </div>

        <div>
          {galleryHref ? <MagneticAnchor href={galleryHref} label="View Full Gallery" target={opensInternalGallery ? undefined : "_blank"} rel={opensInternalGallery ? undefined : "noreferrer"} /> : null}
        </div>
      </div>
    </motion.article>
  );
}

export function SupplyExperience({ logoPath, productImagePath, investmentDocumentPath, galleryImages, galleryHref }: SupplyExperienceProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <main className="relative overflow-hidden pb-10">
      <div className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-teal-200/40 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -right-24 top-20 h-80 w-80 rounded-full bg-amber-200/45 blur-3xl" aria-hidden />

      <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={staggerParent}
          className="supply-panel px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12"
        >
          <div className="relative z-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <motion.div variants={revealUp} className="inline-flex items-center gap-3 rounded-full border border-teal-200 bg-white/80 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-teal-800">
                <span className="signal-dot" />
                <span>LEM Supply Enterprise</span>
              </motion.div>
              <motion.h1 variants={revealUp} className="mt-6 max-w-4xl text-balance text-5xl font-black leading-[0.94] text-stone-900 sm:text-6xl lg:text-7xl">
                Operational supply support built for real business continuity.
              </motion.h1>
              <motion.p variants={revealUp} className="mt-5 max-w-3xl text-lg leading-relaxed text-stone-700">
                LEM Supply Enterprise extends the LEM Projects network with a focused supply capability across technical, plant, electrical, general, and PPE consumables.
              </motion.p>
              <motion.div variants={revealUp} className="mt-8 flex flex-wrap items-center gap-3">
                <MagneticAnchor href="#categories" label="Explore Categories" />
                <MagneticAnchor href="#community" label="Community Empowerment" variant="secondary" />
              </motion.div>
            </div>

            <motion.div variants={revealUp} className="grid gap-4">
              <div className="rounded-4xl border border-white/70 bg-linear-to-br from-white via-amber-50/80 to-teal-50/80 p-5 shadow-[0_30px_70px_-48px_rgba(0,0,0,0.28)]">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-amber-700">Supply identity</div>
                    <h2 className="mt-3 text-3xl font-bold text-stone-900">LEM Supply Enterprise</h2>
                  </div>
                  <a
                    href="https://www.lemprojects.co.za"
                    className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-white/85 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-teal-800 transition hover:bg-teal-50 sm:text-xs sm:tracking-[0.22em]"
                  >
                    <span className="signal-dot" />
                    <span>LEM Projects - Home Page</span>
                  </a>
                </div>

                <div className="mt-6 grid gap-5 sm:grid-cols-[auto_1fr] sm:items-center">
                  <div className="rounded-[1.75rem] border border-white/70 bg-white/90 p-4 shadow-[0_20px_55px_-42px_rgba(0,0,0,0.35)]">
                    {logoPath ? (
                      <Image src={logoPath} alt="LEM Supply Enterprise logo" width={160} height={160} className="h-auto w-28 object-contain sm:w-32" priority />
                    ) : (
                      <div className="rounded-2xl bg-stone-100 px-5 py-8 text-center font-bold text-stone-700">LEM Supply Enterprise</div>
                    )}
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-3xl border border-white/70 bg-white/80 p-4">
                      <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-500">Supply focus</div>
                      <p className="mt-2 text-sm leading-relaxed text-stone-700">Reliable sourcing support for operations that need consistency, speed, and breadth.</p>
                    </div>
                    <div className="rounded-3xl border border-white/70 bg-white/80 p-4">
                      <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-500">Business position</div>
                      <p className="mt-2 text-sm leading-relaxed text-stone-700">A supply-led business venture aligned to the wider LEM Projects growth strategy.</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          id="categories"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerParent}
          className="mt-10 rounded-[2.25rem] border border-white/60 bg-white/55 px-5 py-8 shadow-[0_30px_90px_-45px_rgba(0,0,0,0.4)] backdrop-blur-sm sm:px-8 sm:py-10"
        >
          <motion.div variants={revealUp} className="text-center">
            <p className="text-xs uppercase tracking-[0.22em] text-teal-700">Supply categories</p>
            <h2 className="mt-4 text-4xl font-bold text-stone-900 sm:text-5xl">One supply arm across multiple operational needs.</h2>
            <p className="mx-auto mt-4 max-w-4xl text-lg leading-relaxed text-stone-700">
              The attached category board points to a practical operating range: maintenance and engineering items, electrical consumables, general supplies, plant-processing support, and health and safety PPE consumables.
            </p>
          </motion.div>

          {productImagePath ? (
            <motion.div variants={revealUp} className="mt-8 overflow-hidden rounded-4xl border border-white/75 bg-white/80 p-3 shadow-[0_30px_90px_-50px_rgba(0,0,0,0.28)] backdrop-blur-sm sm:p-4">
              <div className="relative overflow-hidden rounded-3xl border border-amber-100/80 bg-linear-to-br from-white via-amber-50/60 to-white">
                <Image
                  src={productImagePath}
                  alt="LEM Supply Enterprise product categories board"
                  width={1600}
                  height={1000}
                  className="h-auto w-full object-contain"
                  priority
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-[4.8%] flex justify-center px-3 sm:bottom-[9.2%] sm:px-4">
                  <div className="group pointer-events-auto relative w-[25.5%] min-w-28 max-w-44 sm:w-[32.5%] sm:min-w-44 sm:max-w-96">
                    <motion.a
                      href="mailto:info@lemprojects.co.za"
                      className="group relative flex min-h-14 flex-col items-center justify-end overflow-hidden border border-white/58 bg-linear-to-b from-white/64 via-[#fff7ea]/58 to-[#f0dfbf]/60 px-2 pb-[8%] pt-[10%] text-center text-teal-900 shadow-[0_10px_18px_-14px_rgba(0,0,0,0.28),0_0_0_1px_rgba(255,248,225,0.18),inset_0_1px_0_rgba(255,255,255,0.8)] backdrop-blur-md transition duration-300 hover:border-amber-100/95 hover:shadow-[0_14px_26px_-18px_rgba(0,0,0,0.32),0_0_18px_rgba(255,210,120,0.24),0_0_28px_rgba(0,96,96,0.12),inset_0_1px_0_rgba(255,255,255,0.94)] sm:min-h-32 sm:px-5 sm:pb-[13%] sm:pt-[16%]"
                      style={{ clipPath: "polygon(17% 0%, 83% 0%, 96% 100%, 4% 100%)" }}
                      whileHover={prefersReducedMotion ? undefined : { y: -5, scale: 1.025 }}
                      whileTap={prefersReducedMotion ? undefined : { y: 2, scale: 0.985 }}
                      transition={{ type: "spring", stiffness: 260, damping: 18, mass: 0.7 }}
                    >
                      <motion.div
                        className="pointer-events-none absolute -left-[28%] top-[-8%] h-[76%] w-[42%] rotate-22 bg-linear-to-r from-white/0 via-white/70 to-white/0 mix-blend-screen"
                        aria-hidden
                        animate={
                          prefersReducedMotion
                            ? { opacity: 0.24 }
                            : {
                                x: ["-18%", "168%"],
                                opacity: [0, 0.52, 0],
                              }
                        }
                        transition={
                          prefersReducedMotion
                            ? undefined
                            : {
                                duration: 3.6,
                                repeat: Infinity,
                                repeatDelay: 1.1,
                                ease: "easeInOut",
                              }
                        }
                      />
                      <div className="pointer-events-none absolute inset-x-[7%] top-[6%] h-[68%] rounded-[42%_42%_18%_18%/26%_26%_12%_12%] border border-white/45 bg-linear-to-b from-white/46 via-white/20 to-transparent opacity-90" aria-hidden />
                      <div className="pointer-events-none absolute inset-x-[18%] top-[13%] h-px bg-linear-to-r from-transparent via-teal-700/32 to-transparent" aria-hidden />
                      <motion.div
                        className="pointer-events-none absolute inset-x-[22%] bottom-[17%] h-px bg-linear-to-r from-transparent via-teal-900/20 to-transparent"
                        aria-hidden
                        animate={prefersReducedMotion ? { opacity: 0.4 } : { opacity: [0.18, 0.85, 0.24] }}
                        transition={prefersReducedMotion ? undefined : { duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                      />
                      <motion.span
                        className="relative text-[5px] font-semibold uppercase tracking-[0.18em] text-teal-700/82 sm:text-[9px] sm:tracking-[0.34em]"
                        animate={prefersReducedMotion ? undefined : { opacity: [0.92, 1, 0.94] }}
                        transition={prefersReducedMotion ? undefined : { duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                      >
                        Direct Supply Request
                      </motion.span>
                      <motion.span
                        className="relative mt-0.5 text-[9px] font-black uppercase tracking-[0.14em] text-teal-950 sm:mt-2 sm:text-base sm:tracking-[0.3em]"
                        animate={prefersReducedMotion ? undefined : { textShadow: ["0 0 0 rgba(0,0,0,0)", "0 0 18px rgba(255,244,200,0.42)", "0 0 0 rgba(0,0,0,0)"] }}
                        transition={prefersReducedMotion ? undefined : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                      >
                        Order Here
                      </motion.span>
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : null}

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {supplyCategories.map((category) => (
              <motion.article key={category.title} variants={revealUp} className={`category-card bg-linear-to-br ${category.accent} p-5`}>
                <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-teal-700">Category</div>
                <h3 className="mt-3 text-2xl font-bold leading-tight text-stone-900">{category.title}</h3>
                <ul className="mt-4 space-y-2 text-sm leading-relaxed text-stone-700">
                  {category.items.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerParent}
          className="mt-10 grid gap-6 lg:grid-cols-[0.92fr_1.08fr]"
        >
          <motion.div variants={revealUp} className="supply-panel px-6 py-6 sm:px-7 sm:py-7">
            <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-teal-700">Supply statement</div>
            <p className="mt-4 text-base leading-8 text-stone-700 sm:text-lg">
              LEM Supply Enterprise is positioned as the responsive supply partner within the LEM ecosystem, supporting diverse business needs through dependable sourcing, category breadth, and a delivery mindset shaped by operational realities.
            </p>
          </motion.div>

          <motion.div variants={revealUp} className="supply-panel px-6 py-6 sm:px-7 sm:py-7">
            <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-teal-700">Operating pillars</div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {operatingPillars.map((pillar) => (
                <div key={pillar.title} className="rounded-3xl border border-white/70 bg-white/78 p-4">
                  <h3 className="text-xl font-bold text-stone-900">{pillar.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone-700">{pillar.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.section>

        <motion.section
          id="community"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerParent}
          className="mt-10"
        >
          <motion.div variants={revealUp} className="text-center">
            <p className="text-xs uppercase tracking-[0.22em] text-teal-700">Community Empowerment</p>
            <p className="mx-auto mt-4 max-w-5xl text-lg leading-relaxed text-stone-700">
              Investment Statement: ChillyLEM Product LEM Supply Enterprise’s investment in the ChillyLEM product is rooted in our strong commitment to building sustainable supply chains and supporting local SMMEs. As a business, we recognize that true economic growth is driven by empowering local producers and creating opportunities within our communities. When a local black-owned farmer approached us with high-quality chilli produce, we saw an opportunity not only to support his agricultural efforts but also to create a value-added product that strengthens our supply chain. By integrating locally sourced raw materials into a market-ready product, we ensure both sustainability and shared economic benefit. This initiative reflects our broader vision of promoting inclusive growth, fostering entrepreneurship, and contributing meaningfully to the development of black-owned enterprises. Through the ChillyLEM product, we are not just supplying goods-we are investing in people, partnerships, and long-term impact.
            </p>
          </motion.div>

          <div className="mt-8 grid gap-5 lg:grid-cols-1">
            <GalleryCard galleryImages={galleryImages} productImagePath={productImagePath} galleryHref={galleryHref} />
          </div>
        </motion.section>

        <motion.section
          id="contact"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={staggerParent}
          className="final-frame mt-12 overflow-hidden rounded-[2.5rem] border border-white/60 px-6 py-10 text-white shadow-[0_40px_110px_-55px_rgba(0,0,0,0.8)] sm:px-10"
        >
          <div className="relative z-10 grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
            <motion.div variants={revealUp}>
              <div className="text-xs uppercase tracking-[0.24em] text-teal-300">Contact us</div>
              <div className="final-mark-shell mt-5">
                {logoPath ? (
                  <Image src={logoPath} alt="LEM Supply Enterprise logo" width={360} height={220} className="mx-auto h-auto w-full max-w-[16rem] object-contain" />
                ) : (
                  <div className="supply-logo-fallback">LEM Supply Enterprise</div>
                )}
              </div>
              <div className="mt-5 text-sm font-semibold uppercase tracking-[0.18em] text-teal-200">Supply continuity. Operational confidence.</div>
            </motion.div>

            <div>
              <motion.h2 variants={revealUp} className="max-w-4xl text-4xl font-bold leading-tight sm:text-5xl">
                Bring LEM Supply Enterprise into procurement conversations where speed, consistency, and category breadth matter.
              </motion.h2>
              <motion.p variants={revealUp} className="mt-6 max-w-3xl text-lg leading-relaxed text-stone-200">
                The current website is aligned with the broader LEM visual system and ready to support product files, category expansion, and direct engagement.
              </motion.p>
              <motion.div variants={revealUp} className="mt-8 flex flex-wrap items-center gap-3">
                <ContactChip href="https://wa.me/27764807410" icon={<ContactIcon kind="whatsapp" />} value="0764807410" />
                <ContactChip href="tel:0823740090" icon={<ContactIcon kind="phone" />} value="0823740090" />
                <ContactChip icon={<ContactIcon kind="mail" />} value="info@lemprojects.co.za" />
              </motion.div>
            </div>
          </div>
        </motion.section>
      </section>
    </main>
  );
}
