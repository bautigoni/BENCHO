import { motion, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from 'motion/react';
import { useRef } from 'react';

export interface ScrollStoryStage {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  width: number;
  height: number;
}

interface ScrollStoryStackProps {
  stages: ScrollStoryStage[];
}

export default function ScrollStoryStack({ stages }: ScrollStoryStackProps) {
  const storyRef = useRef<HTMLDivElement | null>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: storyRef,
    offset: ['start start', 'end end']
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 92,
    damping: 30,
    mass: 0.42,
    restDelta: 0.0005
  });

  if (reduceMotion) {
    return (
      <div className="mt-14 grid gap-6 sm:mt-18">
        {stages.map((stage, index) => (
          <StaticCard key={stage.title} stage={stage} index={index} />
        ))}
      </div>
    );
  }

  return (
    <div ref={storyRef} className="relative mt-10 h-[225dvh] sm:mt-12">
      <div className="sticky top-0 flex h-dvh items-center py-20 sm:py-22">
        <div className="relative h-[76dvh] max-h-[48rem] min-h-[31rem] w-full">
          {stages.map((stage, index) => (
            <AnimatedCard
              key={stage.title}
              stage={stage}
              index={index}
              count={stages.length}
              progress={progress}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function AnimatedCard({
  stage,
  index,
  count,
  progress
}: {
  stage: ScrollStoryStage;
  index: number;
  count: number;
  progress: MotionValue<number>;
}) {
  const lastIndex = count - 1;
  const center = lastIndex === 0 ? 0 : index / lastIndex;
  const nextCenter = lastIndex === 0 ? 1 : Math.min(1, (index + 1) / lastIndex);
  const previousCenter = lastIndex === 0 ? 0 : Math.max(0, (index - 1) / lastIndex);
  const enterStart = previousCenter + (center - previousCenter) * 0.28;

  const transformStops =
    index === 0
      ? [0, nextCenter]
      : index === lastIndex
        ? [enterStart, center]
        : [enterStart, center, nextCenter];
  const yValues =
    index === 0 ? ['0%', '-3.5%'] : index === lastIndex ? ['108%', '0%'] : ['108%', '0%', '-3.5%'];
  const scaleValues = index === 0 ? [1, 0.935] : index === lastIndex ? [0.97, 1] : [0.97, 1, 0.935];
  const opacityValues = index === 0 ? [1, 0.74] : index === lastIndex ? [0.98, 1] : [0.98, 1, 0.74];
  const y = useTransform(progress, transformStops, yValues);
  const scale = useTransform(progress, transformStops, scaleValues);
  const opacity = useTransform(progress, transformStops, opacityValues);

  return (
    <motion.article
      style={{ y, scale, opacity, zIndex: index + 1 }}
      className="bg-surface-dark absolute inset-0 grid origin-center overflow-hidden rounded-[1.75rem] shadow-[0_2rem_6rem_rgba(48,48,51,0.24)] will-change-transform md:grid-cols-[1.35fr_0.65fr]"
    >
      <CardContents stage={stage} index={index} />
    </motion.article>
  );
}

function StaticCard({ stage, index }: { stage: ScrollStoryStage; index: number }) {
  return (
    <article className="bg-surface-dark grid min-h-[34rem] overflow-hidden rounded-[1.75rem] md:grid-cols-[1.35fr_0.65fr]">
      <CardContents stage={stage} index={index} />
    </article>
  );
}

function CardContents({ stage, index }: { stage: ScrollStoryStage; index: number }) {
  return (
    <>
      <div className="relative min-h-0 overflow-hidden">
        <img
          src={stage.imageSrc}
          alt={stage.imageAlt}
          width={stage.width}
          height={stage.height}
          loading={index === 0 ? 'eager' : 'lazy'}
          decoding="async"
          className="size-full object-cover"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_58%,rgba(28,28,30,0.2))]"
          aria-hidden="true"
        />
      </div>

      <div className="bg-surface-dark flex min-h-[13rem] flex-col justify-between p-6 text-white sm:p-8 lg:p-10">
        <span className="text-brand-500 text-sm font-semibold tabular-nums">
          {String(index + 1).padStart(2, '0')}
        </span>
        <div>
          <h3 className="text-[clamp(2rem,4vw,4.25rem)] leading-none font-semibold tracking-[-0.055em] text-white">
            {stage.title}
          </h3>
          <p className="mt-5 max-w-sm text-base leading-relaxed text-pretty text-white/68">
            {stage.description}
          </p>
        </div>
      </div>
    </>
  );
}
