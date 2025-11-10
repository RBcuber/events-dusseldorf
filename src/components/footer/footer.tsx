import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-900 text-gray-200 py-3">
      <div className="max-w-4xl mx-auto px-4">
       
        <div className="text-left text-lt font-semibold mb-2">
          Event Düsseldorf
        </div>

      
        <div className="border-t border-gray-700 mb-4"></div>

        <div className="flex justify-around space-x-6 text-sm">
          <Link href="/home" className="hover:underline">Home</Link>
          <Link href="/events" className="hover:underline">Events</Link>
          <Link href="/about" className="hover:underline">About</Link>
          <Link href="/faq" className="hover:underline">FAQ</Link>
          <Link href="/profile" className="hover:underline">Profile</Link>
        </div>

       
        <div className="mt-4 text-right text-gray-400 text-sm">
          © {new Date().getFullYear()} Event Düsseldorf
        </div>
      </div>
    </footer>
  );
}


