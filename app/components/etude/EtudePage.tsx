"use client"

import { Etude } from "@/app/types/interface";
import { ThemeTitle } from "../ThemeTitle";
import { EtudeSection } from "./EtudeSection";

export const EtudePage = () => {
    const etudes: Etude[] = [
        {
            id: "et1",
            title: "ÉTUDE KATHERINE",
            description: "Cancer du sein précoce HER2+ ouvrir des perspectives dans la personnalisation du traitement pour les patientes présentant une maladie résiduelle invasive après un traitement néoadjuvant",
            pdfUrl: "/etudes/01-ETUDE KATHERINE.PDF"
        },
        {
            id: "et2",
            title: "ETUDE PREFHER",
            description: "La forme sous-cutanée parce que chaque minute compte",
            pdfUrl: "/etudes/02-ETUDE PREFHER.PDF"
        },
        {
            id: "et3",
            title: "TRAITEMENT ADJUVANT",
            description: "Double blocage HER2, synergie prouvée",
            pdfUrl: "/etudes/03-TRAITEMENT ADJUVANT.PDF"
        },
        {
            id: "et4",
            title: "HER2 + METASTATIQUE",
            description: "Traitement du cancer du sein HER2 + metastatique",
            pdfUrl: "/etudes/04-HER2 + METASTATIQUE.PDF"
        },
        {
            id: "et5",
            title: "TRAITEMENT NEOADJUVANT",
            description: "Double blocage HER2, synergie prouvée",
            pdfUrl: "/etudes/05-TRAITEMENT NEOADJUVANT.PDF"
        },
        {
            id: "et6",
            title: "FEDERICA",
            description: "Cancer du sein HER2+: PHESGO®, un atout innovant",
            pdfUrl: "/etudes/06-IPDF Etude FEDERICA.PDF"
        }
    ];
    return (
        <header>
            <ThemeTitle />
            <EtudeSection etudes={etudes} />
        </header>
    );
};