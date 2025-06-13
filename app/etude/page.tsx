'use client';

import React from 'react';
import Image from 'next/image';
import styles from './etude.module.css';

interface Study {
    id: number;
    title: string;
    author: string;
    date: string;
    description: string;
    image: string;
    category: string;
}

const studies: Study[] = [
    {
        id: 1,
        title: "Étude sur les avancées dans le traitement du cancer du sein",
        author: "Dr. Marie Dupont",
        date: "15 Mars 2024",
        description: "Une étude approfondie sur les nouvelles méthodes de traitement du cancer du sein et leurs résultats prometteurs.",
        image: "/img/study1.jpg",
        category: "Cancer du sein"
    },
    {
        id: 2,
        title: "Impact de l'immunothérapie sur le cancer du poumon",
        author: "Dr. Jean Martin",
        date: "10 Mars 2024",
        description: "Analyse des résultats de l'immunothérapie dans le traitement du cancer du poumon à un stade avancé.",
        image: "/img/study2.jpg",
        category: "Cancer du poumon"
    },
    // Ajoutez d'autres études ici
];

export default function Etude() {
    return (
        <main>
            <div className={styles.etudeWrapper}>
                <div className={styles.container}>
                    <h1 className={styles.title}>Études et Recherches</h1>
                    <div className={styles.studiesGrid}>
                        {studies.map((study) => (
                            <div key={study.id} className={styles.studyCard}>
                                <Image
                                    src={study.image}
                                    alt={study.title}
                                    width={400}
                                    height={200}
                                    className={styles.studyImage}
                                />
                                <div className={styles.studyContent}>
                                    <h2 className={styles.studyTitle}>{study.title}</h2>
                                    <p className={styles.studyAuthor}>Par {study.author}</p>
                                    <p className={styles.studyDate}>{study.date}</p>
                                    <p className={styles.studyDescription}>{study.description}</p>
                                    <span className={styles.studyCategory}>{study.category}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
} 