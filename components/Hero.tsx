"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const titleLetters = Array.from(titleRef.current?.querySelectorAll(".letter") ?? []);
      const stats = Array.from(statsRef.current?.querySelectorAll(".stat") ?? []);

      
      // Headline letter-by-letter reveal
      gsap.from(titleLetters, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.04,
        ease: "power3.out",
      });

      // Statistics reveal one by one
      gsap.from(stats, {
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        delay: 0.5,
        ease: "power3.out",
      });

    

      gsap.to(visualRef.current, {
        y: 480,
        x: 180,
        rotation: 180,
        scale: 1.45,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.2,
        },
      });

      

      gsap.to(titleRef.current, {
        y: -140,
        scale: 0.85,
        opacity: 0.2,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const title = "WELCOME ITZ FIZZ";

  return (
    <main
      ref={sectionRef}
      className="relative min-h-[220vh] overflow-hidden bg-[#f4f1ea] text-black"
    >
      {/* Sticky hero viewport */}
      <section className="sticky top-0 flex h-screen flex-col justify-between px-6 py-8 md:px-12">

        {/* -----------------------------
            TOP BAR
        ----------------------------- */}
        <div className="flex items-center justify-between text-xs uppercase tracking-[0.25em]">
          <span>ITZ FIZZ</span>

          <div className="flex items-center gap-3">
            <span>Scroll</span>

            <span className="flex h-8 w-5 items-start justify-center rounded-full border border-black/40 p-1">
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-black" />
            </span>
          </div>
        </div>

        {/* -----------------------------
            MAIN HERO AREA
        ----------------------------- */}
        <div className="relative flex flex-1 items-center justify-center">

          {/* Headline */}
          <h1
            ref={titleRef}
            className="absolute top-[20%] z-30 w-full whitespace-nowrap text-center text-[clamp(2.8rem,7vw,7rem)] font-bold leading-[0.9] tracking-[0.12em]"
          >
            {title.split("").map((letter, index) => (
              <span
                key={index}
                className="letter inline-block"
              >
                {letter === " " ? "\u00A0" : letter}
              </span>
            ))}
          </h1>

          {/* -----------------------------
              MAIN ANIMATED VISUAL
          ----------------------------- */}
          <div
            ref={visualRef}
            className="relative z-20 mt-40 h-64 w-64 rounded-full bg-black shadow-[0_30px_60px_rgba(0,0,0,0.2)] md:h-80 md:w-80"
          >
            {/* Outer ring */}
            <div className="absolute inset-5 rounded-full border border-white/20" />

            {/* Inner ring */}
            <div className="absolute inset-10 rounded-full border border-white/10" />

            {/* Center */}
            <div className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_40px_rgba(255,255,255,0.25)]" />

            {/* Small top detail */}
            <div className="absolute left-1/2 top-5 h-2 w-2 -translate-x-1/2 rounded-full bg-white" />
          </div>
        </div>

        {/* -----------------------------
            STATISTICS
        ----------------------------- */}
        <div
          ref={statsRef}
          className="grid grid-cols-1 gap-6 pb-4 md:grid-cols-3"
        >
          {/* Stat 1 */}
          <div className="stat border-t border-black/30 pt-4">
            <p className="text-4xl font-semibold md:text-5xl">
              95%
            </p>

            <p className="mt-2 max-w-xs text-sm leading-relaxed text-black/60">
              Customer satisfaction through better experiences.
            </p>
          </div>

          {/* Stat 2 */}
          <div className="stat border-t border-black/30 pt-4">
            <p className="text-4xl font-semibold md:text-5xl">
              80%
            </p>

            <p className="mt-2 max-w-xs text-sm leading-relaxed text-black/60">
              Faster growth powered by creative digital solutions.
            </p>
          </div>

          {/* Stat 3 */}
          <div className="stat border-t border-black/30 pt-4">
            <p className="text-4xl font-semibold md:text-5xl">
              60%
            </p>

            <p className="mt-2 max-w-xs text-sm leading-relaxed text-black/60">
              Better engagement with meaningful interactions.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}