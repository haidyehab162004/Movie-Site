import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-linear-to-r from-gray-950 via-gray-900 to-gray-950 text-white border-t border-gray-800/60 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo / Brand Name */}
          <div className="flex items-center">
            <Link to="/" className="font-bold text-2xl tracking-wide text-slate-100 hover:text-amber-400 transition-colors duration-300">
              CineVerse
            </Link>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-400">
            <Link 
              to="#" 
              onClick={(e) => e.preventDefault()} 
              className="hover:text-amber-400 transition-colors duration-300"
            >
              Privacy Policy
            </Link>
            <Link 
              to="#" 
              onClick={(e) => e.preventDefault()} 
              className="hover:text-amber-400 transition-colors duration-300"
            >
              Terms of Service
            </Link>
            <Link 
              to="#" 
              onClick={(e) => e.preventDefault()} 
              className="hover:text-amber-400 transition-colors duration-300"
            >
              Help Center
            </Link>
            <Link 
              to="#" 
              onClick={(e) => e.preventDefault()} 
              className="hover:text-amber-400 transition-colors duration-300"
            >
              Contact Us
            </Link>
            <Link 
              to="#" 
              onClick={(e) => e.preventDefault()} 
              className="hover:text-amber-400 transition-colors duration-300"
            >
              Press
            </Link>
          </nav>

          {/* Copyright */}
          <div className="text-sm text-gray-500 text-center md:text-right">
            © 2024 CineVerse Cinematic Experiences. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
