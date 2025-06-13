import Image from 'next/image';
import ProgramSection from './components/ProgramSection';
import MenuList from './components/MenuList';
import ExpertsSection from './components/ExpertsSection';
import ContactSeaction from './components/ContactSection';

export default function Home() {
  return (
    <main className="min-h-screen">
      <header className="bg-gradient-to-b from-blue-900 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">
              FORUM DE CANCEROLOGIE DE ROCHE 2025
            </h1>
            <div className="flex justify-center space-x-4 mb-8">
              <Image
                src="/img/PARCOUR-SOIN-TEXTE.png"
                alt="Parcours Soin"
                width={300}
                height={100}
              />
              <Image
                src="/img/PARCOUR-SOIN-04.png"
                alt="Parcours Soin Description"
                width={300}
                height={100}
              />
            </div>
            <div className="flex justify-center items-center space-x-8">
              <Image
                src="/img/date-2025-05.png"
                alt="Date 2025"
                width={200}
                height={50}
              />
              <div className="flex items-center">
                <Image
                  src="/img/localisation.png"
                  alt="Localisation"
                  width={24}
                  height={24}
                  className="mr-2"
                />
                <p>Noom Hôtel Plateau Abidjan</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <ProgramSection />
      <MenuList />
      <ExpertsSection />
      <ContactSeaction />
    </main>
  );
} 