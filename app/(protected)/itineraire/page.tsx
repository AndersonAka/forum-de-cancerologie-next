'use client';

import React, { useEffect, Suspense } from 'react';

interface GoogleMap {
    setCenter: (center: { lat: number; lng: number }) => void;
    setZoom: (zoom: number) => void;
}

interface GoogleMaps {
    maps: {
        Map: new (element: HTMLElement, options: {
            zoom: number;
            center: { lat: number; lng: number };
        }) => GoogleMap;
        Marker: new (options: {
            position: { lat: number; lng: number };
            map: GoogleMap;
            title: string;
        }) => void;
    };
}

declare global {
    interface Window {
        google: GoogleMaps;
        initMap?: () => void;
    }
}

function ItineraireContent() {
    useEffect(() => {
        // Charger l'API Google Maps
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&callback=initMap`;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);

        // Initialiser la carte
        window.initMap = () => {
            const location = { lat: 5.320357, lng: -4.016107 }; // Coordonnées du Noom Hôtel Plateau Abidjan
            const mapElement = document.getElementById('map');
            if (mapElement) {
                const map = new window.google.maps.Map(mapElement, {
                    zoom: 15,
                    center: location,
                });
                new window.google.maps.Marker({
                    position: location,
                    map: map,
                    title: 'Noom Hôtel Plateau Abidjan'
                });
            }
        };

        return () => {
            document.head.removeChild(script);
            window.initMap = undefined;
        };
    }, []);

    return (
        <main>
            <div className="itineraireWrapper">
                <div className="container">
                    <h1 className="title">Comment nous trouver</h1>

                    <div className="mapContainer" id="map"></div>

                    <div className="infoSection">
                        <h2 className="infoTitle">Adresse</h2>
                        <p className="infoText">
                            Noom Hôtel Plateau Abidjan<br />
                            Boulevard de la République<br />
                            Abidjan, Côte d&apos;Ivoire
                        </p>
                    </div>

                    <div className="infoSection">
                        <h2 className="infoTitle">Comment s&apos;y rendre</h2>
                        <ul className="directionsList">
                            <li className="directionsItem">
                                En voiture : Parking disponible sur place
                            </li>
                            <li className="directionsItem">
                                En taxi : Demander à être déposé au Noom Hôtel Plateau
                            </li>
                            <li className="directionsItem">
                                En bus : Arrêt &quot;Plateau&quot; à proximité
                            </li>
                        </ul>
                    </div>

                    <div className="infoSection">
                        <h2 className="infoTitle">Informations pratiques</h2>
                        <div className="practicalInfo">
                            <div className="infoCard">
                                <h3 className="infoCardTitle">Horaires d&apos;ouverture</h3>
                                <p className="infoCardText">
                                    Du lundi au vendredi : 8h - 20h<br />
                                    Samedi : 9h - 18h<br />
                                    Dimanche : Fermé
                                </p>
                            </div>
                            <div className="infoCard">
                                <h3 className="infoCardTitle">Accessibilité</h3>
                                <p className="infoCardText">
                                    Accès handicapé disponible<br />
                                    Ascenseur présent
                                </p>
                            </div>
                            <div className="infoCard">
                                <h3 className="infoCardTitle">Services</h3>
                                <p className="infoCardText">
                                    WiFi gratuit<br />
                                    Climatisation<br />
                                    Restaurant sur place
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default function Itineraire() {
    return (
        <Suspense fallback={<div>Chargement...</div>}>
            <ItineraireContent />
        </Suspense>
    );
} 