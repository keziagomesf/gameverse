import { Container } from "@/components/container";
import {GameProps} from '@/utils/types/game'
import Link from 'next/link'
import Image from 'next/image'

async function getGameVerse() {
  try{
    const res = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=game_day`)
    return res.json();
  }catch(err){
    throw new Error("Failed to fetch data")
  }
}

export default async function Home() {
  const gameVerse: GameProps = await getGameVerse();
  
  return (
    <main className="w-full">
      <Container>
        <h1 className="text-center font-bold text-xl mt-8 mb-5">Separamos um jogo exclusivo para você</h1>
        <Link href={`/game/${gameVerse.id}`}>
        <section className="w-full bg-black rounded-lg">
          <Image
          src={gameVerse.image_url}
          alt={gameVerse.title}
          priority={true}
          quality={100}
          width={100}
          height={100}
          />
        </section>
        </Link>
      </Container>
    </main>
  );
}
