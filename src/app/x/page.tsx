import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'X — Where Pokémon Came From | Justin He',
  description:
    'A short practice note on the origins of Pokémon: bug collecting in suburban Tokyo, a fanzine that became a studio, and six years of development on a dying console.',
};

export default function PageX() {
  return (
    <main className="mx-auto w-full max-w-2xl px-8 py-16 lg:px-10 lg:py-24">
      <Link href="/" className="wisteria-link section-label">
        ← Justin He
      </Link>

      <h1 className="mt-8 text-[2rem] leading-tight">Where Pokémon Came From</h1>
      <p className="section-label mt-2">Page X · practice note</p>

      <div className="article-prose mt-10 flex flex-col gap-5 text-[1.02rem] leading-[1.75]">
        <p>
          The highest-grossing media franchise on Earth started as a kid catching beetles in a
          Tokyo suburb and being annoyed that the fields kept turning into apartment blocks.
        </p>

        <h2 className="mt-6 text-[1.35rem]">Dr. Bug</h2>
        <p>
          Satoshi Tajiri grew up in Machida in the 1970s, collecting insects obsessively enough
          that classmates called him Dr. Bug. He would put sticks in the ground overnight to trap
          beetles that hid under them, and trade specimens with other kids. Suburban development
          erased most of those ponds and woods within a decade. The game is, fairly explicitly,
          an attempt to hand that experience to children who no longer have the fields.
        </p>

        <h2 className="mt-6 text-[1.35rem]">A magazine, then a studio</h2>
        <p>
          In 1983 Tajiri was writing and stapling together a fanzine about arcade games called
          Game Freak. A reader named Ken Sugimori wrote in to say the illustrations were bad and
          was promptly recruited to draw them. The magazine became a development studio, Sugimori
          became the artist who would design the original 151 creatures, and the name stuck.
        </p>

        <h2 className="mt-6 text-[1.35rem]">The cable</h2>
        <p>
          The idea arrived with the Game Boy link cable. Everyone else saw a way to play
          competitively against a friend; Tajiri saw a tube with something crawling through it.
          The pitch, originally called Capsule Monsters, made trading mandatory — certain
          creatures only evolve when handed to another player, and each version deliberately
          withholds some so no single cartridge can be completed alone. Cooperation was designed
          into the scarcity.
        </p>

        <h2 className="mt-6 text-[1.35rem]">Six years, nearly bankrupt</h2>
        <p>
          Development ran from roughly 1990 to 1996 and repeatedly nearly killed the company.
          Staff left, salaries went unpaid, and Tajiri reportedly funded stretches himself.
          Shigeru Miyamoto mentored the project and Nintendo kept backing it well past the point
          most publishers would have stopped. Red and Green finally shipped in February 1996, on
          a black-and-white handheld that was seven years old and widely considered finished.
        </p>

        <h2 className="mt-6 text-[1.35rem]">Mew, and the slow burn</h2>
        <p>
          Sales started modest and climbed for months by word of mouth — the opposite of a normal
          release curve. The accelerant was Mew. Programmer Shigeki Morimoto slipped it into a
          few hundred spare bytes after debug code was stripped out, as an in-joke for the staff;
          it was never meant to be obtainable. Nintendo turned it into a mail-in distribution for
          twenty winners, the rumor mill did the rest, and the game became a phenomenon on the
          strength of a creature that was not supposed to exist.
        </p>

        <p>
          Two small nods survive in the text: the player character is named Satoshi and the rival
          is named Shigeru — after Tajiri and Miyamoto, respectively. The whole franchise is a
          memoir with a battle system attached.
        </p>
      </div>

      <nav className="mt-14 flex gap-3">
        <Link href="/a" className="bubble-link">Back to A</Link>
        <Link href="/y" className="bubble-link">Y</Link>
      </nav>
    </main>
  );
}
