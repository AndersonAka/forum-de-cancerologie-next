'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Image from 'next/image';

interface NavLink {
    href: string;
    label: string;
    requiresAuth?: boolean;
}

const navLinks: NavLink[] = [
    { href: '/', label: 'Accueil', requiresAuth: true },
    { href: '/edition-2024', label: 'Edition 2024', requiresAuth: true },
    { href: '/orateur', label: 'Orateurs', requiresAuth: true },
    { href: '/agenda', label: 'Agenda', requiresAuth: true },
    { href: '/direct', label: 'Direct', requiresAuth: true },
    { href: '/rediffusion-2024', label: 'Rediffusion 2024', requiresAuth: true },
    { href: '/etud', label: 'Etudes', requiresAuth: true },
];

const NavbarSkeleton = () => (
    <nav className="flex items-center justify-between px-4 py-2 bg-white shadow-sm animate-pulse">
        <div className="logo-forum">
            <div className="w-[150px] h-[50px] bg-gray-200 rounded"></div>
        </div>

        <div className="hidden md:flex space-x-6">
            <div className="flex space-x-4">
                {[...Array(5)].map((_, index) => (
                    <div key={index} className="w-20 h-6 bg-gray-200 rounded"></div>
                ))}
            </div>
        </div>

        <div className="md:hidden">
            <div className="w-6 h-5 bg-gray-200 rounded"></div>
        </div>

        <div className="logo-roche hidden md:block">
            <div className="w-[100px] h-[40px] bg-gray-200 rounded"></div>
        </div>
    </nav>
);

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const router = useRouter();
    const pathname = usePathname();
    const { isAuthenticated, logout, loading } = useAuth();

    if (loading) {
        return <NavbarSkeleton />;
    }

    const handleLogout = async () => {
        try {
            setIsLoggingOut(true);
            await logout();
            setIsMenuOpen(false);
            router.push('/connexion');
        } catch (error) {
            console.error('Erreur lors de la déconnexion:', error);
        } finally {
            setIsLoggingOut(false);
        }
    };

    const filteredNavLinks = navLinks.filter(link =>
        !link.requiresAuth || (link.requiresAuth && isAuthenticated)
    );

    const renderNavLinks = (isMobile: boolean = false) => (
        <>
            {isAuthenticated ? (
                <>
                    <div className="nav-list space-x-2">
                        {filteredNavLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`${pathname === link.href || (link.href === '/' && pathname === '')
                                    ? 'active'
                                    : 'text-gray-600'
                                    } ${isMobile ? 'block py-2' : ''}`}
                                onClick={() => isMobile && setIsMenuOpen(false)}
                                aria-current={pathname === link.href || (link.href === '/' && pathname === '') ? 'page' : undefined}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                    <div className={`flex items-center space-x-4 ${isMobile ? 'block py-2' : ''}`}>
                        <button
                            onClick={handleLogout}
                            className="logout"
                            disabled={isLoggingOut}
                            aria-label="Se déconnecter"
                        >
                            <Image
                                src="/img/LOGOUT.png"
                                alt="Déconnexion"
                                width={20}
                                height={20}
                                className="mr-2"
                            />
                            <span>{isLoggingOut ? 'Déconnexion...' : 'Déconnexion'}</span>
                        </button>
                    </div>
                </>
            ) : (
                <div className="nav-list space-x-2">
                    <Link
                        href="/inscription"
                        className={`${pathname === '/inscription' ? 'active' : 'text-gray-600'}`}
                        aria-current={pathname === '/inscription' ? 'page' : undefined}
                    >
                        Inscription
                    </Link>
                    <Link
                        href="/connexion"
                        className={`${pathname === '/connexion' ? 'active' : 'text-gray-600'}`}
                        aria-current={pathname === '/connexion' ? 'page' : undefined}
                    >
                        Connexion
                    </Link>
                </div>
            )}
        </>
    );

    return (
        <nav className="navbar">
            <div className="logo-forum hidden md:block">
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
            <div className="hidden md:flex">
                {renderNavLinks()}
            </div>
            <button
                type="button"
                className="md:hidden nav-toggler"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
                aria-controls="mobile-menu"
            >
                <div className={`w-6 h-5 flex flex-col justify-between ${isMenuOpen ? 'active' : ''}`}>
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
                    unoptimized
                />
            </div>
            {isMenuOpen && (
                <div
                    id="mobile-menu"
                    className="absolute top-16 left-0 w-full bg-white shadow-lg md:hidden z-50 nav-column"
                    role="navigation"
                    aria-label="Menu mobile"
                >
                    <div className="flex flex-col p-4 space-y-4">
                        {renderNavLinks(true)}
                    </div>
                </div>
            )}
        </nav>
    );
}