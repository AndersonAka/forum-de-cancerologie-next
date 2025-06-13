'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function MenuList() {

    return (
        <div className="menu-list">
            <Link href="/direct" className="menu direct">
                <div className="icon"><Image src="/img/play-icon.png" alt="#" width={20} height={20} /></div>
                <div className="title"><h1>Direct 2025</h1></div>
                <div>
                    <p>Lancez une session en live depuis
                        votre position et participer
                        virtuellement au forum.
                    </p>
                </div>
            </Link>

            <Link href="/rediffusion" className="menu rediffussion">
                <div className="icon"><Image src="/img/replay-icon-color.png" alt="#" width={20} height={20} /></div>
                <div className="title"><h1>Rediffusion 2024</h1></div>
                <div>
                    <p>Revisionnez les dernières
                        interventions de nos experts durant le forum de cancerologie 2024
                    </p>
                </div>
            </Link>

            <Link href="/orateur" className="menu orateur">
                <div className="icon"><Image src="/img/speakers.png" alt="#" width={20} height={20} /></div>
                <div className="title"><h1>Orateurs</h1></div>
                <div><p>Accedez à plus de 30 experts
                    régionaux et internationaux
                    intervenant sur le forum</p>
                </div>
            </Link>

            <Link href="/agenda" className="menu agenda">
                <div className="icon"><Image src="/img/diary.png" alt="#" width={20} height={20} /></div>
                <div className="title"><h1>Agenda 2025</h1></div>
                <div><p>Consultez l&apos;agenda du forum de
                    cancérologie de roche</p>
                </div>
            </Link>


            <Link href="/agenda" className="menu agenda">
                <div className="icon"><Image src="/img/themes.png" alt="#" width={20} height={20} /></div>
                <div className="title"><h1>Nos Etudes</h1></div>
                <div><p>Consultez l&apos;agenda du forum de
                    cancérologie de roche</p>
                </div>
            </Link>
            <Link href="/itineraire" className="menu itinéraire">
                <div className="icon"><Image src="/img/localisation-icon.png" alt="#" width={20} height={20} /></div>
                <div className="title"><h1>Itinéraire</h1></div>
                <div><p>Accedez à un itinéraire google map
                    pour participer en présentiel au forum</p>
                </div>
            </Link>

        </div>
    );
} 