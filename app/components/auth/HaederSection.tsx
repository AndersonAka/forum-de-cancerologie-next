"use client"

import Image from "next/image"

export const HeaderSection = () => {
    return (
        <>
            <header>
                <div className="container">
                    <div className="hotel">
                        <Image src="/img/noomhotel.png" alt="Noom Hotel" width={1020} height={500} />
                    </div>
                    <div className="title">
                        <h1>FORUM DE CANCEROLOGIE<br /><small>DE ROCHE 2025</small></h1>
                    </div>
                    <p>Connectez-vous en toute sécurité pour accéder au Forum de Cancerologie de Roche.</p>
                </div>
            </header>
        </>
    )
}