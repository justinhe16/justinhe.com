import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'F — How Birds Learn to Sing | Justin He',
  description:
    'A short practice note on vocal learning in songbirds: critical periods, babbling, regional dialects, and why neuroscientists study finches to understand speech.',
};

export default function PageF() {
  return (
    <main className="mx-auto w-full max-w-2xl px-8 py-16 lg:px-10 lg:py-24">
      <Link href="/" className="wisteria-link section-label">
        ← Justin He
      </Link>

      <h1 className="mt-8 text-[2rem] leading-tight">How Birds Learn to Sing</h1>
      <p className="section-label mt-2">Page F · practice note</p>

      <div className="article-prose mt-10 flex flex-col gap-5 text-[1.02rem] leading-[1.75]">
        <p>
          Most animals are born knowing every sound they will ever make. A small set — songbirds,
          parrots, hummingbirds, some bats and cetaceans, and us — have to learn theirs by
          listening. That short list is why a finch ended up in neuroscience labs.
        </p>

        <h2 className="mt-6 text-[1.35rem]">Two phases</h2>
        <p>
          Song learning splits cleanly. In the sensory phase, a young bird memorizes the song of
          an adult tutor without producing much of anything; the template is stored for weeks or
          months. In the sensorimotor phase, it starts practicing — first subsong, a formless
          rambling that is genuinely analogous to human infant babbling, then plastic song that
          drifts closer to the target, then crystallized song, which in many species locks for
          life.
        </p>

        <h2 className="mt-6 text-[1.35rem]">Hearing yourself</h2>
        <p>
          The correction loop runs on auditory feedback. A bird deafened before the sensorimotor
          phase never produces normal song even if it heard a perfect tutor beforehand, because
          it cannot compare its output to the stored template. Deafen it after crystallization
          and the song degrades slowly instead — the motor program has become partly independent
          of the ear.
        </p>

        <h2 className="mt-6 text-[1.35rem]">Critical periods</h2>
        <p>
          The window closes. A white-crowned sparrow raised in isolation past its sensory period
          produces a rough, abnormal song and cannot fully repair it later. This maps
          uncomfortably well onto human second-language acquisition, and it is one of the reasons
          the comparison is taken seriously rather than treated as a metaphor.
        </p>

        <h2 className="mt-6 text-[1.35rem]">Dialects</h2>
        <p>
          Because song is transmitted by imitation, it accumulates regional variation the way
          language does. Neighboring populations of the same sparrow species can hold measurably
          different dialects, and those dialects shift over decades as copying errors propagate.
          Cultural evolution, in an animal that will never write anything down.
        </p>

        <h2 className="mt-6 text-[1.35rem]">The circuitry</h2>
        <p>
          Songbirds have a discrete set of forebrain nuclei devoted to song — HVC and RA driving
          production, Area X and LMAN forming a basal-ganglia loop that injects variability
          during practice and evaluates the result. Lesion LMAN in a juvenile and the exploratory
          babbling stops. The system is a rare case where a complex learned behavior maps onto
          circuitry small enough to record from cell by cell, which is why work on the
          <em> FOXP2</em> gene, on reinforcement learning, and on speech disorders keeps coming back
          to zebra finches.
        </p>
      </div>

      <nav className="mt-14 flex gap-3">
        <Link href="/g" className="bubble-link">Next: G</Link>
        <Link href="/e" className="bubble-link">E</Link>
      </nav>
    </main>
  );
}
