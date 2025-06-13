'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface NavLink {
    href: string;
    label: string;
    requiresAuth?: boolean;
}

const navLinks: NavLink[] = [
    { href: '/', label: 'Accueil' },
    { href: '/edition-2024', label: 'Edition 2024' },
    { href: '/orateur', label: 'Orateurs', requiresAuth: true },
    { href: '/agenda', label: 'Agenda', requiresAuth: true },
    { href: '/direct', label: 'Direct' },
    { href: '/rediffusion', label: 'Rediffusion 2024' },
    { href: '/etude', label: 'Etudes', requiresAuth: true },
];

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();
    const { isAuthenticated, logout, user } = useAuth();

    const handleLogout = () => {
        logout();
        setIsMenuOpen(false);
    };

    const filteredNavLinks = navLinks.filter(link =>
        !link.requiresAuth || (link.requiresAuth && isAuthenticated)
    );

    const renderNavLinks = (isMobile: boolean = false) => (
        <>
            {filteredNavLinks.map((link) => (
                <Link
                    key={link.href}
                    href={link.href}
                    className={`${pathname === link.href
                        ? 'text-blue-600 font-semibold'
                        : 'text-gray-600'
                        } ${isMobile ? 'block py-2' : ''}`}
                    onClick={() => isMobile && setIsMenuOpen(false)}
                >
                    {link.label}
                </Link>
            ))}
            {isAuthenticated ? (
                <div className={`flex items-center space-x-4 ${isMobile ? 'block py-2' : ''}`}>
                    <div className="flex items-center text-gray-600">
                        <span className="font-medium">{user?.firstName} {user?.lastName}</span>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center text-gray-600"
                    >
                        <Image
                            src="/img/LOGOUT.png"
                            alt="Déconnexion"
                            width={20}
                            height={20}
                            className="mr-2"
                        />
                        <span>Déconnexion</span>
                    </button>
                </div>
            ) : (
                <Link
                    href="/connection"
                    className={`active flex items-center text-gray-600 ${isMobile ? 'block py-2' : ''}`}
                    onClick={() => isMobile && setIsMenuOpen(false)}
                >
                    <span>Connexion</span>
                </Link>
            )}
        </>
    );

    return (
        <nav className="flex items-center justify-between px-4 py-2 bg-white shadow-sm">
            <div className="logo-forum">
                <Link href="/">
                    <Image
                        src="/img/logo-forum-cancer.png"
                        alt="Logo Forum Cancer"
                        width={150}
                        height={50}
                        priority
                    />
                </Link>
            </div>

            <div className="hidden md:flex space-x-6">
                {renderNavLinks()}
            </div>

            <button
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="toggle menu"
            >
                <div className="w-6 h-5 flex flex-col justify-between">
                    <span className="w-full h-0.5 bg-gray-600"></span>
                    <span className="w-full h-0.5 bg-gray-600"></span>
                    <span className="w-full h-0.5 bg-gray-600"></span>
                </div>
            </button>

            <div className="logo-roche hidden md:block">
                <Image
                    src="/img/logo-roche.png"
                    alt="Logo Roche"
                    width={100}
                    height={40}
                    priority
                />
            </div>

            {isMenuOpen && (
                <div className="absolute top-16 left-0 w-full bg-white shadow-lg md:hidden z-50">
                    <div className="flex flex-col p-4 space-y-4">
                        {renderNavLinks(true)}
                    </div>
                </div>
            )}
        </nav>
    );
} 