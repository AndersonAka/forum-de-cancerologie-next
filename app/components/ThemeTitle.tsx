"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { BoutonLiveReplay } from "./BoutonLiveReplay";

export const ThemeTitle = () => {
    const [isEventInProgress, setIsEventInProgress] = useState(false);

    useEffect(() => {
        const eventStartDate = new Date('2025-06-26T00:00:00');
        const eventEndDate = new Date('2025-06-27T23:59:59');

        const checkEventStatus = () => {
            const currentTime = new Date();
            const isInProgress = currentTime >= eventStartDate && currentTime <= eventEndDate;
            setIsEventInProgress(isInProgress);
        };

        // Vérifier immédiatement
        checkEventStatus();

        // Vérifier toutes les minutes
        const timer = setInterval(checkEventStatus, 60000);

        return () => clearInterval(timer);
    }, []);

    return (
        <>
            {isEventInProgress && (
                <BoutonLiveReplay activeReplay={false} width={150} height={35} />
            )}
        <section className="title-menu">
            <div className="title-intro">
                <p>FORUM DE CANCEROLOGIE DE ROCHE 2025</p>
            </div>
            <div className="theme-title">
                <div className="theme">
                    <Image src="/img/PARCOUR-SOIN-TEXTE.png" alt="#" width={350} height={350} />
                </div>
                <div className="theme-des">
                    <Image src="/img/PARCOUR-SOIN-04.png" alt="#" width={400} height={250} />
                </div>
            </div>
            <div className="date-location">
                <div className="date"><Image src="/img/date-2025-05.png" alt="#" width={250} height={120} /></div>
                <div className="location">
                    <Image src="/img/localisation.png" alt="#" width={95} height={40} />
                    <p>Noom Hôtel Plateau Abidjan</p>
                </div>
            </div>
        </section>
        </>
    );
};