"use client"

import Image from "next/image";
import Link from "next/link";
import { BoutonLiveReplay } from "../BoutonLiveReplay";

export const ProgrammeElement = () => {
    return (
        <section className="program-element">
            <div className="program">
                <div className="program-title">
                    <h1><small>AU</small> PROGRAMME</h1>
                </div>
                <div className="program-des">
                    <div className="program-item item-1">
                        <Image src="/img/PROGRAM-2025-01.png" alt="#" width={100} height={100} />
                        <p>Ateliers</p>
                    </div>
                    <div className="program-item item-2">
                        <Image src="/img/PROGRAM-2025-02.png" alt="#" width={100} height={100} />
                        <p>Conférences</p>
                    </div>
                    <div className="program-item item-3">
                        <Image src="/img/PROGRAM-2025-03.png" alt="#" width={100} height={100} />
                        <p>Débats</p>
                    </div>
                    <div className="program-item item-4">
                        <Image src="/img/PROGRAM-2025-04.png" alt="#" width={100} height={100} />
                        <p>Communications Libres</p>
                    </div>
                </div>
            </div>
            <div className="menu-list">
                <div className="menu direct">
                    <Link href="/direct" >
                        <span className="icon">
                            <Image src="/img/play-icon.png" alt="#" width={70} height={60} />
                        </span>
                    </Link>
                    <h1>Direct 2025</h1>
                    <p>Lancez une session en live depuis
                        votre position et participer
                        virtuellement au forum.
                    </p>
                </div>

                <Link href="/rediffusion" className="menu rediffussion">
                    <span className="icon">
                        <Image src="/img/replay-icon-color.png" alt="#" width={70} height={60} />
                    </span>
                    <span >
                        <h1>Rediffusion 2024</h1>
                    </span>
                    <p>Revisionnez les dernières
                        interventions de nos experts durant le forum de cancerologie 2024
                    </p>
                </Link>

                <Link href="/orateur" className="menu orateur">
                    <span className="icon">
                        <Image src="/img/speakers.png" alt="#" width={70} height={60} />
                    </span>
                    <h1>Orateurs</h1>
                    <p>Accedez à plus de 30 experts
                        régionaux et internationaux
                        intervenant sur le forum</p>
                </Link>

                <Link href="/agenda" className="menu orateur">
                    <span className="icon">
                        <Image src="/img/diary.png" alt="#" width={70} height={60} />
                    </span>
                    <h1>Agenda 2025</h1>
                    <p>Consultez l&apos;agenda du forum de
                        cancérologie de roche</p>
                </Link>

                <Link href="/etude" className="menu etude">
                    <span className="icon">
                        <Image src="/img/themes.png" alt="#" width={70} height={60} />
                    </span>
                    <h1>Nos Etudes</h1>
                    <p>Consultez Nos Etudes</p>
                </Link>

                <Link href="/itineraire" className="menu itinéraire">
                    <span className="icon">
                        <Image src="/img/localisation-icon.png" alt="#" width={70} height={60} />
                    </span>
                    <h1>Itinéraire</h1>
                    <p>Accedez à un itinéraire google map
                        pour participer en présentiel au forum</p>
                </Link>

            </div>

            <div className="experts">
                <div className="expert-text">
                    <div className="expert exp-1">
                        <h1>+30</h1>
                        <h5>Experts régionaux <br />& internationaux</h5>
                    </div>

                    <div className="expert exp-2">
                        <h5>Des partages<br />d&apos;expériences</h5>
                    </div>
                </div>
                <div className=""><Image src="/img/people-connect.png" alt="#" width={370} height={270} /></div>
            </div>

            <BoutonLiveReplay />

        </section>
    )
}