import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'B — A History of Martians | Justin He',
  description:
    'A short practice note on the history of Martians as an idea: canals, invasion novels, the Face on Mars, and what the spacecraft actually found.',
};

export default function PageB() {
  return (
    <main className="mx-auto w-full max-w-2xl px-8 py-16 lg:px-10 lg:py-24">
      <Link href="/" className="wisteria-link section-label">
        ← Justin He
      </Link>

      <h1 className="mt-8 text-[2rem] leading-tight">A History of Martians</h1>
      <p className="section-label mt-2">Page B · practice note</p>

      <div className="article-prose mt-10 flex flex-col gap-5 text-[1.02rem] leading-[1.75]">
        <p>
          No Martians have ever been found. What follows is a history of the idea of them — a
          two-century record of humans looking at a red dot and filling in the rest.
        </p>

        <h2 className="mt-6 text-[1.35rem]">The canals (1877–1910)</h2>
        <p>
          In 1877 the Italian astronomer Giovanni Schiaparelli mapped faint linear markings on
          Mars and called them <em>canali</em> — Italian for channels, meaning natural grooves.
          English coverage translated it as &ldquo;canals,&rdquo; a word that implies engineers. Percival
          Lowell took the implication and ran: from his observatory in Flagstaff he published
          three books arguing that a dying civilization was irrigating a drying planet from its
          polar caps. Better telescopes eventually showed the canals were an artifact of the eye
          connecting scattered features at the limit of resolution.
        </p>

        <h2 className="mt-6 text-[1.35rem]">The invaders (1897–1938)</h2>
        <p>
          H. G. Wells published <em>The War of the Worlds</em> in 1897, one year before Lowell&apos;s
          first Mars book, and inverted the sympathy: the dying civilization does not irrigate,
          it emigrates. The novel established the template — the tentacled aggressor, the useless
          artillery, the microbial ending. Orson Welles&apos;s 1938 radio adaptation is remembered
          for a nationwide panic that, per later research, was mostly manufactured by newspapers
          with a grudge against radio.
        </p>

        <h2 className="mt-6 text-[1.35rem]">The sympathetic Martian (1912–1963)</h2>
        <p>
          Edgar Rice Burroughs&apos;s Barsoom gave Mars a romance and a vocabulary. Ray Bradbury&apos;s
          <em> The Martian Chronicles</em> (1950) made the Martians elegiac — telepathic, golden-eyed,
          already nearly gone when we arrive, so that the colonists become the Martians by the
          last page. Robert Heinlein&apos;s <em>Stranger in a Strange Land</em> (1961) reduced the species
          to a single human raised by them and gave English the verb <em>grok</em>.
        </p>

        <h2 className="mt-6 text-[1.35rem]">The flyby (1965)</h2>
        <p>
          Mariner 4 returned twenty-two photographs of a cratered, apparently lifeless surface,
          and measured an atmosphere under one percent of Earth&apos;s. The canals were gone for good.
          Viking 1 and 2 landed in 1976 carrying biology experiments; one, the Labeled Release
          test, produced a signal consistent with metabolism, but the absence of any detected
          organic molecules led most scientists to a chemical explanation. The debate has never
          fully closed.
        </p>

        <h2 className="mt-6 text-[1.35rem]">The Face (1976–2001)</h2>
        <p>
          A Viking orbiter photographed a mesa in Cydonia that, at that resolution and sun angle,
          looked like a human face. It sustained twenty-five years of books and documentaries
          until Mars Global Surveyor re-imaged it in high resolution and revealed an ordinary
          eroded hill — a second Lowell, on a shorter timescale.
        </p>

        <h2 className="mt-6 text-[1.35rem]">What is actually there</h2>
        <p>
          Rovers have since established that Mars had standing water, neutral-pH lakes, and the
          organic chemistry that life would need. Curiosity has measured seasonal methane
          fluctuations that no one has explained to everyone&apos;s satisfaction. The live question is
          no longer whether Martians built canals, but whether anything microbial ever got
          started — and whether we would recognize it if we tripped over it.
        </p>

        <p>
          The through-line is consistent: every generation gets exactly the Martians its
          instruments allow it to imagine.
        </p>
      </div>

      <nav className="mt-14 flex gap-3">
        <Link href="/c" className="bubble-link">
          Next: C
        </Link>
        <Link href="/a" className="bubble-link">
          A
        </Link>
      </nav>
    </main>
  );
}
