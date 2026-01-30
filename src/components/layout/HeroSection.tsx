'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const AnimatedBrainSvg = () => (
    <svg
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full max-w-sm mx-auto md:max-w-md"
      aria-labelledby="svg-title"
    >
      <title id="svg-title">Animated illustration of an AI brain with gears</title>
      <defs>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g className="brain-paths" stroke="hsl(var(--primary) / 0.5)" strokeWidth="1.5" fill="none">
        {/* Brain-like paths */}
        <path d="M 100,20 C 60,20 40,60 60,100 C 30,140 60,180 100,180 C 140,180 170,140 140,100 C 160,60 140,20 100,20 Z" />
        <path d="M 100,20 C 120,40 130,70 120,100" />
        <path d="M 100,180 C 80,160 70,130 80,100" />
        <path d="M 60,100 C 80,80 120,80 140,100" />
        <path d="M 80,100 C 90,120 110,120 120,100" />
      </g>
      <g className="gears" fill="hsl(var(--primary) / 0.2)" stroke="hsl(var(--primary))" strokeWidth="1">
        {/* Center Gear */}
        <g className="gear-1" transform="translate(100 100)">
          <path d="M 20 0 A 20 20 0 0 1 -10 17.32 L -12 20.78 L -16 19.05 L -14.29 14.95 A 20 20 0 0 1 -14.29 -14.95 L -16 -19.05 L -12 -20.78 L -10 -17.32 A 20 20 0 0 1 20 0 L 24 0 L 22.5 4 L 20 3 L 20 0 Z M 0 0" transform="rotate(0)"/>
          <circle cx="0" cy="0" r="12" fill="hsl(var(--background))" />
        </g>
        {/* Small Gear 1 */}
        <g className="gear-2" transform="translate(65 65)">
          <path d="M 10 0 A 10 10 0 0 1 -5 8.66 L -6 10.39 L -8 9.52 L -7.14 7.47 A 10 10 0 0 1 -7.14 -7.47 L -8 -9.52 L -6 -10.39 L -5 -8.66 A 10 10 0 0 1 10 0 L 12 0 L 11.25 2 L 10 1.5 L 10 0 Z M 0 0" />
          <circle cx="0" cy="0" r="6" fill="hsl(var(--background))" />
        </g>
        {/* Small Gear 2 */}
        <g className="gear-3" transform="translate(135 135)">
          <path d="M 12 0 A 12 12 0 0 1 -6 10.39 L -7.2 12.47 L -9.6 11.43 L -8.57 8.97 A 12 12 0 0 1 -8.57 -8.97 L -9.6 -11.43 L -7.2 -12.47 L -6 -10.39 A 12 12 0 0 1 12 0 L 14.4 0 L 13.5 2.4 L 12 1.8 L 12 0 Z M 0 0" />
           <circle cx="0" cy="0" r="7" fill="hsl(var(--background))" />
        </g>
      </g>
      <style jsx>{`
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes rotate-back {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        .gear-1 {
          transform-origin: 100px 100px;
          animation: rotate 20s linear infinite;
        }
        .gear-2 {
          transform-origin: 65px 65px;
          animation: rotate-back 15s linear infinite;
        }
        .gear-3 {
          transform-origin: 135px 135px;
          animation: rotate 18s linear infinite;
        }
      `}</style>
    </svg>
);


export function HeroSection() {
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate headline and CTA
      gsap.fromTo(
        '.hero-content > *',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 1,
          ease: 'power3.out',
          delay: 0.2,
        }
      );

      // Animate SVG paths drawing effect
      const brainPaths = gsap.utils.toArray('.brain-paths path');
      brainPaths.forEach((path: any) => {
        const length = path.getTotalLength();
        gsap.set(path, {
            strokeDasharray: length,
            strokeDashoffset: length,
        });
        gsap.to(path, {
            strokeDashoffset: 0,
            duration: 2,
            ease: 'power1.inOut',
            scrollTrigger: {
                trigger: heroRef.current,
                start: 'top center',
                toggleActions: 'play none none none',
            },
        });
      });

      // Parallax effect on the SVG
      gsap.to('.hero-svg-container', {
        y: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative w-full min-h-[80vh] bg-gradient-to-b from-gray-50 to-white flex items-center justify-center overflow-hidden py-24 md:py-32">
        <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div className="hero-content text-center md:text-left space-y-6">
                <h1 className="text-4xl md:text-6xl font-bold font-headline">
                    Your 24/7 AI Chief of Staff
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto md:mx-0">
                    Empower Your Startup Journey with Intelligent Strategy and Automation.
                </p>
                <div className="pt-4">
                    <Button size="lg" asChild className="bg-primary hover:shadow-lg hover:shadow-accent/50 transition-shadow">
                        <Link href="/signup">
                            Start Free Trial
                        </Link>
                    </Button>
                </div>
            </div>
            <div className="hero-svg-container">
                <AnimatedBrainSvg />
            </div>
        </div>
    </section>
  );
}
