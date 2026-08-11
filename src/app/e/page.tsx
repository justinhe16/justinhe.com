import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'E — The Antikythera Mechanism | Justin He',
  description:
    'A short practice note on the Antikythera mechanism: a corroded bronze gearwork from the second century BCE that predicted eclipses, and the imaging that decoded it.',
};

export default function PageE() {
  return (
    <main className="mx-auto w-full max-w-2xl px-8 py-16 lg:px-10 lg:py-24">
      <Link href="/" className="wisteria-link section-label">
        ← Justin He
      </Link>

      <h1 className="mt-8 text-[2rem] leading-tight">The Antikythera Mechanism</h1>
      <p className="section-label mt-2">Page E · practice note</p>

      <div className="article-prose mt-10 flex flex-col gap-5 text-[1.02rem] leading-[1.75]">
        <p>
          In 1901, sponge divers sheltering from a storm off the Greek island of Antikythera
          found a first-century BCE shipwreck full of bronze and marble statues. Among the haul
          was a shoebox-sized lump of corroded bronze that nobody could place. It turned out to
          contain gears.
        </p>

        <h2 className="mt-6 text-[1.35rem]">What it is</h2>
        <p>
          The mechanism is a hand-cranked geared calculator, built somewhere around 150–100 BCE,
          that modeled the sky. Turning the crank advanced a date and drove pointers showing the
          positions of the Sun and Moon against the zodiac, the phase of the Moon via a small
          rotating silver-and-black ball, and the state of several interlocking calendars. Thirty
          gears survive; reconstructions suggest the original had substantially more.
        </p>

        <h2 className="mt-6 text-[1.35rem]">The eclipse dial</h2>
        <p>
          The back of the device carried two spiral dials. One tracked the 19-year Metonic cycle,
          which reconciles lunar months with solar years; the other tracked the 223-month Saros
          cycle, after which eclipses repeat in near-identical sequence. Glyphs on the Saros
          spiral marked which months would carry a solar or lunar eclipse, and inscriptions gave
          the expected hour and even the color the eclipse was predicted to show.
        </p>

        <h2 className="mt-6 text-[1.35rem]">The clever part</h2>
        <p>
          The Moon does not move at a constant rate; it runs faster near perigee. The builders
          modeled this with a pin-and-slot arrangement — one gear&apos;s pin riding in another&apos;s slot,
          the two mounted on slightly offset axes, so the output speed varies sinusoidally over
          each orbit. The whole assembly is itself mounted on a rotating gear to precess the
          lunar apogee. It is a mechanical encoding of Hipparchus&apos;s lunar theory, and it is the
          kind of thing that is difficult to arrive at by accident.
        </p>

        <h2 className="mt-6 text-[1.35rem]">How it was read</h2>
        <p>
          The fragments are fused and unopenable, so progress has tracked imaging technology.
          Derek de Solla Price used gamma radiography in the 1970s to establish the gear counts.
          In 2005 a research team brought an eight-ton microfocus X-ray CT scanner to Athens and
          resolved the internal tooth counts and thousands of characters of previously invisible
          inscription — effectively a user manual on the plates. Much of what is now considered
          settled comes from that scan.
        </p>

        <h2 className="mt-6 text-[1.35rem]">The gap</h2>
        <p>
          The uncomfortable part is what comes after. Nothing of comparable gearing complexity
          survives, or is clearly described, for roughly fourteen centuries, until the
          astronomical clocks of medieval Europe. Whether that reflects a genuine loss of
          capability or only a loss of evidence — bronze being eminently recyclable — is
          unresolved. A single storm and a single shipwreck are why we know about it at all.
        </p>
      </div>

      <nav className="mt-14 flex gap-3">
        <Link href="/f" className="bubble-link">Next: F</Link>
        <Link href="/d" className="bubble-link">D</Link>
      </nav>
    </main>
  );
}
