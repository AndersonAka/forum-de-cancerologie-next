"use client";

import Image from "next/image";

export const ThemeTitle = () => {
    return (
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
    );
};