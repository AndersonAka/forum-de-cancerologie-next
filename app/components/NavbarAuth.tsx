"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useState } from 'react';

export default function NavbarAuth() {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="navbar relative">
            {/* Bouton menu mobile */}
            <div className="md:hidden flex justify-end p-4">
                <button
                    onClick={toggleMenu}
                    className="p-2 rounded-md hover:bg-gray-100"
                    aria-label="Menu"
                >
                    <svg
                        className="h-6 w-6 text-gray-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="var(--bleu-roche)"
                    >
                        {isMenuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </div>

            {/* Menu mobile */}
            <div
                className={`md:hidden absolute top-full left-0 right-0 bg-white flex flex-row shadow-lg transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'
                    }`}
            >
                <div className="px-4 py-3 ">
                    <Link href="/" aria-label="Retour à l'accueil">
                        <Image
                            src="/img/logo-forum-cancer.png"
                            alt="Logo Forum Cancer"
                            width={150}
                            height={50}
                            priority
                            unoptimized
                        />
                    </Link>
                </div>
                <div className="nav-list">
                    <Link
                        href="/inscription"
                        className={`block py-2 px-4 rounded-md ${pathname === '/inscription'
                            ? 'active'
                            : 'text-gray-600 hover:bg-gray-50'
                            }`}
                        onClick={() => setIsMenuOpen(false)}
                        aria-current={pathname === '/inscription' ? 'page' : undefined}
                    >
                        Inscription
                    </Link>
                    <Link
                        href="/connexion"
                        className={`block py-2 px-4 rounded-md ${pathname === '/connexion'
                            ? 'active'
                            : 'text-gray-600 hover:bg-gray-50'
                            }`}
                        onClick={() => setIsMenuOpen(false)}
                        aria-current={pathname === '/connexion' ? 'page' : undefined}
                    >
                        Connexion
                    </Link>
                </div>
                <div className="px-4 py-3">
                    <div className="flex justify-center">
                        <Image
                            src="/img/logo-roche.png"
                            alt="Logo Roche"
                            width={80}
                            height={32}
                            priority
                            unoptimized
                        />
                    </div>
                </div>
            </div>

            {/* Version desktop */}
            <div className="hidden md:flex items-center justify-between w-full px-6 py-3">
                <div className="logo-forum">
                    <Link href="/" aria-label="Retour à l'accueil">
                        <Image
                            src="/img/logo-forum-cancer.png"
                            alt="Logo Forum Cancer"
                            width={150}
                            height={50}
                            priority
                            unoptimized
                        />
                    </Link>
                </div>

                <div className="nav-list space-x-4">
                    <Link
                        href="/inscription"
                        className={`px-4 py-2 rounded-md transition-colors ${pathname === '/inscription'
                            ? 'active'
                            : 'text-gray-600 hover:bg-gray-50'
                            }`}
                        aria-current={pathname === '/inscription' ? 'page' : undefined}
                    >
                        Inscription
                    </Link>
                    <Link
                        href="/connexion"
                        className={`px-4 py-2 rounded-md transition-colors ${pathname === '/connexion'
                            ? 'active'
                            : 'text-gray-600 hover:bg-gray-50'
                            }`}
                        aria-current={pathname === '/connexion' ? 'page' : undefined}
                    >
                        Connexion
                    </Link>
                </div>

                <div className="logo-roche">
                    <Image
                        src="/img/logo-roche.png"
                        alt="Logo Roche"
                        width={100}
                        height={40}
                        priority
                        unoptimized
                    />
                </div>
            </div>
        </nav>
    );
} 