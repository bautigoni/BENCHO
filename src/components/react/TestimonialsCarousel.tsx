import { useCallback, useEffect, useRef, useState } from 'react';
import type { Testimonial } from '../../data/testimonials';

interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
}

const AUTOPLAY_INTERVAL_MS = 6500;

export default function TestimonialsCarousel({ testimonials }: TestimonialsCarouselProps) {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback(
    (nextIndex: number) => {
      setIndex((nextIndex + testimonials.length) % testimonials.length);
    },
    [testimonials.length]
  );

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isPaused || prefersReducedMotion || testimonials.length <= 1) return;

    timerRef.current = setInterval(() => {
      setIndex((current) => (current + 1) % testimonials.length);
    }, AUTOPLAY_INTERVAL_MS);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, testimonials.length]);

  const active = testimonials[index];

  return (
    <div
      className="relative mx-auto max-w-3xl"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div
        className="border-ink-100 shadow-ink-950/[0.03] rounded-3xl border bg-white p-8 text-center shadow-sm sm:p-12"
        role="group"
        aria-roledescription="carrusel de testimonios"
        aria-label={`Testimonio ${index + 1} de ${testimonials.length}`}
      >
        <div className="flex justify-center gap-1" aria-hidden="true">
          {Array.from({ length: 5 }).map((_, starIndex) => (
            <StarIcon key={starIndex} filled={starIndex < active.rating} />
          ))}
        </div>

        <p aria-live="polite" className="text-ink-800 mt-6 text-xl leading-relaxed text-balance sm:text-2xl">
          &ldquo;{active.quote}&rdquo;
        </p>

        <div className="mt-6">
          <p className="text-ink-950 font-semibold">{active.name}</p>
          <p className="text-ink-500 text-sm">{active.role}</p>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => goTo(index - 1)}
          aria-label="Testimonio anterior"
          className="border-ink-200 text-ink-600 hover:border-ink-950 hover:text-ink-950 inline-flex size-10 items-center justify-center rounded-full border transition-colors"
        >
          <ChevronIcon direction="left" />
        </button>

        <div className="flex items-center gap-2">
          {testimonials.map((testimonial, dotIndex) => (
            <button
              key={testimonial.name}
              type="button"
              onClick={() => goTo(dotIndex)}
              aria-label={`Ir al testimonio de ${testimonial.name}`}
              aria-current={dotIndex === index}
              className={`h-2 rounded-full transition-all ${
                dotIndex === index ? 'bg-brand-600 w-6' : 'bg-ink-200 hover:bg-ink-300 w-2'
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => goTo(index + 1)}
          aria-label="Testimonio siguiente"
          className="border-ink-200 text-ink-600 hover:border-ink-950 hover:text-ink-950 inline-flex size-10 items-center justify-center rounded-full border transition-colors"
        >
          <ChevronIcon direction="right" />
        </button>
      </div>
    </div>
  );
}

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill={filled ? '#ea4c05' : 'none'}
      stroke={filled ? '#ea4c05' : '#c5c6cb'}
      strokeWidth="1.5"
    >
      <path
        d="M12 2.5l2.9 6.02 6.6.77-4.86 4.5 1.28 6.55L12 16.9l-5.92 3.44 1.28-6.55-4.86-4.5 6.6-.77L12 2.5z"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronIcon({ direction }: { direction: 'left' | 'right' }) {
  const d = direction === 'left' ? 'M15 18l-6-6 6-6' : 'M9 18l6-6-6-6';
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
      <path d={d} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
