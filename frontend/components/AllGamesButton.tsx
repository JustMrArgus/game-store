import Link from 'next/link';
import { Button } from './ui/button';

const AllGamesButton = () => {
  return (
    <Link href={'/games?sortBy=title&sortOrder=asc&page=1'} className="mt-5">
      <Button
        variant="outline"
        size="lg"
        className="bg-[#353538] text-white hover:bg-[#ffffff59] border-none hover:text-white transition duration-100 cursor-pointer"
      >
        See all games
      </Button>
    </Link>
  );
};

export default AllGamesButton;
