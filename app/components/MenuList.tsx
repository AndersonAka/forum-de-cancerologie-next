'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function MenuList() {
    const menuItems = [
        {
            title: 'Direct 2025',
            icon: '/img/play-icon.png',
            description: 'Lancez une session en live depuis votre position et participer virtuellement au forum.',
            href: '/direct'
        },
        {
            title: 'Rediffusion 2024',
            icon: '/img/replay-icon-color.png',
            description: 'Revisionnez les dernières interventions de nos experts durant le forum de cancerologie 2024',
            href: '/rediffusion'
        },
        {
            title: 'Orateurs',
            icon: '/img/speakers.png',
            description: 'Accedez à plus de 30 experts régionaux et internationaux intervenant sur le forum',
            href: '/orateur'
        },
        {
            title: 'Agenda 2025',
            icon: '/img/diary.png',
            description: 'Consultez l\'agenda du forum de cancérologie de roche',
            href: '/agenda'
        },
        {
            title: 'Nos Etudes',
            icon: '/img/themes.png',
            description: 'Consultez l\'agenda du forum de cancérologie de roche',
            href: '/agenda'
        },
        {
            title: 'Itinéraire',
            icon: '/img/localisation-icon.png',
            description: 'Accedez à un itinéraire google map pour participer en présentiel au forum',
            href: '/itineraire'
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {menuItems.map((item, index) => (
                <Link
                    key={index}
                    href={item.href}
                    className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
                >
                    <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                            <Image
                                src={item.icon}
                                alt={item.title}
                                width={40}
                                height={40}
                            />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold mb-2">{item.title}</h2>
                            <p className="text-gray-600">{item.description}</p>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
} 