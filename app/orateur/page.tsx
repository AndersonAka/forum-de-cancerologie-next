'use client';

import React from 'react';
import Image from 'next/image';

interface Speaker {
    id: number;
    name: string;
    title: string;
    specialty: string;
    description: string;
    image: string;
    email: string;
}

const speakers: Speaker[] = [
    {
        id: 1,
        name: "Dr. Marie Koné",
        title: "Oncologue",
        specialty: "Cancer du sein",
        description: "Spécialiste reconnue dans le traitement du cancer du sein avec plus de 15 ans d'expérience.",
        image: "/img/speaker1.jpg",
        email: "marie.kone@example.com"
    },
    {
        id: 2,
        name: "Dr. Jean Dupont",
        title: "Radiothérapeute",
        specialty: "Radiothérapie",
        description: "Expert en radiothérapie moderne et techniques de pointe pour le traitement du cancer.",
        image: "/img/speaker2.jpg",
        email: "jean.dupont@example.com"
    }
];

export default function Orateur() {
    return (
        <main>
            <div className="orateurWrapper">
                <div className="container">
                    <h1 className="title">Nos Orateurs</h1>
                    <div className="speakerGrid">
                        {speakers.map((speaker) => (
                            <div key={speaker.id} className="speakerCard">
                                <Image
                                    src={speaker.image}
                                    alt={speaker.name}
                                    width={400}
                                    height={300}
                                    className="speakerImage"
                                />
                                <div className="speakerContent">
                                    <h2 className="speakerName">{speaker.name}</h2>
                                    <p className="speakerTitle">{speaker.title}</p>
                                    <p className="speakerSpecialty">{speaker.specialty}</p>
                                    <p className="speakerDescription">{speaker.description}</p>
                                    <a href={`mailto:${speaker.email}`} className="speakerContact">
                                        Contacter
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
} 