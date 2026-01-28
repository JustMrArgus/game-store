import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-[#353538]/35 h-[25vh] w-full flex justify-between items-center px-5 mt-10 pb-5">
      <p className="font-bold text-2xl">
        <Link href="/">GAME STORE</Link>
      </p>
      <p className="text-xs max-w-130 opacity-50">
        &copy; 2026, Game Store, Lorem ipsum dolor, sit amet consectetur
        adipisicing elit. Fugiat quas quibusdam eos ut molestiae maiores
        doloribus inventore vel accusamus optio minima, officia deleniti!
        Numquam doloremque sunt iusto vitae obcaecati vero. Lorem ipsum dolor
        sit amet consectetur adipisicing elit. Harum, nostrum! Quidem
        accusantium, nobis nostrum possimus delectus dolorum ex quaerat! Fugit
        libero qui ipsam exercitationem quo facilis, consequuntur blanditiis
        minima doloremque.
      </p>
    </footer>
  );
};

export default Footer;
