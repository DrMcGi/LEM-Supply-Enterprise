"use client";

import Image from "next/image";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import type { MouseEvent, ReactNode } from "react";

const supplyCategories = [
  {
    title: "Maintenance & Engineering Consumables",
    summary: "Operational materials and engineering essentials that help teams maintain reliability on site.",
    accent: "from-amber-100 via-white to-orange-50",
  },
  {
    title: "Electrical Consumables",
    summary: "Electrical support items for day-to-day installations, servicing, and infrastructure continuity.",
    accent: "from-teal-100 via-white to-cyan-50",
  },
  {
    title: "General Supplies",
    summary: "Practical business and workplace supply support for consistent everyday operations.",
    accent: "from-stone-100 via-white to-amber-50",
  },
  {
    title: "Processing Plant Consumables",
    summary: "Supply support tailored for plant environments where continuity, safety, and response time matter.",
    accent: "from-sky-100 via-white to-teal-50",
  },
  {
    title: "Health, Safety & PPE Consumables",
    summary: "Essential protective products that support compliance, preparedness, and workforce safety.",
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
  productSpecificationPath: string | null;
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

function DocumentCard({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string | null;
}) {
  return (
    <motion.article variants={revealUp} className="document-card p-6">
      <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-teal-700">Reference document</div>
      <h3 className="mt-4 text-2xl font-bold text-stone-900">{title}</h3>
      <p className="mt-3 text-base leading-relaxed text-stone-700">{description}</p>
      {href ? (
        <div className="mt-6">
          <MagneticAnchor href={href} label="Open document" target="_blank" rel="noreferrer" />
        </div>
      ) : (
        <div className="mt-6 rounded-2xl border border-dashed border-amber-300 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-700">
          Add this file to <span className="font-bold">public/documents</span> to enable direct access.
        </div>
      )}
    </motion.article>
  );
}

export function SupplyExperience({ logoPath, productImagePath, investmentDocumentPath, productSpecificationPath }: SupplyExperienceProps) {
  return (
    <main className="relative overflow-hidden pb-10">
      <div className="pointer-events-none absolute left-[-8rem] top-10 h-72 w-72 rounded-full bg-teal-200/40 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute right-[-6rem] top-20 h-80 w-80 rounded-full bg-amber-200/45 blur-3xl" aria-hidden />

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
                <span>LEM supply division</span>
              </motion.div>
              <motion.h1 variants={revealUp} className="mt-6 max-w-4xl text-balance text-5xl font-black leading-[0.94] text-stone-900 sm:text-6xl lg:text-7xl">
                Operational supply support built for real business continuity.
              </motion.h1>
              <motion.p variants={revealUp} className="mt-5 max-w-3xl text-lg leading-relaxed text-stone-700">
                LEM Supply Enterprise extends the LEM Projects network with a focused supply capability across technical, plant, electrical, general, and PPE consumables.
              </motion.p>
              <motion.div variants={revealUp} className="mt-8 flex flex-wrap items-center gap-3">
                <MagneticAnchor href="#categories" label="Explore Categories" />
                <MagneticAnchor href="#documents" label="View Documents" variant="secondary" />
              </motion.div>
            </div>

            <motion.div variants={revealUp} className="grid gap-4">
              <div className="rounded-[2rem] border border-white/70 bg-linear-to-br from-white via-amber-50/80 to-teal-50/80 p-5 shadow-[0_30px_70px_-48px_rgba(0,0,0,0.28)]">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-amber-700">Supply identity</div>
                    <h2 className="mt-3 text-3xl font-bold text-stone-900">LEM Supply Enterprise</h2>
                  </div>
                  <a
                    href="https://lem-projects.vercel.app"
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
            <motion.div variants={revealUp} className="mt-8 overflow-hidden rounded-[2rem] border border-white/75 bg-white/80 p-3 shadow-[0_30px_90px_-50px_rgba(0,0,0,0.28)] backdrop-blur-sm sm:p-4">
              <div className="overflow-hidden rounded-[1.5rem] border border-amber-100/80 bg-linear-to-br from-white via-amber-50/60 to-white">
                <Image
                  src={productImagePath}
                  alt="LEM Supply Enterprise product categories board"
                  width={1600}
                  height={1000}
                  className="h-auto w-full object-contain"
                  priority
                />
              </div>
            </motion.div>
          ) : null}

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {supplyCategories.map((category) => (
              <motion.article key={category.title} variants={revealUp} className={`category-card bg-linear-to-br ${category.accent} p-5`}>
                <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-teal-700">Category</div>
                <h3 className="mt-3 text-2xl font-bold leading-tight text-stone-900">{category.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-stone-700">{category.summary}</p>
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
          id="documents"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerParent}
          className="mt-10"
        >
          <motion.div variants={revealUp} className="text-center">
            <p className="text-xs uppercase tracking-[0.22em] text-teal-700">Working documents</p>
            <h2 className="mt-4 text-4xl font-bold text-stone-900 sm:text-5xl">Reference files can plug straight into the site.</h2>
            <p className="mx-auto mt-4 max-w-3xl text-lg leading-relaxed text-stone-700">
              I used the attached document titles as part of the site structure, and these cards will automatically become live download points once the files are added to this repo.
            </p>
          </motion.div>

          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            <DocumentCard
              title="Investment Statement"
              description="A dedicated slot for the investment statement currently referenced as Investment Statement_LEM Chilli.docx."
              href={investmentDocumentPath}
            />
            <DocumentCard
              title="Product Specification"
              description="A dedicated slot for the product specification currently referenced as Product Specification.docx."
              href={productSpecificationPath}
            />
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
                <MagneticAnchor href="mailto:info@lemprojects.co.za" label="Start a conversation" variant="secondary" />
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