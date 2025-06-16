"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

export default function NavbarAuth() {
    const pathname = usePathname();

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