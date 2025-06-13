'use client';

import React from 'react';
import Image from 'next/image';
import styles from './agenda.module.css';

interface Event {
    id: number;
    title: string;
    date: string;
    time: string;
    location: string;
    description: string;
    speaker: string;
    image: string;
}

const events: Event[] = [
    {
        id: 1,
        title: "Conférence sur les avancées en oncologie",
        date: "15 Mars 2024",
        time: "09:00 - 12:00",
        location: "Salle Principale, Noom Hôtel Plateau",
        description: "Une conférence approfondie sur les dernières avancées dans le traitement du cancer et les nouvelles approches thérapeutiques.",
        speaker: "Dr. Marie Koné",
        image: "/img/event1.jpg"
    },
    {
        id: 2,
        title: "Atelier sur la radiothérapie moderne",
        date: "16 Mars 2024",
        time: "14:00 - 17:00",
        location: "Salle de Formation, Noom Hôtel Plateau",
        description: "Un atelier pratique sur les techniques modernes de radiothérapie et leur application dans le traitement du cancer.",
        speaker: "Dr. Jean Dupont",
        image: "/img/event2.jpg"
    }
];

export default function Agenda() {
    return (
        <main>
            <div className={styles.agendaWrapper}>
                <div className={styles.container}>
                    <h1 className={styles.title}>Agenda des Événements</h1>
                    <div className={styles.eventGrid}>
                        {events.map((event) => (
                            <div key={event.id} className={styles.eventCard}>
                                <Image
                                    src={event.image}
                                    alt={event.title}
                                    width={400}
                                    height={200}
                                    className={styles.eventImage}
                                />
                                <div className={styles.eventContent}>
                                    <p className={styles.eventDate}>{event.date}</p>
                                    <h2 className={styles.eventTitle}>{event.title}</h2>
                                    <p className={styles.eventTime}>{event.time}</p>
                                    <p className={styles.eventLocation}>{event.location}</p>
                                    <p className={styles.eventDescription}>{event.description}</p>
                                    <p className={styles.eventSpeaker}>Intervenant : {event.speaker}</p>
                                    <a href="/inscription" className={styles.registerButton}>
                                        S&apos;inscrire
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