'use client';

import { useState } from 'react';
import { Input } from './ui/input';

import { useRouter, useSearchParams } from 'next/navigation';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from './ui/collapsible';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';

interface SidebarProps {
  genres: string[];
  platforms: string[];
}

const Sidebar = ({ genres, platforms }: SidebarProps) => {
  const [isGenreMenuOpen, setIsGenreMenuOpen] = useState<boolean>(false);
  const [isPlatformsMenuOpen, setIsPlatformsMenuOpen] =
    useState<boolean>(false);

  const [selectedGenre, setSelectedGenre] = useState<string>('default');

  const router = useRouter();
  const searchParams = useSearchParams();

  const params = new URLSearchParams(searchParams.toString());
  const searchValue = params.get('search');

  const [search, setSearch] = useState<string>(searchValue ?? '');

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);

    const params = new URLSearchParams(searchParams.toString());

    params.set('search', value);
    params.set('page', '1');

    router.push(`/games?${params.toString()}`);
  };

  const onPlatformsCheckpointChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const platforms = new Set(params.get('platforms')?.split(',') ?? []);

    if (platforms.has(value)) {
      platforms.delete(value);
    } else {
      platforms.add(value);
    }

    if (platforms.size === 0) {
      params.delete('platforms');
    } else {
      params.set('platforms', [...platforms].join(','));
    }

    params.set('page', '1');
    router.push(`/games?${params.toString()}`);
  };

  const onGenreCheckpointChange = (value: string) => {
    setSelectedGenre(value);
    const params = new URLSearchParams(searchParams.toString());

    if (value === 'default') {
      params.delete('genre');
    } else {
      params.set('genre', value);
    }

    params.set('page', '1');
    router.push(`/games?${params.toString()}`);
  };

  return (
    <div className="bg-[#202024] self-start py-5 rounded-2xl ">
      <p className="font-bold mb-5 px-5">Filters</p>
      <div className="w-full px-5 mb-5">
        <div className="flex items-center bg-[#303034] p-2 rounded-sm">
          <Search size={20} color="#a0a0a1" />
          <Input
            onChange={(e) => onSearchChange(e)}
            className="border-none text-[#a0a0a1] focus-visible:ring-0 focus-visible:ring-offset-0"
            placeholder="Name of the game"
            value={search}
          />
        </div>
      </div>
      <Collapsible
        open={isGenreMenuOpen}
        onOpenChange={setIsGenreMenuOpen}
        className="flex w-87.5 flex-col gap-2 border-t border-[#414144]"
      >
        <CollapsibleTrigger asChild className="px-0 py-6">
          <div className="w-full hover:text-white hover:bg-[#ffffff2c] transition duration-100 cursor-pointer px-5">
            <div className="flex items-center justify-between ">
              <p className="font-light">Genre</p>
              {isGenreMenuOpen ? (
                <ChevronDown color="#acacad" size={22} />
              ) : (
                <ChevronUp color="#acacad" size={22} />
              )}
            </div>
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent className="flex flex-col gap-4 px-5 mt-3 pb-4">
          <RadioGroup
            value={selectedGenre}
            onValueChange={(value) => onGenreCheckpointChange(value)}
          >
            <div className="flex items-center gap-2">
              <RadioGroupItem
                value="default"
                id={'platform-radio-default'}
                className="bg-[#2b2b2f] border-[#757577] cursor-pointer data-[state=checked]:text-black data-[state=checked]:bg-[#26bbff] hover:border-white"
              />
              <Label
                htmlFor={'platform-radio-default'}
                className="text-[#8f8f91] cursor-pointer"
              >
                All
              </Label>
            </div>
            {genres.map((genre, index) => (
              <div key={index} className="flex items-center gap-2">
                <RadioGroupItem
                  value={genre}
                  id={`platform-radio-${index}`}
                  className="bg-[#2b2b2f] border-[#757577] cursor-pointer data-[state=checked]:text-black data-[state=checked]:bg-[#26bbff] hover:border-white"
                />
                <Label
                  htmlFor={`platform-radio-${index}`}
                  className="text-[#8f8f91] cursor-pointer"
                >
                  {genre}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CollapsibleContent>
      </Collapsible>
      <Collapsible
        open={isPlatformsMenuOpen}
        onOpenChange={setIsPlatformsMenuOpen}
        className="flex w-87.5 flex-col gap-2 border-t border-[#414144]"
      >
        <CollapsibleTrigger asChild className="px-0 py-6">
          <div className="w-full hover:text-white hover:bg-[#ffffff2c] transition duration-100 cursor-pointer px-5">
            <div className="flex items-center justify-between ">
              <p className="font-light">Platform</p>
              {isPlatformsMenuOpen ? (
                <ChevronDown color="#acacad" size={22} />
              ) : (
                <ChevronUp color="#acacad" size={22} />
              )}
            </div>
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent className="flex flex-col gap-4 px-5 pb-4 mt-3">
          {platforms.map((platform, index) => (
            <div key={index} className="flex items-center gap-2">
              <Checkbox
                onCheckedChange={() => onPlatformsCheckpointChange(platform)}
                id={`platform-checkbox-${index}`}
                className="bg-[#2b2b2f] border-[#757577] cursor-pointer data-[state=checked]:text-black data-[state=checked]:bg-[#26bbff] hover:border-white"
              />
              <Label
                htmlFor={`platform-checkbox-${index}`}
                className="text-[#8f8f91] cursor-pointer"
              >
                {platform}
              </Label>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default Sidebar;
