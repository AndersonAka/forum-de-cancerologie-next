"use client";

import { useState, useEffect } from "react";

export const CountDown = () => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });
    const [isLoading, setIsLoading] = useState(true);
    const [isEventInProgress, setIsEventInProgress] = useState(false);

    useEffect(() => {
        const eventStartDate = new Date('2025-06-26T00:00:00');
        const eventEndDate = new Date('2025-06-27T23:59:59');

        const timer = setInterval(() => {
            const currentTime = new Date();

            // Vérifier si l'événement est en cours
            if (currentTime >= eventStartDate && currentTime <= eventEndDate) {
                setIsEventInProgress(true);
                setIsLoading(false);
                return;
            }

            // Calculer le temps restant jusqu'au début de l'événement
            const difference = eventStartDate.getTime() - currentTime.getTime();

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60)
                });
                setIsEventInProgress(false);
                setIsLoading(false);
            } else {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                setIsEventInProgress(false);
                setIsLoading(false);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const CountDownItem = ({ value, label }: { value: number; label: string }) => (
        <div className="countdown-item text-center">
            <div className="countdown-value text-2xl font-bold text-blue-800">
                {isLoading ? (
                    <div className="animate-pulse bg-slate-300 h-8 w-12 rounded mx-auto"></div>
                ) : (
                    value.toString().padStart(2, '0')
                )}
            </div>
            <div className="countdown-label text-xs text-gray-600 uppercase">
                {label}
            </div>
        </div>
    );

    if (isEventInProgress) {
        return (
            <div className="fixed bottom-4 left-4 z-40 countdown-container bg-green-50/95 backdrop-blur-sm rounded-lg p-3 shadow-xl border border-green-200 max-w-xs">
                <h3 className="text-sm font-semibold text-green-800 mb-2 text-center">
                    🎉 Événement en cours !
                </h3>
                <div className="text-xs text-green-700 text-center">
                    Jusqu&apos;au 27 juin 2025.
                </div>
            </div>
        );
    }

    return (
        <div className="fixed bottom-4 left-4 z-40 countdown-container bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-xl border border-gray-200 max-w-xs">
            <h3 className="text-sm font-semibold text-gray-800 mb-2 text-center">
                Temps restant avant l&apos;événement
            </h3>
            <div className="countdown-grid grid grid-cols-4 gap-2">
                <CountDownItem value={timeLeft.days} label="Jours" />
                <CountDownItem value={timeLeft.hours} label="Heures" />
                <CountDownItem value={timeLeft.minutes} label="Minutes" />
                <CountDownItem value={timeLeft.seconds} label="Secondes" />
            </div>
        </div>
    );
}; 