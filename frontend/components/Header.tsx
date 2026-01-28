import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@radix-ui/react-navigation-menu';
import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const Header = () => {
  return (
    <header className="flex justify-between  py-3 px-3">
      <p className="font-bold text-2xl">
        <Link href="/">GAME STORE</Link>
      </p>
      <NavigationMenu>
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
      </NavigationMenu>
    </header>
  );
};

export default Header;
