'use client';

import React, { Suspense } from 'react';

function ItineraireContent() {
    return (
        <header className="body-head">
            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15890.430737580336!2d-4.0152007!3d5.3237269!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfc1eb748b01e529%3A0xab67e18fad2d52c2!2sNoom%20Hotel%20Abidjan%20Plateau!5e0!3m2!1sfr!2sci!4v1717431702316!5m2!1sfr!2sci" width="800" height="600" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </header>
    );
}

export default function Itineraire() {
    return (
        <Suspense fallback={<div>Chargement...</div>}>
            <ItineraireContent />
        </Suspense>
    );
} 