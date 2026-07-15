import { useCallback, useEffect, useRef, useState } from 'react';

export interface GalleryItem {
  thumbSrc: string;
  fullSrc: string;
  width: number;
  height: number;
  alt: string;
  project: string;
  category: string;
}

interface GalleryLightboxProps {
  images: GalleryItem[];
}

export default function GalleryLightbox({ images }: GalleryLightboxProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  const isOpen = activeIndex !== null;

  const openAt = useCallback((index: number) => {
    triggerRef.current = document.activeElement as HTMLElement;
    setActiveIndex(index);
  }, []);

  const close = useCallback(() => {
    setActiveIndex(null);
    triggerRef.current?.focus();
  }, []);

  const showPrev = useCallback(() => {
    setActiveIndex((current) => (current === null ? null : (current - 1 + images.length) % images.length));
  }, [images.length]);

  const showNext = useCallback(() => {
    setActiveIndex((current) => (current === null ? null : (current + 1) % images.length));
  }, [images.length]);

  useEffect(() => {
    if (!isOpen) return;
    closeButtonRef.current?.focus();
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
      if (event.key === 'ArrowLeft') showPrev();
      if (event.key === 'ArrowRight') showNext();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.removeProperty('overflow');
    };
  }, [isOpen, close, showPrev, showNext]);

  const active = activeIndex !== null ? images[activeIndex] : null;

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
        {images.map((item, index) => (
          <button
            key={item.fullSrc}
            type="button"
            onClick={() => openAt(index)}
            className="group bg-ink-100 relative aspect-square overflow-hidden rounded-2xl"
            aria-label={`Ampliar imagen: ${item.project}`}
          >
            <img
              src={item.thumbSrc}
              alt={item.alt}
              width={item.width}
              height={item.height}
              loading="lazy"
              decoding="async"
              className="size-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="from-ink-950/70 absolute inset-0 flex items-end bg-gradient-to-t via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100">
              <span className="p-3 text-left text-sm font-medium text-white">{item.project}</span>
            </div>
          </button>
        ))}
      </div>

      {isOpen && active && (
        // Backdrop click-to-close is a mouse convenience; the close button and
        // Escape key below already provide full keyboard/screen-reader access.
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Imagen ampliada: ${active.project}`}
          className="bg-ink-950/95 animate-fade-in fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-sm sm:p-8"
          onClick={(event) => {
            if (event.target === event.currentTarget) close();
          }}
        >
          <button
            ref={closeButtonRef}
            type="button"
            onClick={close}
            aria-label="Cerrar imagen ampliada"
            className="absolute top-4 right-4 inline-flex size-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:top-6 sm:right-6"
          >
            <CloseIcon />
          </button>

          <button
            type="button"
            onClick={showPrev}
            aria-label="Imagen anterior"
            className="absolute left-2 inline-flex size-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:left-6"
          >
            <ChevronIcon direction="left" />
          </button>

          <figure className="flex max-h-full max-w-4xl flex-col items-center gap-4">
            <img
              src={active.fullSrc}
              alt={active.alt}
              width={active.width}
              height={active.height}
              className="max-h-[75vh] w-auto rounded-xl object-contain shadow-2xl"
            />
            <figcaption className="text-center text-sm text-white/80">
              <span className="font-semibold text-white">{active.project}</span> &mdash; {active.category}
            </figcaption>
          </figure>

          <button
            type="button"
            onClick={showNext}
            aria-label="Imagen siguiente"
            className="absolute right-2 inline-flex size-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-6"
          >
            <ChevronIcon direction="right" />
          </button>
        </div>
      )}
    </>
  );
}

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
    </svg>
  );
}

function ChevronIcon({ direction }: { direction: 'left' | 'right' }) {
  const d = direction === 'left' ? 'M15 18l-6-6 6-6' : 'M9 18l6-6-6-6';
  return (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d={d} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
