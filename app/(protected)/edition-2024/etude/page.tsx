"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { EtudeSection } from "../../../components/etude/EtudeSection";
import { Etude } from "@/app/types/interface";

export default function EtudePage() {

  const etudes: Etude[] = [
    {
        id: "et1",
        title: "ETUDE 1",
        description: "Cancer du sein précoce HER2+ OUVRIR DES PERSPECTIVES DANS LA PERSONNALISATION DU TRAITEMENT pour les patientes présentant une maladie résiduelle invasive après un traitement néoadjuvant",
        pdfUrl: "/etudes/2024/ETUDEK_1.PDF"
    },
    {
        id: "et2",
        title: "ETUDE 2",
        description: "LA FORME SOUS-CUTANÉE PARCE QUE CHAQUE MINUTE COMPTE ",
        pdfUrl: "/etudes/2024/ETUDEP_1.PDF"
    },
    {
        id: "et3",
        title: "ETUDE 3",
        description: "DOUBLE BLOCAGE HER2, SYNERGIE PROUVÉE",
        pdfUrl: "/etudes/2024/TRAITE_2.PDF"
    },
    {
        id: "et4",
        title: "ETUDE 4",
        description: "TRAITEMENT DU CANCER DU SEIN HER2 + METASTATIQUE",
        pdfUrl: "/etudes/2024/TRAITE_3.PDF"
    },
    {
        id: "et5",
        title: "ETUDE 5",
        description: "DOUBLE BLOCAGE HER2, SYNERGIE PROUVÉE",
        pdfUrl: "/etudes/2024/TRAITM_1.PDF"
    }
];
  return (
    <Suspense fallback={<div>Chargement...</div>}>
     
      <section className="program-element py-5">
        <div className="menu-list">
          <Link href="/edition-2024/rediffusion" className="menu rediffussion">
            <div className="icon">
              <Image
                src="/img/replay-icon-color.png"
                alt="#"
                width={100}
                height={100}
              />
            </div>
            <div className="title">
              <h1>Rediffusion</h1>
            </div>
            <div>
              <p>Revisionner les dernières intervention de nos experts!</p>
            </div>
          </Link>

          <Link href="/edition-2024/etude" className="menu etude">
            <div className="icon">
              <Image
                src="/img/2024/themes.png"
                alt="#"
                width={100}
                height={100}
              />
            </div>
            <div className="title">
              <h1>Nos Etudes</h1>
            </div>
            <div>
              <p>Consultez la liste de nos études.</p>
            </div>
          </Link>

          <Link href="/edition-2024/orateur" className="menu orateur">
            <div className="icon">
              <Image
                src="/img/2024/speakers.png"
                alt="#"
                width={100}
                height={100}
              />
            </div>
            <div className="title">
              <h1>Orateurs</h1>
            </div>
            <div>
              <p>
                Accedez à plus de 20 experts régionaux et internationaux
                intervenant sur le forum.
              </p>
            </div>
          </Link>
        </div>

       <EtudeSection etudes={etudes} />
      </section>
    </Suspense>
  );
}
