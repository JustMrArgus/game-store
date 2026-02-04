import { useRouter, useSearchParams } from 'next/navigation';
import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenu,
} from './ui/dropdown-menu';
import { Button } from './ui/button';

const SortByList = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentSortBy = searchParams.get('sortBy') || 'title';
  const currentSortOrder = searchParams.get('sortOrder') || 'asc';

  const handleSearchModeChange = (key: string, value: string): void => {
    const params = new URLSearchParams(searchParams.toString());

    params.set(key, value);

    router.push(`/games?${params.toString()}`);
  };

  const sortLabels: Record<string, string> = {
    title: 'Title',
    buyCount: 'Buy Count',
    price: 'Price',
  };

  return (
    <div className="mb-5 flex gap-5 text-sm text-[#848488] items-center">
      <div className="flex items-center gap-2 ">
        <p>Sort by: </p>
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="cursor-pointer">
            <Button
              variant="outline"
              className="text-white bg-[#353538] hover:bg-[#ffffff59] border-none hover:text-white transition duration-100 cursor-pointer"
            >
              {sortLabels[currentSortBy] || 'Title'}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-[#353538] border-none">
            <DropdownMenuGroup className="bg-[#353538] text-white cursor-pointer ">
              <DropdownMenuItem
                onClick={() => handleSearchModeChange('sortBy', 'title')}
                className="cursor-pointer"
              >
                Title
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleSearchModeChange('sortBy', 'buyCount')}
                className="cursor-pointer"
              >
                Buy Count
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleSearchModeChange('sortBy', 'price')}
                className="cursor-pointer"
              >
                Price
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex items-center gap-2">
        <p>Order by: </p>
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="cursor-pointer">
            <Button
              variant="outline"
              className="text-white bg-[#353538] hover:bg-[#ffffff59] border-none hover:text-white transition duration-100 cursor-pointer"
            >
              {currentSortOrder.toUpperCase()}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-[#353538] border-none">
            <DropdownMenuGroup className="bg-[#353538] text-white cursor-pointer ">
              <DropdownMenuItem
                onClick={() => handleSearchModeChange('sortOrder', 'asc')}
                className="cursor-pointer"
              >
                ASC
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleSearchModeChange('sortOrder', 'desc')}
                className="cursor-pointer"
              >
                DESC
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default SortByList;
