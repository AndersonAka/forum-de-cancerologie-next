"use client";

import Image from "next/image";
import Link from "next/link";

export default function DirectContent() {
    return (
        <header>
            <section className="title-menu">

                <div className="title-intro">
                    <p>FORUM DE CANCEROLOGIE DE ROCHE 2025</p>
                </div>

                <div className="restez-connectes">Restez Connectés !</div>

                <div className="bientot">Nous démarrons bientôt</div>

                <div style={{ width: "100%", height: "0px", position: "relative", paddingBottom: "56.25%" }}>
                    <iframe src="https://streamyard.com/watch/YgtYDyCpAGjC?embed=true" width="100%" height="100%" frameBorder="0" allow="autoplay; fullscreen" style={{ width: "100%", height: "100%", position: "absolute", left: "0px", top: "0px", overflow: "hidden" }}>
                    </iframe>
                </div>

                <div className="theme-title">
                    <div className="theme">
                        <Image src="/img/orateur-icon-03.png" alt="#" width={50} height={50} />
                    </div>
                </div>

                <div className="webinar-container">
                    <Link href="#" className="webinar">
                        <Image src="/img/direct-img-02.png" alt="#" width={50} height={50} />
                    </Link>
                </div>

            </section>

            <section className="disclaimer">
                <div className="disclaimer-icon">
                    <svg viewBox="0 0 47.5 42.84">
                        <path d="M23.75,3.86c.86,0,1.71.42,2.2,1.27l17.34,30.03c.98,1.7-.24,3.82-2.2,3.82H6.41c-1.96,0-3.18-2.12-2.2-3.82L21.54,5.13c.49-.85,1.35-1.27,2.2-1.27M23.75,0c-1.09,0-2.16.28-3.11.8-1.01.56-1.85,1.39-2.44,2.4L.86,33.23C.28,34.25-.02,35.39,0,36.54c.02,1.08.32,2.15.86,3.09.54.94,1.32,1.74,2.25,2.29.99.59,2.13.91,3.3.91h34.68c1.17,0,2.31-.31,3.3-.91.93-.56,1.71-1.35,2.25-2.29s.84-2.01.86-3.09c.02-1.15-.28-2.3-.86-3.31L29.29,3.2c-.58-1.01-1.43-1.84-2.44-2.4-.95-.52-2.02-.8-3.11-.8h0Z" />
                        <path d="M23.92,32.99c-.75,0-1.39-.63-1.39-1.39s.63-1.39,1.39-1.39,1.39.63,1.39,1.39-.63,1.39-1.39,1.39ZM24.72,27.3h-1.61l-.44-11.2h2.48l-.44,11.2Z" />
                    </svg>
                </div>
                <div className="disclaimer-des">
                    <div className="text">
                        <p>Cette plateforme est dédiée aux échanges relatifs au programme scientifique du Forum de Cancérologie de Roche.
                            Elle n&apos;est pas destinée à la notification des évènements indésirables. <br /> <br />
                            Néanmoins, pour toute notification d&apos;un éventuel événement indésirable, veuillez le rapporter à l&apos;adresse:
                            global.irt_sahubtcs@roche.com
                        </p>
                    </div>
                </div>
            </section>
        </header>
    );
}