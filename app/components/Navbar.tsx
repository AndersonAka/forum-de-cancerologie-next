'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useAuth } from '@/app/contexts/AuthContext';

interface NavLink {
    href: string;
    label: string;
    requiresAuth?: boolean;
}

const navLinks: NavLink[] = [
    { href: '/', label: 'Accueil', requiresAuth: true },
    // { href: '/edition-2024', label: 'Edition 2024', requiresAuth: true },
    { href: '/orateur', label: 'Orateurs', requiresAuth: true },
    { href: '/agenda', label: 'Agenda', requiresAuth: true },
    { href: '/direct', label: 'Direct', requiresAuth: true },
    // { href: '/rediffusion-2024', label: 'Rediffusion 2024', requiresAuth: true },
    { href: '/etude', label: 'Etudes', requiresAuth: true },
    { href: '/itineraire', label: 'Itinéraire', requiresAuth: true },
];

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isUpdatingMode, setIsUpdatingMode] = useState(false);
    const { logout, loading, user, updateParticipationMode } = useAuth();
    const pathname = usePathname();
    const menuRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                isMenuOpen &&
                menuRef.current &&
                !menuRef.current.contains(event.target as Node) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target as Node)
            ) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isMenuOpen]);

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error('Erreur lors de la déconnexion:', error);
        }
    };

    const handleModeChange = async (mode: 'en ligne' | 'présentiel') => {
        try {
            setIsUpdatingMode(true);
            await updateParticipationMode(mode);
        } catch (error) {
            console.error('Erreur lors du changement de mode:', error);
        } finally {
            setIsUpdatingMode(false);
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
        <nav className="navbar relative px-4">
            {/* Header mobile */}
            <div className="md:hidden flex items-center justify-between w-full px-2 py-2">
                <div className="px-4 py-3">
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
                <div className="flex-1 flex justify-center">
                    <button
                        ref={buttonRef}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                        aria-label="Menu"
                        title="Menu"
                    >
                        <svg
                            className="h-7 w-7 text-[var(--bleu-roche)]"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            {isMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
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

            {/* Menu mobile déroulant */}
            <div
                ref={menuRef}
                className={`md:hidden fixed inset-x-0 top-[72px] bg-white shadow-lg z-40 transition-all duration-300 ease-in-out ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                    }`}
            >
                <div className="flex flex-col items-center py-4 gap-2">
                    <div className="nav-list w-full">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`block py-2 px-4 rounded-md w-full text-center ${pathname === link.href || (link.href === '/' && pathname === '')
                                    ? 'active'
                                    : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <button
                            onClick={() => { setIsMenuOpen(false); handleLogout(); }}
                            className="logout flex items-center gap-2 justify-center w-full py-2 px-4 text-center"
                            aria-label="Se déconnecter"
                        >
                            <Image
                                src="/img/LOGOUT.png"
                                alt="Déconnexion"
                                width={18}
                                height={18}
                            />
                            <span>Déconnexion</span>
                        </button>
                    </div>
                    {/* Sélecteur de mode de participation mobile */}
                    <div className="participation-mode flex justify-center w-full px-4 py-2 border-t border-gray-100">
                        <div className="flex items-center justify-between gap-2">
                            <label htmlFor="participation-mode-mobile" className="text-sm text-gray-600 flex items-center gap-1 whitespace-nowrap">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                                </svg>
                                Je participe :
                            </label>
                            <div className="flex items-center gap-2">
                                {isUpdatingMode && (
                                    <div className="animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full"></div>
                                )}
                                <select
                                    id="participation-mode-mobile"
                                    value={user?.participationMode || 'en ligne'}
                                    onChange={(e) => handleModeChange(e.target.value as 'en ligne' | 'présentiel')}
                                    className="mode-select text-sm border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                                    aria-label="Choisir votre mode de participation"
                                    disabled={isUpdatingMode}
                                >
                                    <option value="en ligne">En ligne</option>
                                    <option value="présentiel">Sur place</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Version desktop */}
            <div className="logo-forum hidden md:block">
                <Image
                    src="/img/logo-forum-cancer.png"
                    alt="Logo Forum Cancer"
                    width={150}
                    height={50}
                    priority
                    unoptimized
                />
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
                    {/* Sélecteur de mode de participation */}
                    <div className="nav-list participation-mode flex items-center gap-2">
                        <label htmlFor="participation-mode" className="text-sm text-gray-600 flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                            </svg>
                            Je participe :
                        </label>
                        {isUpdatingMode && (
                            <div className="animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full"></div>
                        )}
                        <select
                            id="participation-mode"
                            value={user?.participationMode || 'en ligne'}
                            onChange={(e) => handleModeChange(e.target.value as 'en ligne' | 'présentiel')}
                            className="mode-select text-sm border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            aria-label="Choisir votre mode de participation"
                            disabled={isUpdatingMode}
                        >
                            <option value="en ligne">En ligne</option>
                            <option value="présentiel">Sur place</option>
                        </select>
                    </div>

                </div>
            </div>

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

        </nav>
    );
}   