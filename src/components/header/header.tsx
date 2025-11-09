import Link from "next/link";

const Header = () => {
  return (
    <div>
      <nav className="bg-white p-4">
        <div className="flex space-x-6 justify-center">
          <Link href={"/home"}>Home</Link>
          <Link href={"/events"}>Events</Link>
          <Link href={"/about"}>About</Link>
          <Link href={"/faq"}>FAQ</Link>
          <button
            type="button"
            className="bg-white text-violet-600 border-2 px-3 py-1.5 rounded-lg"
          >
            <Link href={"/events/new"}>Create event</Link>
          </button>
          <button
            type="button"
            className="bg-violet-600 text-white border-none px-3 py-1.5 rounded-lg"
          >
            <Link href={"/sign-up"}>Sign up</Link>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Header;
