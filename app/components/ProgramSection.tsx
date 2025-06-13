'use client';

import Image from 'next/image';

export default function ProgramSection() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold">
            <small className="text-2xl block mb-2">AU</small> PROGRAMME
          </h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <Image 
              src="/img/PROGRAM-2025-01.png" 
              alt="Ateliers" 
              width={200} 
              height={200}
              className="mx-auto mb-4"
            />
            <p className="text-lg font-semibold">Ateliers</p>
          </div>
          
          <div className="text-center">
            <Image 
              src="/img/PROGRAM-2025-02.png" 
              alt="Conférences" 
              width={200} 
              height={200}
              className="mx-auto mb-4"
            />
            <p className="text-lg font-semibold">Conférences</p>
          </div>
          
          <div className="text-center">
            <Image 
              src="/img/PROGRAM-2025-03.png" 
              alt="Débats" 
              width={200} 
              height={200}
              className="mx-auto mb-4"
            />
            <p className="text-lg font-semibold">Débats</p>
          </div>
          
          <div className="text-center">
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
    </section>
  );
} 