import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-900 text-gray-200 py-10 pl-15">
      <div className=" px-4 mb-20">
        <div className="text-left text-lt font-semibold mb-8">
          Event Düsseldorf
        </div>

        <div className="border-t border-gray-700 mb-8"></div>

        <div className="flex justify-between text-sm max-w-80">
          <Link href="/" className="hover:underline">
            Home 
          </Link> •
          <Link href="/events" className="hover:underline">
            Events
          </Link> •
          <Link href="/about" className="hover:underline">
            About
          </Link> •
          <Link href="/faq" className="hover:underline">
            FAQ
          </Link> •
          <Link href="/profile" className="hover:underline">
            Profile
          </Link>
        </div>
      </div>
      <div className="mt-4 text-right text-gray-400 text-sm mr-20">
        © {new Date().getFullYear()} Sky Castle
      </div>
    </footer>
  );
}
