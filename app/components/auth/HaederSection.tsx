"use client"

import Image from "next/image"

export const HeaderSection = () => {
    return (
        <header>
            <div className="container">
                <div className="hotel">
                    <Image src="/img/noomhotel.png" alt="#" width={1000} height={500} />
                </div>
                <div className="flex justify-center items-center mt-12 text-4xl leading-[5rem] text-bleu-roche">
                    <h1 className="font-bold text-4xl sm:text-7xl">FORUM DE CANCEROLOGIE<br />
                        <small className="text-2xl sm:text-3xl">DE ROCHE 2025</small>
                    </h1>
                </div>
                <p>Inscrivez vous en toute sécurité pour accéder<br />au Forum de Cancerologie de Roche.</p>
            </div>
        </header>
    )
}