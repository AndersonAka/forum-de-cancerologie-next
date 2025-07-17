"use client"

import { Etude } from "@/app/types/interface";

export const EtudeSection = ({ etudes }: { etudes: Etude[] }) => {
    const handleOpenPdf = (pdfUrl: string) => {
        window.open(pdfUrl, '_blank', 'noopener,noreferrer');
    };

    return (
        <>
            <section className="program-element">
                <div className="program">
                    <div className="program-title">
                        <h1><small><br />NOS</small> ETUDES</h1>
                    </div>
                </div>
            </section>

            <section id="nos-etudes" className="etudes">
                {etudes.map((etude) => (
                    <div key={etude.id} className={`etude ${etude.id}`}>
                        <div className="etude-number">
                            <h5>{etude.title}</h5>
                        </div>
                        <div className="etude-theme">
                            <h1>{etude.description}</h1>
                        </div>
                        <hr />
                        <button
                            onClick={() => handleOpenPdf(etude.pdfUrl)}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-colors"
                        >
                            Consulter l&apos;étude
                        </button>
                    </div>
                ))}
            </section>
        </>
    );
};