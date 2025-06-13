import Image from 'next/image';
import ProgramSection from './components/ProgramSection';
import MenuList from './components/MenuList';
import ExpertsSection from './components/ExpertsSection';

export default function Home() {
  return (
    <>
      <section className="title-menu">
        <div className="text-center mb-8">
          <h1 className="title-intro uppercase">
            Ensemble contre le Cancer DE ROCHE 2025
          </h1>
          <div className="theme-title">
            <div className='theme'>
              <Image
                src="/img/PARCOUR-SOIN-TEXTE.png"
                alt="Parcours Soin"
                width={300}
                height={100}
              />
            </div>
            <div className='theme'>
              <Image
                src="/img/PARCOUR-SOIN-04.png"
                alt="Parcours Soin Description"
                width={300}
                height={100}
              />
            </div>
          </div>
          <div className="date-location">
            <Image
              src="/img/date-2025-05.png"
              alt="Date 2025"
              width={200}
              height={50}
              className='date'
            />
            <div className="location">
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
      </section>

      <section className="program-element">
        <ProgramSection />
        <MenuList />
        <ExpertsSection />
      </section>

    </>
  );
} 