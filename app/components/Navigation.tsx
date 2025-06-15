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
    { href: '/orateurs', label: 'Orateurs', requiresAuth: true },
    { href: '/agenda', label: 'Agenda', requiresAuth: true },
    { href: '/direct', label: 'Direct' },
    { href: '/rediffusion', label: 'Rediffusion' },
    { href: '/etudes', label: 'Etudes', requiresAuth: true },
];

export default function Navigation() {
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
                    className={`${pathname === link.href ? 'active' : ''} ${isMobile ? 'mobile-link' : ''}`}
                    onClick={() => isMobile && setIsMenuOpen(false)}
                >
                    {link.label}
                </Link>
            ))}
            {isAuthenticated ? (
                <div className={`user-section ${isMobile ? 'mobile' : ''}`}>
                    <div className="user-info">
                        <span>{user?.nom}</span>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="logout-button"
                    >
                        <Image
                            src="/img/LOGOUT.png"
                            alt="Déconnexion"
                            width={20}
                            height={20}
                        />
                        <span>Déconnexion</span>
                    </button>
                </div>
            ) : (
                <Link
                    href="/connexionn"
                    className={`login-link ${isMobile ? 'mobile' : ''}`}
                    onClick={() => isMobile && setIsMenuOpen(false)}
                >
                    Connexion
                </Link>
            )}
        </>
    );

    return (
        <nav className="navbar">
            <div className="nav-container">
                <div className="logo-forum">
                    <Link href="/">
                        <Image
                            src="/img/logo-forum-cancer.png"
                            alt="Logo Forum Cancer"
                            width={200}
                            height={80}
                            priority
                        />
                    </Link>
                </div>

                <div className="nav-list">
                    {renderNavLinks()}
                </div>

                <div className="menu-toogler">
                    <button
                        type="button"
                        aria-label="toggle curtain navigation"
                        className={`nav-toggler ${isMenuOpen ? 'active' : ''}`}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <span className="line line1"></span>
                        <span className="line line2"></span>
                        <span className="line line3"></span>
                    </button>
                </div>

                <div className="logo-roche">
                    <Image
                        src="/img/logo-roche.png"
                        alt="Logo Roche"
                        width={120}
                        height={60}
                        priority
                    />
                </div>
            </div>

            <div className={`nav-column ${isMenuOpen ? 'active' : ''}`}>
                {renderNavLinks(true)}
            </div>
        </nav>
    );
}