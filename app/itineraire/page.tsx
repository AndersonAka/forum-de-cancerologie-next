'use client';

import React, { useEffect } from 'react';
import styles from './itineraire.module.css';

declare global {
    interface Window {
        google: any;
        initMap: () => void;
    }
}

export default function Itineraire() {
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
            const map = new window.google.maps.Map(document.getElementById('map'), {
                zoom: 15,
                center: location,
            });
            new window.google.maps.Marker({
                position: location,
                map: map,
                title: 'Noom Hôtel Plateau Abidjan'
            });
        };

        return () => {
            document.head.removeChild(script);
            delete window.initMap;
        };
    }, []);

    return (
        <main>
            <div className={styles.itineraireWrapper}>
                <div className={styles.container}>
                    <h1 className={styles.title}>Comment nous trouver</h1>

                    <div className={styles.mapContainer} id="map"></div>

                    <div className={styles.infoSection}>
                        <h2 className={styles.infoTitle}>Adresse</h2>
                        <p className={styles.infoText}>
                            Noom Hôtel Plateau Abidjan<br />
                            Boulevard de la République<br />
                            Abidjan, Côte d&apos;Ivoire
                        </p>
                    </div>

                    <div className={styles.infoSection}>
                        <h2 className={styles.infoTitle}>Comment s&apos;y rendre</h2>
                        <ul className={styles.directionsList}>
                            <li className={styles.directionsItem}>
                                En voiture : Parking disponible sur place
                            </li>
                            <li className={styles.directionsItem}>
                                En taxi : Demander à être déposé au Noom Hôtel Plateau
                            </li>
                            <li className={styles.directionsItem}>
                                En bus : Arrêt &quot;Plateau&quot; à proximité
                            </li>
                        </ul>
                    </div>

                    <div className={styles.infoSection}>
                        <h2 className={styles.infoTitle}>Informations pratiques</h2>
                        <div className={styles.practicalInfo}>
                            <div className={styles.infoCard}>
                                <h3 className={styles.infoCardTitle}>Horaires d&apos;ouverture</h3>
                                <p className={styles.infoCardText}>
                                    Du lundi au vendredi : 8h - 20h<br />
                                    Samedi : 9h - 18h<br />
                                    Dimanche : Fermé
                                </p>
                            </div>
                            <div className={styles.infoCard}>
                                <h3 className={styles.infoCardTitle}>Accessibilité</h3>
                                <p className={styles.infoCardText}>
                                    Accès handicapé disponible<br />
                                    Ascenseur présent
                                </p>
                            </div>
                            <div className={styles.infoCard}>
                                <h3 className={styles.infoCardTitle}>Services</h3>
                                <p className={styles.infoCardText}>
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