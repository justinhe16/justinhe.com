import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Z — Gen 1 Glitches | Justin He',
  description:
    'A short practice note on the broken parts of Pokémon Red and Blue: MissingNo., the truck that never had Mew under it, and the bugs that shaped a generation.',
};

export default function PageZ() {
  return (
    <main className="mx-auto w-full max-w-2xl px-8 py-16 lg:px-10 lg:py-24">
      <Link href="/" className="wisteria-link section-label">
        ← Justin He
      </Link>

      <h1 className="mt-8 text-[2rem] leading-tight">Gen 1 Glitches</h1>
      <p className="section-label mt-2">Page Z · practice note</p>

      <div className="article-prose mt-10 flex flex-col gap-5 text-[1.02rem] leading-[1.75]">
        <p>
          Pokémon Red and Blue are held together with tape. The games shipped after a development
          cycle that nearly bankrupted Game Freak, onto a console Nintendo had already written
          off, and the code shows it. The bugs became a shared folklore — the rare case where a
          generation of kids collectively reverse-engineered a product by rumor.
        </p>

        <h2 className="mt-6 text-[1.35rem]">MissingNo.</h2>
        <p>
          The famous one. Talk to the old man in Viridian City who demonstrates catching a
          Weedle, then fly to Cinnabar Island and surf along the strip of coastline on the east
          edge. You will run into a scrambled column of pixels called MissingNo.
        </p>
        <p>
          The cause is mundane and elegant. The tutorial temporarily overwrites the buffer
          holding your name so the demo can display &ldquo;OLD MAN&rdquo;, and the game never fully restores
          it. The Cinnabar coast tiles have no encounter table of their own, so the game reads
          whatever is sitting in that memory as a list of species indices — which is now the
          letters of your name. Different names summon different glitch Pokémon. You are
          literally battling your own save file.
        </p>

        <h2 className="mt-6 text-[1.35rem]">Why it duplicated your Rare Candies</h2>
        <p>
          Encountering MissingNo. bumps the quantity of the sixth item in your bag to over a
          hundred, which is why an entire playground economy ran on it. This is a side effect of
          the glitch species writing into memory it has no business touching — the same reason it
          scrambles your Hall of Fame records and corrupts your sprites until you reset. The
          damage is almost always cosmetic, which is the only reason the trick has a good
          reputation.
        </p>

        <h2 className="mt-6 text-[1.35rem]">The truck</h2>
        <p>
          There is a truck near the S.S. Anne dock in Vermilion City. It is real, it is in the
          game data, and there is nothing under it. The rumor claimed that using Strength to move
          it revealed Mew, which is false in every version. What makes the story interesting is
          that the truck is otherwise unreachable — the ship departs before you can get Surf — so
          the object exists in a place almost no player should ever stand. An unexplained asset
          in an unreachable spot is exactly the shape of thing a rumor grows on.
        </p>

        <h2 className="mt-6 text-[1.35rem]">The Mew glitch that does work</h2>
        <p>
          Mew was inserted late by Shigeki Morimoto into a few hundred bytes of leftover space,
          never intended to be obtainable. It is obtainable anyway. The trainer-fly glitch
          involves getting into a trainer&apos;s line of sight and escaping the battle prompt, which
          leaves the game about to start an encounter using your Special stat as the species
          index. Get your Special to exactly 21 and you meet a level 7 Mew. No cheat device, no
          event distribution — just an arithmetic accident.
        </p>

        <h2 className="mt-6 text-[1.35rem]">Bugs that shaped the game</h2>
        <p>
          Not everything broken was exploitable. Focus Energy was supposed to quadruple your
          critical hit rate and instead quartered it. Ghost-type moves were coded to do nothing
          at all to Psychic types, removing the one intended counter and leaving Psychic
          catastrophically dominant for the entire generation. And any move, at any accuracy,
          missed roughly one time in 256 because of an off-by-one in the accuracy check —
          a small unfairness quietly baked into every battle anyone played.
        </p>
      </div>

      <nav className="mt-14 flex gap-3">
        <Link href="/y" className="bubble-link">Next: Y</Link>
        <Link href="/h" className="bubble-link">H</Link>
      </nav>
    </main>
  );
}
