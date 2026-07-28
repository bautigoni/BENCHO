import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';

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

const SPEED = 34;
const DRAG_THRESHOLD = 7;
const DWELL_FIRST = 90;
const DWELL_CHANGE = 200;
const SETTLE_MS = 450;
const EXIT_DELAY = 380;
const FIT_MARGIN = 28;

export default function GalleryLightbox({ images }: GalleryLightboxProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const galleryRef = useRef<HTMLDivElement | null>(null);
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
    const root = galleryRef.current;
    const flow = root?.querySelector<HTMLElement>('.gallery-flow');
    const shift = root?.querySelector<HTMLElement>('[data-gallery-shift]');
    if (!root || !flow || !shift) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const getItems = () => Array.from(shift.querySelectorAll<HTMLElement>('.gallery-item'));

    let x = 0;
    let velocity = 0;
    let half = 0;
    let hovering = false;
    let dragging = false;
    let suppressClick = false;
    let activeElement: HTMLElement | null = null;
    let lastActivation = 0;
    let dwellTimer = 0;
    let exitTimer = 0;
    let animationFrame = 0;
    let flipFrame = 0;
    let destroyed = false;
    const pointer = { x: -1, y: -1 };

    const measureHalf = () => {
      half = shift.scrollWidth / 2;
    };

    const resizeObserver = new ResizeObserver(measureHalf);
    resizeObserver.observe(shift);
    measureHalf();

    const imageLoadHandlers = Array.from(shift.querySelectorAll<HTMLImageElement>('img')).map((image) => {
      if (image.complete) return null;
      image.addEventListener('load', measureHalf, { once: true });
      return { image, handler: measureHalf };
    });

    let lastTime = performance.now();
    const frame = (now: number) => {
      if (destroyed) return;
      const delta = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;

      if (!dragging) {
        if (Math.abs(velocity) > 12) {
          x += velocity * delta;
          velocity *= Math.pow(0.002, delta);
        } else {
          velocity = 0;
          const canAutoplay = !reduced && !hovering && !activeElement && !document.hidden;
          if (canAutoplay) x -= SPEED * delta;
        }
      }

      if (half > 0) {
        if (x <= -half) x += half;
        if (x > 0) x -= half;
      }

      flow.style.transform = `translate3d(${x}px, 0, 0)`;
      animationFrame = window.requestAnimationFrame(frame);
    };
    animationFrame = window.requestAnimationFrame(frame);

    const currentShift = () => {
      const transform = getComputedStyle(shift).transform;
      if (!transform || transform === 'none') return 0;
      try {
        return new DOMMatrixReadOnly(transform).m41;
      } catch {
        const values = transform
          .match(/matrix(?:3d)?\((.+)\)/)?.[1]
          ?.split(',')
          .map(Number);
        return values?.length === 16 ? (values[12] ?? 0) : (values?.[4] ?? 0);
      }
    };

    const setShift = (value: number) => {
      shift.style.setProperty('--shift', `${value}px`);
    };

    const applyClasses = (target: HTMLElement | null) => {
      for (const item of getItems()) {
        if (!target) {
          item.classList.remove('is-active', 'is-dim');
          continue;
        }

        const sameTrack = item.parentElement === target.parentElement;
        item.classList.toggle('is-active', item === target);
        item.classList.toggle('is-dim', sameTrack && item !== target);
        if (!sameTrack) item.classList.remove('is-active', 'is-dim');
      }
    };

    const flipTo = (target: HTMLElement | null) => {
      const allItems = getItems();
      const first = allItems.map((item) => {
        const rect = item.getBoundingClientRect();
        return { item, width: rect.width, height: rect.height };
      });

      root.classList.add('gallery-measuring');
      applyClasses(target);

      let targetShift = 0;
      if (target) {
        const rootRect = root.getBoundingClientRect();
        const targetRect = target.getBoundingClientRect();
        const shiftInFlight = currentShift();
        const overRight = targetRect.right - (rootRect.right - FIT_MARGIN);
        const overLeft = rootRect.left + FIT_MARGIN - targetRect.left;

        if (overRight > 0) targetShift = shiftInFlight - overRight;
        else if (overLeft > 0) targetShift = shiftInFlight + overLeft;
        else targetShift = shiftInFlight;
      }

      for (const state of first) {
        state.item.style.width = `${state.width}px`;
        state.item.style.height = `${state.height}px`;
      }

      void root.offsetWidth;
      root.classList.remove('gallery-measuring');
      window.cancelAnimationFrame(flipFrame);
      flipFrame = window.requestAnimationFrame(() => {
        for (const state of first) {
          state.item.style.removeProperty('width');
          state.item.style.removeProperty('height');
        }
        setShift(target ? targetShift : 0);
      });
    };

    const activate = (element: HTMLElement) => {
      if (element === activeElement) return;
      activeElement = element;
      lastActivation = performance.now();
      flipTo(element);
    };

    const deactivate = () => {
      if (!activeElement) return;
      activeElement = null;
      lastActivation = performance.now();
      flipTo(null);
    };

    const tryActivate = () => {
      const sinceActivation = performance.now() - lastActivation;
      if (sinceActivation < SETTLE_MS) {
        dwellTimer = window.setTimeout(tryActivate, SETTLE_MS - sinceActivation);
        return;
      }

      const underPointer = document
        .elementFromPoint(pointer.x, pointer.y)
        ?.closest<HTMLElement>('.gallery-item');
      if (underPointer && shift.contains(underPointer) && underPointer !== activeElement) {
        activate(underPointer);
      }
    };

    const onMouseMove = (event: MouseEvent) => {
      if (dragging) return;
      if (event.clientX === pointer.x && event.clientY === pointer.y) return;
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      window.clearTimeout(dwellTimer);
      dwellTimer = window.setTimeout(tryActivate, activeElement ? DWELL_CHANGE : DWELL_FIRST);
    };

    const onMouseEnter = () => {
      hovering = true;
      window.clearTimeout(exitTimer);
    };

    const onMouseLeave = () => {
      hovering = false;
      window.clearTimeout(dwellTimer);
      exitTimer = window.setTimeout(deactivate, EXIT_DELAY);
    };

    let startX = 0;
    let startOffset = 0;
    let history: Array<{ time: number; x: number }> = [];

    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType === 'mouse' && event.button !== 0) return;
      startX = event.clientX;
      startOffset = x;
      velocity = 0;
      history = [{ time: performance.now(), x: event.clientX }];
    };

    const onPointerMove = (event: PointerEvent) => {
      if (history.length === 0) return;
      const delta = event.clientX - startX;

      if (!dragging && Math.abs(delta) > DRAG_THRESHOLD) {
        dragging = true;
        suppressClick = true;
        root.classList.add('is-dragging');
        try {
          root.setPointerCapture(event.pointerId);
        } catch {
          // Pointer capture is an enhancement; window listeners keep drag alive.
        }
        window.clearTimeout(dwellTimer);
        deactivate();
      }

      if (!dragging) return;
      x = startOffset + delta;
      const now = performance.now();
      history.push({ time: now, x: event.clientX });
      while (history.length > 2 && now - (history[0]?.time ?? now) > 140) history.shift();
    };

    const endDrag = (event: PointerEvent) => {
      if (dragging) {
        const now = performance.now();
        const recent = history.filter((point) => now - point.time <= 120);
        const first = recent[0] ?? history[0];
        const last = history[history.length - 1];

        if (!first || !last || now - last.time > 90 || last.x === first.x) {
          velocity = 0;
        } else {
          const delta = Math.max(0.016, (last.time - first.time) / 1000);
          velocity = Math.max(-2400, Math.min(2400, (last.x - first.x) / delta));
        }

        dragging = false;
        root.classList.remove('is-dragging');
        try {
          root.releasePointerCapture(event.pointerId);
        } catch {
          // It may already have been released after leaving the element.
        }
        window.setTimeout(() => {
          suppressClick = false;
        }, 0);
      }
      history = [];
    };

    const onClick = (event: MouseEvent) => {
      if (!suppressClick) return;
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
    };

    root.addEventListener('mousemove', onMouseMove);
    root.addEventListener('mouseenter', onMouseEnter);
    root.addEventListener('mouseleave', onMouseLeave);
    root.addEventListener('pointerdown', onPointerDown);
    root.addEventListener('click', onClick, true);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', endDrag);
    window.addEventListener('pointercancel', endDrag);

    return () => {
      destroyed = true;
      window.cancelAnimationFrame(animationFrame);
      window.cancelAnimationFrame(flipFrame);
      window.clearTimeout(dwellTimer);
      window.clearTimeout(exitTimer);
      resizeObserver.disconnect();
      for (const entry of imageLoadHandlers) {
        if (entry) entry.image.removeEventListener('load', entry.handler);
      }
      root.removeEventListener('mousemove', onMouseMove);
      root.removeEventListener('mouseenter', onMouseEnter);
      root.removeEventListener('mouseleave', onMouseLeave);
      root.removeEventListener('pointerdown', onPointerDown);
      root.removeEventListener('click', onClick, true);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', endDrag);
      window.removeEventListener('pointercancel', endDrag);
    };
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
  const galleryStyle = { '--gc-n': images.length } as CSSProperties;

  return (
    <>
      <div
        ref={galleryRef}
        className="gallery-carousel -mx-6 sm:-mx-8 lg:-mx-12"
        data-gallery
        style={galleryStyle}
        role="region"
        aria-label="Galería de proyectos en movimiento"
      >
        <div className="gallery-flow">
          <div className="gallery-shift" data-gallery-shift>
            <GalleryTrack images={images} onOpen={openAt} />
            <GalleryTrack images={images} onOpen={openAt} clone />
          </div>
        </div>
      </div>

      {isOpen && active && (
        // Backdrop click-to-close is a mouse convenience; the close button and
        // Escape key below already provide full keyboard/screen-reader access.
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Imagen ampliada: ${active.project}`}
          className="bg-surface-dark/95 animate-fade-in fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-sm sm:p-8"
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
              <span className="font-semibold text-white">{active.project}</span>
              <span aria-hidden="true"> / </span>
              {active.category}
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

function GalleryTrack({
  images,
  onOpen,
  clone = false
}: {
  images: GalleryItem[];
  onOpen: (index: number) => void;
  clone?: boolean;
}) {
  return (
    <ul className="gallery-track" aria-hidden={clone || undefined}>
      {images.map((item, index) => (
        <li className="gallery-item" key={`${clone ? 'clone' : 'original'}-${item.fullSrc}`}>
          <button
            type="button"
            className="gallery-card-hit"
            tabIndex={clone ? -1 : 0}
            aria-label={clone ? undefined : `Ampliar imagen: ${item.project}`}
            onClick={() => onOpen(index)}
          >
            <img
              src={item.thumbSrc}
              alt={clone ? '' : item.alt}
              width={item.width}
              height={item.height}
              loading="lazy"
              decoding="async"
              draggable={false}
            />
            <div className="gallery-caption">
              <p className="gallery-caption-title">{item.project}</p>
              <p>{item.category}</p>
            </div>
          </button>
        </li>
      ))}
    </ul>
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
