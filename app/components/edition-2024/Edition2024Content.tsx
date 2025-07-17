// Page d'accueil de l'édition 2024
import Image from "next/image";
import Link from "next/link";

export default function Edition2024Content() {
  return (
    <>
      <section className="interview-container">
        <div className="interview-title">
          <div className="vid-title">
            <div className="vid-text">
              <h1>
                <small>Nos </small>INTERVIEWS
              </h1>
            </div>
          </div>
        </div>

        <div className="video-list">
          <div className="interview it1">
            <div className="video">
              <video
                src="/img/2024/INTERVIEW/M-CI-00000327.INTERVIEW ALLALI.mp4"
                controls
                muted
                autoPlay
              ></video>
            </div>
            <h1>Professeur Nazik ALLALI</h1>
            <h3>Radiologue</h3>
          </div>

          <div className="interview it2">
            <div className="video">
              <video
                src="/img/2024/INTERVIEW/M-CI-00000328.INTERVIEW DOUDOU DIOUF.mp4"
                controls
                muted
                autoPlay
              ></video>
            </div>
            <h1>Docteur Doudou DIOUF</h1>
            <h3>Oncologue Médical</h3>
          </div>

          <div className="interview it3">
            <div className="video">
              <video
                src="/img/2024/INTERVIEW/M-CI-00000329.INTERVIEW NARJISS.mp4"
                controls
                muted
                autoPlay
              ></video>
            </div>
            <h1>Docteur Narjiss BERRADA</h1>
            <h3>Oncologue Médical</h3>
          </div>

          <div className="interview it4">
            <div className="video">
              <video
                src="/img/2024/INTERVIEW/M-CI-00000334.INTERVIEW DOUKOURE BRAHIMA.mp4"
                controls
                muted
                autoPlay
              ></video>
            </div>
            <h1>Professeur Doukoure BRAHIMA</h1>
            <h3>Anatomopathologiste</h3>
          </div>
        </div>
      </section>

      <section className="snakker-container">
        <Link href="https://player.snakker.io/s/rMAMmO5zVi">
          <Image
            width={100}
            height={100}
            src="/img/2024/SNAKKER/Breast cancer adjuvant snakk portrai.gif"
            alt="#"
          ></Image>
        </Link>
        <Link href="https://player.snakker.io/s/rMAMmO5zVi">
          <Image
            width={100}
            height={100}
            src="/img/2024/SNAKKER/Breast cancer metastatic snakk portrait 00.gif"
            alt="#"
          ></Image>
        </Link>
        <Link href="https://player.snakker.io/s/rMAMmO5zVi">
          <Image
            width={100}
            height={100}
            src="/img/2024/SNAKKER/Breast cancer snack trailer_Square.gif"
            alt="#"
          ></Image>
        </Link>
      </section>

      <section className="program-element">
        <div className="program">
          <div className="program-title">
            <h1>
              <small>AU</small> PROGRAMME
            </h1>
          </div>
          <div className="program-des">
            <div className="program-item item-1">
              <Image
                width={100}
                height={100}
                src="/img/2024/outils.png"
                alt="#"
              />
              <p>
                Les outils de
                <br />
                diagnostic
              </p>
            </div>
            <div className="program-item item-2">
              <Image
                width={100}
                height={100}
                src="/img/2024/molecules.png"
                alt="#"
              />
              <p>
                Les marqueurs
                <br />
                moléculaires
              </p>
            </div>
            <div className="program-item item-3">
              <Image
                width={100}
                height={100}
                src="/img/2024/traitements.png"
                alt="#"
              />
              <p>
                Les traitements
                <br />
                locorégionaux et
                <br />
                systémiques
              </p>
            </div>
            <div className="program-item item-4">
              <Image
                width={100}
                height={100}
                src="/img/2024/scientist.png"
                alt="#"
              />
              <p>
                Les avancées
                <br />
                Scientifiques
                <br />à venir
              </p>
            </div>
          </div>
        </div>
        <div className="menu-list">
          <Link href="/edition-2024/rediffusion" className="menu rediffussion">
            <div className="icon">
              <Image
                width={100}
                height={100}
                src="/img/2024/replay-icon-color.png"
                alt="#"
              ></Image>
            </div>
            <div className="title">
              <h1>Rediffusion</h1>
            </div>
            <div>
              <p>Revisionnez les dernières interventions de nos experts!</p>
            </div>
          </Link>

          <Link href="/edition-2024/etude" className="menu etude">
            <div className="icon">
              <Image
                width={100}
                height={100}
                src="/img/2024/themes.png"
                alt="#"
              ></Image>
            </div>
            <div className="title">
              <h1>Nos Etudes</h1>
            </div>
            <div>
              <p>Consultez la liste de nos études.</p>
            </div>
          </Link>

          <Link href="/edition-2024/orateur" className="menu orateur">
            <div className="icon">
              <Image
                width={100}
                height={100}
                src="/img/2024/speakers.png"
                alt="#"
              ></Image>
            </div>
            <div className="title">
              <h1>Orateurs</h1>
            </div>
            <div>
              <p>
                Accedez à plus de 20 experts régionaux et internationaux
                intervenant sur le forum
              </p>
            </div>
          </Link>
        </div>

        <div className="experts">
          <div className="expert-text">
            <div className="expert exp-1">
              <h1>+20</h1>
              <h5>
                Experts régionaux <br />& internationaux
              </h5>
            </div>

            <div className="expert exp-2">
              <h5>
                Des partages
                <br />
                d&apos;expériences
              </h5>
            </div>
          </div>
          <div className="expert-des">
            <Image
              width={100}
              height={100}
              src="/img/2024/people-connect.png"
              alt="#"
            ></Image>
          </div>
        </div>
      </section>
    </>
  );
}
