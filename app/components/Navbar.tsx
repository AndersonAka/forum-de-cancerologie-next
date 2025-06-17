'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';
import { useAuth } from '@/app/contexts/AuthContext';

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
    { href: '/etude', label: 'Etudes', requiresAuth: true },
    { href: '/itineraire', label: 'Itinéraire', requiresAuth: true },
];

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { logout, loading, user, updateParticipationMode } = useAuth();
    const pathname = usePathname();

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error('Erreur lors de la déconnexion:', error);
        }
    };

    const handleModeChange = async (mode: 'en ligne' | 'présentiel') => {
        try {
            await updateParticipationMode(mode);
        } catch (error) {
            console.error('Erreur lors du changement de mode:', error);
        }
    };

    // Afficher un état de chargement
    if (loading) {
        return (
            <nav className="navbar">
                <div className="logo-forum hidden md:block">
                    <div className="w-[150px] h-[50px] bg-gray-200 animate-pulse"></div>
                </div>
                <div className="hidden md:flex">
                    <div className="nav-list space-x-2">
                        <div className="w-20 h-6 bg-gray-200 animate-pulse"></div>
                        <div className="w-20 h-6 bg-gray-200 animate-pulse"></div>
                    </div>
                </div>
            </nav>
        );
    }

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
                <div className="nav-list space-x-2">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`${pathname === link.href || (link.href === '/' && pathname === '')
                                ? 'active'
                                : 'text-gray-600'}`}
                            aria-current={pathname === link.href || (link.href === '/' && pathname === '') ? 'page' : undefined}
                        >
                            {link.label}
                        </Link>
                    ))}

                    {/* Sélecteur de mode de participation */}
                    <div className="participation-mode">
                        <select
                            value={user?.participationMode || 'en ligne'}
                            onChange={(e) => handleModeChange(e.target.value as 'en ligne' | 'présentiel')}
                            className="mode-select"
                            aria-label="Mode de participation"
                        >
                            <option value="en ligne">En ligne</option>
                            <option value="présentiel">Sur place</option>
                        </select>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="logout"
                        aria-label="Se déconnecter"
                    >
                        <Image
                            src="/img/LOGOUT.png"
                            alt="Déconnexion"
                            width={5}
                            height={5}
                        />
                        <span>Déconnexion</span>
                    </button>
                </div>
            </div>

            <button
                type="button"
                className="block md:hidden nav-toggler"
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
                        <div className="nav-list space-y-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`${pathname === link.href ? 'active' : 'text-gray-600'} block py-2`}
                                    aria-current={pathname === link.href ? 'page' : undefined}
                                >
                                    {link.label}
                                </Link>
                            ))}

                            {/* Sélecteur de mode de participation mobile */}
                            <div className="participation-mode py-2">
                                <select
                                    value={user?.participationMode || 'en ligne'}
                                    onChange={(e) => handleModeChange(e.target.value as 'en ligne' | 'présentiel')}
                                    className="mode-select w-full"
                                    aria-label="Mode de participation"
                                >
                                    <option value="en ligne">En ligne</option>
                                    <option value="présentiel">Sur place</option>
                                </select>
                            </div>

                            <button
                                onClick={handleLogout}
                                className="logout block py-2"
                                aria-label="Se déconnecter"
                            >
                                <Image
                                    src="/img/LOGOUT.png"
                                    alt="Déconnexion"
                                    width={5}
                                    height={5}
                                />
                                <span>Déconnexion</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}   