import { Card, CardDescription, CardHeader, CardTitle } from './ui/card';
import { API_URL } from '@/lib/api/constants/constants';
import { GameImage } from './GameImage';
import Link from 'next/link';

interface GameCardProps {
  id: number;
  primaryImage: string;
  title: string;
  price: number;
}

const GameCard = ({ id, primaryImage, title, price }: GameCardProps) => {
  return (
    <Link href={`/game/${id}`}>
      <Card className="bg-transparent text-white cursor-pointer pt-0 border-none transition duration-300 hover:scale-[1.1]">
        <GameImage
          src={`${API_URL}${primaryImage}`}
          alt="Image of the game"
          fallbackSrc="/defaultGameImage.jpg"
        />
        <CardHeader className="pl-0">
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardDescription className="text-white">
          {price > 0 ? price + '$' : 'FREE'}
        </CardDescription>
      </Card>
    </Link>
  );
};

export default GameCard;
