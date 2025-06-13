'use client';

import Image from 'next/image';

export default function ProgramSection() {
  return (
    <div className="program">
      <div className="program-title">
        <h1><small>AU</small> PROGRAMME</h1>
      </div>
      <div className='program-des'>
        <div className="program-item item-1">
          <Image
            src="/img/PROGRAM-2025-01.png"
            alt="Ateliers"
            width={200}
            height={200}
          />
          <p>Ateliers</p>
        </div>

        <div className="program-item item-2">
          <Image
            src="/img/PROGRAM-2025-02.png"
            alt="Conférences"
            width={200}
            height={200}
          />
          <p>Conférences</p>
        </div>

        <div className="program-item item-3">
          <Image
            src="/img/PROGRAM-2025-03.png"
            alt="Débats"
            width={200}
            height={200}
          />
          <p>Débats</p>
        </div>

        <div className="program-item item-4">
          <Image
            src="/img/PROGRAM-2025-04.png"
            alt="Communications Libres"
            width={200}
            height={200}
            className="mx-auto mb-4"
          />
          <p className="text-lg font-semibold">Communications Libres</p>
        </div>
      </div>
    </div>
  );
} 