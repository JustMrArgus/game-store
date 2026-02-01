import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@radix-ui/react-navigation-menu';
import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const NavBar = () => {
  return (
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
  );
};

export default NavBar;
