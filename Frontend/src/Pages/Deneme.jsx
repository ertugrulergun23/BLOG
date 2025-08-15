import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HeroParallax() {
  const containerRef = useRef(null);
  const bgRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax effect for background
      gsap.to(bgRef.current, {
        y: "-20%",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Fade-in for text content
      gsap.from(contentRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    }, containerRef);

    return () => ctx.revert(); // cleanup
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen overflow-hidden">
      {/* Parallax background */}
      <div
        ref={bgRef}
        className="absolute inset-0 bg-cover bg-center scale-110"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1517694712202-14dd9538aa97')`,
        }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 z-10" />

      {/* Foreground content */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center text-white text-center px-4">
        <div ref={contentRef}>
          <h1 className="text-4xl md:text-6xl font-bold">Inspiring Headline</h1>
          <p className="mt-4 text-lg md:text-xl max-w-xl mx-auto">
            This is a parallax hero section built with React, Tailwind CSS, and GSAP ScrollTrigger.
          </p>
          <button className="mt-6 px-6 py-3 bg-white text-black rounded-lg font-semibold hover:bg-gray-200 transition">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}
