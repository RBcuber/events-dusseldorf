export default function Footer() {
  return (
    <footer className="w-full bg-gray-900 text-gray-200 py-6">
      <div className="max-w-4xl mx-auto px-4">
        
        <div className="text-left text-lt font-semibold mb-2">
          Event Düsseldorf
        </div>

        
        <div className="border-t border-gray-700 mb-2"></div>

       
        <div className="flex justify-center space-x-8 text-sm">
          <a href="/home" className="hover:underline">Home</a>
          <a href="/events" className="hover:underline">Events</a>
          <a href="/about" className="hover:underline">About</a>
          <a href="/faq" className="hover:underline">FAQ</a>
          <a href="/profile" className="hover:underline">Profile</a>
        </div>

        
        <div className="mt-1 text-right text-gray-400 text-sm">
          © {new Date().getFullYear()} Event Düsseldorf
        </div>
      </div>
    </footer>
  );
}

