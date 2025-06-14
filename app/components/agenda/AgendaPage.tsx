// AgendaPage.tsx

import { ThemeTitle } from "../ThemeTitle";
import { AgendaSection } from "./AgendaSection";

// interface Event {
//     id: number;
//     title: string;
//     date: string;
//     time: string;
//     location: string;
//     description: string;
//     speaker: string;
//     image: string;
// }

// const events: Event[] = [
//     {
//         id: 1,
//         title: "Conférence sur les avancées en oncologie",
//         date: "15 Mars 2024",
//         time: "09:00 - 12:00",
//         location: "Salle Principale, Noom Hôtel Plateau",
//         description: "Une conférence approfondie sur les dernières avancées dans le traitement du cancer et les nouvelles approches thérapeutiques.",
//         speaker: "Dr. Marie Koné",
//         image: "/img/event1.jpg"
//     },
//     {
//         id: 2,
//         title: "Atelier sur la radiothérapie moderne",
//         date: "16 Mars 2024",
//         time: "14:00 - 17:00",
//         location: "Salle de Formation, Noom Hôtel Plateau",
//         description: "Un atelier pratique sur les techniques modernes de radiothérapie et leur application dans le traitement du cancer.",
//         speaker: "Dr. Jean Dupont",
//         image: "/img/event2.jpg"
//     }
// ];
export default function AgendaPage() {
    return (
        <header>
            <ThemeTitle />
            <AgendaSection />
        </header>
    );
}