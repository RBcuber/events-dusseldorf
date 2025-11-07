import Link from "next/link";

const Header = () => {
  return (
    <div>
      <nav className="bg-accent p-4">
        <div className="flex space-x-6 justify-center">
          <Link href={"/profile"}>Profile</Link>
          <Link href={"/events"}>Events</Link>
          <Link href={"/create/new"}>Admin / Create event</Link>
          {/* <Link href={"/about"}>About us</Link>
          <Link href={"/faq"}>FAQ</Link> */}
          <Link href={"/sign-in"}>Sign in / Sign out</Link>
        </div>
      </nav>
    </div>
  );
};

export default Header;
