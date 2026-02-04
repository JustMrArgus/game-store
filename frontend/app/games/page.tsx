'use client';

import GamesList from '@/components/GamesList';
import Sidebar from '@/components/Sidebar';
import SortByList from '@/components/SortByMenu';

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { useGames } from '@/lib/hooks/use-games';

import { useRouter, useSearchParams } from 'next/navigation';

const GamesPage = () => {
  const searchParams = useSearchParams();

  const router = useRouter();

  const limit = 25;

  const search = searchParams.get('search') ?? '';
  const genre = searchParams.get('genre') ?? '';
  const sortBy = (searchParams.get('sortBy') ?? 'title') as
    | 'title'
    | 'buyCount'
    | 'price';
  const sortOrder = (searchParams.get('sortOrder') ?? 'asc') as 'asc' | 'desc';

  const minPrice = searchParams.get('minPrice')
    ? Number(searchParams.get('minPrice'))
    : undefined;

  const maxPrice = searchParams.get('maxPrice')
    ? Number(searchParams.get('maxPrice'))
    : undefined;

  const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1;

  const { data } = useGames({
    search,
    genre,
    sortBy,
    sortOrder,
    minPrice,
    maxPrice,
    page,
    limit,
  });

  const totalPages = data.meta.totalPages;
  const count = data.meta.total;

  const previousPage = () => {
    if (page > 1) {
      const params = new URLSearchParams(searchParams.toString());

      params.set('page', String(page - 1));

      router.push(`/games?${params.toString()}`);
    }
  };

  const nextPage = () => {
    if (page < totalPages) {
      const params = new URLSearchParams(searchParams.toString());

      params.set('page', String(page + 1));

      router.push(`/games?${params.toString()}`);
    }
  };

  return (
    <div>
      <SortByList />
      <div className="flex gap-10">
        <div className="flex flex-col gap-8 flex-1 w-full">
          <div>
            {count ? (
              <GamesList
                gamesListMode="search"
                search={search}
                genre={genre}
                sortBy={sortBy}
                sortOrder={sortOrder}
                minPrice={minPrice}
                maxPrice={maxPrice}
                limit={limit}
                page={page}
              />
            ) : (
              <div className="flex w-full min-h-[50vh] flex-col items-center justify-center text-center">
                <h1 className="text-2xl font-bold text-white">No Results</h1>
                <p className="mt-2 text-[#a0a0a1]">
                  Unfortunately, there are no results for your request.
                </p>
              </div>
            )}
          </div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={previousPage}
                  className="cursor-pointer"
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink
                  onClick={() => router.refresh()}
                  className="text-white cursor-pointer"
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext onClick={nextPage} className="cursor-pointer" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
        <Sidebar
          genres={data.meta.allGenres}
          platforms={data.meta.allPlatforms}
        />
      </div>
    </div>
  );
};

export default GamesPage;
