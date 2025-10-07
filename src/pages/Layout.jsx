import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <div className="min-h-dvh bg-teal-900 text-white">
            <header className="sticky top-0 z-40 border-b border-teal-700 bg-teal-900/70 backdrop-blur">
                <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
                    <Link to="/" className="text-white text-xl sm:text-2xl font-bold">
                        MLX
                    </Link>
                    <div className="flex items-center gap-4 sm:gap-6 text-sm">
                        <Link to="/movies" className="text-white hover:text-teal-300 transition-colors">Movies</Link>
                        <Link to="/cast" className="text-white hover:text-teal-300 transition-colors">Cast</Link>
                        <Link to="/about" className="text-white hover:text-teal-300 transition-colors">About</Link>
                    </div>
                </nav>
            </header>
            <Outlet />
            <footer className="border-t border-teal-700 py-6 sm:py-8 text-center text-gray-400 text-sm">
                MLX 2025 Copyrights Reserved
            </footer>
        </div>
    );
};

export default Layout;
