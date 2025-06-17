"use client"

interface Etude {
    id: string;
    title: string;
    description: string;
    pdfUrl: string;
}

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

export const EtudeSection = () => {
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