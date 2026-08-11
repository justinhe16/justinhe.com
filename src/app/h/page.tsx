import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'H — Bioluminescence | Justin He',
  description:
    'A short practice note on bioluminescence: the chemistry of cold light, counterillumination, the fish with a private red flashlight, and the jellyfish that rewired biology.',
};

export default function PageH() {
  return (
    <main className="mx-auto w-full max-w-2xl px-8 py-16 lg:px-10 lg:py-24">
      <Link href="/" className="wisteria-link section-label">
        ← Justin He
      </Link>

      <h1 className="mt-8 text-[2rem] leading-tight">Bioluminescence</h1>
      <p className="section-label mt-2">Page H · practice note</p>

      <div className="article-prose mt-10 flex flex-col gap-5 text-[1.02rem] leading-[1.75]">
        <p>
          Most of the habitable volume of this planet is deep ocean, and it is dark. In that
          volume, making your own light is not exotic — surveys of open-water animals in Monterey
          Bay found roughly three-quarters of them capable of it. Bioluminescence is the norm; we
          are the unusual ones.
        </p>

        <h2 className="mt-6 text-[1.35rem]">The chemistry</h2>
        <p>
          The reaction is simple in outline: a substrate called a luciferin is oxidized by an
          enzyme called a luciferase, and the energy comes out as a photon instead of heat. It is
          extraordinarily efficient — almost no waste warmth, which is why it is called cold
          light. &ldquo;Luciferin&rdquo; is a job description, not a molecule; the versions used by fireflies,
          jellyfish, and deep-sea shrimp are chemically unrelated, and the ability has evolved
          independently on the order of fifty separate times.
        </p>

        <h2 className="mt-6 text-[1.35rem]">Borrowed light</h2>
        <p>
          Many marine animals cannot make their luciferin at all. Coelenterazine, the most
          widespread one in the ocean, is acquired through diet and passed up the food chain.
          Others outsource the whole apparatus: anglerfish and bobtail squid cultivate symbiotic
          bacteria in dedicated organs, feeding them and controlling the output with shutters and
          reflectors, like housing a colony in a lamp.
        </p>

        <h2 className="mt-6 text-[1.35rem]">Hiding by glowing</h2>
        <p>
          The least intuitive use is camouflage. In the twilight zone, a predator looking upward
          sees prey as a silhouette against faint downwelling light. Hatchetfish and many squid
          counter this with rows of ventral photophores that emit downward at precisely the
          intensity and color of the water above, erasing the shadow. Some tune the output as
          surface light changes through the day.
        </p>

        <h2 className="mt-6 text-[1.35rem]">Private wavelengths</h2>
        <p>
          Nearly all marine bioluminescence is blue-green, because that penetrates seawater
          furthest — and so nearly every deep-sea eye is tuned to blue-green and blind to red.
          The stoplight loosejaw exploits this with a red-emitting organ plus a retinal pigment
          apparently derived from chlorophyll, giving it a searchlight its prey cannot see. Other
          animals go the opposite way: a harassed dinoflagellate flashes to advertise its
          attacker to something larger, a burglar alarm rather than a weapon.
        </p>

        <h2 className="mt-6 text-[1.35rem]">The jellyfish that changed biology</h2>
        <p>
          Osamu Shimomura, working through tens of thousands of <em>Aequorea victoria</em>, isolated a
          protein that glowed green under ultraviolet light. Green fluorescent protein became the
          standard way to make a cell&apos;s inner workings visible — splice its gene onto any protein
          you want to follow and watch it move. It earned a Nobel Prize in 2008, and it is a
          reasonable argument that basic curiosity about glowing animals paid for itself several
          times over.
        </p>
      </div>

      <nav className="mt-14 flex gap-3">
        <Link href="/i" className="bubble-link">Next: I</Link>
        <Link href="/g" className="bubble-link">G</Link>
      </nav>
    </main>
  );
}
