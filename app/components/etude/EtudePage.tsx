"use client"

import { ThemeTitle } from "../ThemeTitle";
import { EtudeSection } from "./EtudeSection";

/*interface Study {
    id: number;
    title: string;
    author: string;
    date: string;
    description: string;
    image: string;
    category: string;
}

/*const studies: Study[] = [
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
];*/
export const EtudePage = () => {
    return (
        <header>
            <ThemeTitle />
            <EtudeSection />
        </header>
    );
};