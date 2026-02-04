import Link from 'next/link';

import SearchInput from './SearchInput';
import NavBar from './NavBar';

const Header = () => {
  return (
    <header className="flex justify-between py-3 px-6 items-center mb-15">
      <div className="flex items-center justify-between gap-10">
        <p className="font-bold text-2xl min-w-40">
          <Link href="/">GAME STORE</Link>
        </p>
        <SearchInput />
      </div>
      <NavBar />
    </header>
  );
};

export default Header;
