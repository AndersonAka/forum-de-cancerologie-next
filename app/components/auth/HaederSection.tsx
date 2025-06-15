"use client"

import Image from "next/image"

export const HeaderSection = () => {
    return (
        <>
            <header>
                <div className="container">
                    <div className="hotel">
                        <Image src="/img/noomhotel.png" alt="#" width={1000} height={500} />
                    </div>
                    <div className="title"><h1>FORUM DE CANCEROLOGIE<br /><small>DE ROCHE 2025</small></h1></div>
                    <p>Inscrivez vous en toute sécurité pour accéder<br />au Forum de Cancerologie de Roche.</p>
                </div>
            </header>
        </>
    )
}