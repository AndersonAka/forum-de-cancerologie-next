'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import styles from './Navbar.module.css';

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
    { href: '/rediffusion', label: 'Rediffusion 2024', requiresAuth: true },
    { href: '/etude', label: 'Etudes', requiresAuth: true },
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
    const router = useRouter();
    const pathname = usePathname();
    const { isAuthenticated, logout, loading } = useAuth();

    if (loading) {
        return <NavbarSkeleton />;
    }

    const handleLogout = async () => {
        try {
            await logout();
            setIsMenuOpen(false);
            setTimeout(() => {
                router.push('/connection');
            }, 100);
        } catch (error) {
            console.error('Erreur lors de la déconnexion:', error);
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
                                className={`${pathname === link.href
                                    ? 'active'
                                    : 'text-gray-600'
                                    } ${isMobile ? 'block py-2' : ''}`}
                                onClick={() => isMobile && setIsMenuOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <div className={`flex items-center space-x-4 ${isMobile ? 'block py-2' : ''}`}>
                            <button
                                onClick={handleLogout}
                                className="logout"
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
                    </div>
                </>
            ) : (
                <nav className="navbar space-x-2">
                    <div className="nav-container">
                        <div className="nav-list">
                            <Link
                                href="/inscription"
                                className={`${pathname === '/inscription' ? 'active' : 'text-gray-600'}`}
                            >
                                Inscription
                            </Link>
                            <Link
                                href="/connection"
                                className={`${pathname === '/connection' ? 'active' : 'text-gray-600'}`}
                            >
                                Connexion
                            </Link>
                        </div>
                    </div>
                </nav>
            )}
        </>
    );

    return (
        <>
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
                    className="md:hidden nav-toggler"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="toggle menu"
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
                    />
                </div>

                {isMenuOpen && (
                    <div className="absolute top-16 left-0 w-full bg-white shadow-lg md:hidden z-50 nav-column">
                        <div className="flex flex-col p-4 space-y-4">
                            {renderNavLinks(true)}
                        </div>
                    </div>
                )}
            </nav>
            <button
                className="hamburgerButton"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Menu"
            >
                <span className="line line1"></span>
                <span></span>
                <span></span>
            </button>

            <div className={`${styles.navColumn} ${isMenuOpen ? styles.active : ''}`}>
                <Link href="/" className="active">Acceuil</Link>
                <Link href="/edition-2024">Edition 2024</Link>
                <Link href="/orateurs">Orateurs</Link>
                <Link href="/agenda">Agenda</Link>
                <Link href="/direct">Direct</Link>
                <Link href="/rediffusion-2024">Rediffusion 2024</Link>
                <Link href="/etudes">Etudes</Link>
                <Link href="/deconnexion">Déconnexion</Link>
            </div>
        </>
    );
} 