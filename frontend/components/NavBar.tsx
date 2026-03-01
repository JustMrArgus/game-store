'use client';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@radix-ui/react-navigation-menu';
import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useAuthStore } from '@/store/use-auth-store';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

const NavBar = () => {
  const { isAuthenticated, user } = useAuthStore();

  return (
    <NavigationMenu>
      {!isAuthenticated ? (
        <NavigationMenuList className="flex gap-5">
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={cn(
                navigationMenuTriggerStyle(),
                'bg-[#353538] text-white hover:bg-[#ffffff59] hover:text-white transition duration-100',
              )}
            >
              <Link href="/auth/login">Log in</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={cn(
                navigationMenuTriggerStyle(),
                'bg-[#353538] text-white hover:bg-[#ffffff59] hover:text-white transition duration-100',
              )}
            >
              <Link href="/auth/signup">Sign Up</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      ) : (
        <NavigationMenuLink>
          <Link
            href={'/me'}
            className="flex justify-center gap-2 text-[#cfcfd3] transition duration-300 hover:opacity-70 hover:cursor-pointer"
          >
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>PFP</AvatarFallback>
            </Avatar>
            <p>{user?.name}</p>
          </Link>
        </NavigationMenuLink>
      )}
    </NavigationMenu>
  );
};

export default NavBar;
