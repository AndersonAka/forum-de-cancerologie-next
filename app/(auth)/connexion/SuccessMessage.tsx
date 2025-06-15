'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function SuccessMessageContent() {
    const searchParams = useSearchParams();
    const success = searchParams.get('success');

    if (!success) return null;

    return (
        <div className="success-message" role="alert">
            <strong>Félicitations !</strong>
            <span>Votre inscription a été effectuée avec succès. Vous pouvez maintenant vous connecter.</span>
        </div>
    );
}

export default function SuccessMessage() {
    return (
        <Suspense fallback={null}>
            <SuccessMessageContent />
        </Suspense>
    );
} 