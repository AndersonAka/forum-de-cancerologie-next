"use client";

import React, { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Orateur() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <section className="program-element py-5">
        <div className="menu-list">
          <Link href="/edition-2024/rediffusion" className="menu rediffussion">
            <div className="icon">
              <Image
                src="/img/replay-icon-color.png"
                alt="#"
                width={100}
                height={100}
              />
            </div>
            <div className="title">
              <h1>Rediffusion</h1>
            </div>
            <div>
              <p>Revisionner les dernières intervention de nos experts!</p>
            </div>
          </Link>

          <Link href="/edition-2024/etude" className="menu etude">
            <div className="icon">
              <Image
                src="/img/2024/themes.png"
                alt="#"
                width={100}
                height={100}
              />
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
                src="/img/2024/speakers.png"
                alt="#"
                width={100}
                height={100}
              />
            </div>
            <div className="title">
              <h1>Orateurs</h1>
            </div>
            <div>
              <p>
                Accedez à plus de 20 experts régionaux et internationaux
                intervenant sur le forum.
              </p>
            </div>
          </Link>
        </div>

        <div className="program">
          <div className="program-title">
            <h1>
              <small>
                <br />
                NOS
              </small>{" "}
              ORATEURS
            </h1>
          </div>
        </div>
      </section>

      <section className="orateurs">
        <div className="orateurs-container">
          <div className="orateur-details">
            <div className="details-container ctn-1">
              <div className="orateur-profil">
                <div className="profil-name">
                  <h1>
                    <small>PR INNOCENT</small> ADOUBI
                  </h1>
                </div>
                <div className="profil-des">
                  <div className="profil-photo">
                    <Image
                      src="/img/2024/orateur-name-02.png"
                      alt="#"
                      width={100}
                      height={100}
                    />
                  </div>
                  <div className="profil-country">Côte d'Ivoire</div>
                </div>
              </div>

              <div className="orateur-infos">
                <div className="function">Oncologue médical</div>
                <div className="titres">
                  <div className="titre ttl1">
                    <div className="check">
                      <Image
                        src="/img/2024/orateur-icon-04.png"
                        alt="#"
                        width={100}
                        height={100}
                      />
                    </div>
                    <div className="titre-des">
                      Chef du département d'oncologie de l'université Félix
                      Houphouët Boigny (Abidjan)
                    </div>
                  </div>

                  <div className="titre ttl2">
                    <div className="check">
                      <Image
                        src="/img/2024/orateur-icon-04.png"
                        alt="#"
                        width={100}
                        height={100}
                      />
                    </div>
                    <div className="titre-des">
                      Chef du service de cancérologie du CHU de Treichville
                      (Abidjan)
                    </div>
                  </div>

                  <div className="titre ttl3">
                    <div className="check">
                      <Image
                        src="/img/2024/orateur-icon-04.png"
                        alt="#"
                        width={100}
                        height={100}
                      />
                    </div>
                    <div className="titre-des">
                      Directeur du programme national de lutte contre le cancer
                      (PNLCA)
                    </div>
                  </div>
                </div>
                <div className="revoir-les-presentations">
                  <Image
                    src="/img/2024/orateur-link-07.png"
                    alt="#"
                    width={100}
                    height={100}
                  />
                </div>
              </div>
            </div>

            <div className="details-container ctn-2">
              <div className="orateur-profil">
                <div className="profil-name">
                  <h1>
                    <small>DR BILEY AUGUSTIN</small> KOUAMÉ
                  </h1>
                </div>
                <div className="profil-des">
                  <div className="profil-photo">
                    <Image
                      src="/img/2024/orateur-name-04.png"
                      alt="#"
                      width={100}
                      height={100}
                    />
                  </div>
                  <div className="profil-country">Côte d'Ivoire</div>
                </div>
              </div>

              <div className="orateur-infos">
                <div className="function">Oncologue médical</div>
                <div className="titres">
                  <div className="titre ttl1">
                    <div className="check">
                      <Image
                        src="/img/2024/orateur-icon-04.png"
                        alt="#"
                        width={100}
                        height={100}
                      />
                    </div>
                    <div className="titre-des">
                      Programme National de lutte contre le cancer (PNLCA)
                    </div>
                  </div>

                  <div className="titre ttl2">
                    <div className="check">
                      <Image
                        src="/img/2024/orateur-icon-04.png"
                        alt="#"
                        width={100}
                        height={100}
                      />
                    </div>
                    <div className="titre-des">
                      Chef de service de prévention des cancers
                    </div>
                  </div>
                </div>
                <div className="revoir-les-presentations">
                  <Image
                    src="/img/2024/orateur-link-07.png"
                    alt="#"
                    width={100}
                    height={100}
                  />
                </div>
              </div>
            </div>

            <div className="details-container ctn-3">
              <div className="orateur-profil">
                <div className="profil-name">
                  <h1>
                    <small>PR DRISS</small> MOUSSAOUI
                  </h1>
                </div>
                <div className="profil-des">
                  <div className="profil-photo">
                    <Image
                      src="/img/2024/orateur-name-06.png"
                      alt="#"
                      width={100}
                      height={100}
                    />
                  </div>
                  <div className="profil-country">Maroc</div>
                </div>
              </div>

              <div className="orateur-infos">
                <div className="function">Gynécologue</div>
                <div className="titres">
                  <div className="titre ttl1">
                    <div className="check">
                      <Image
                        src="/img/2024/orateur-icon-04.png"
                        alt="#"
                        width={100}
                        height={100}
                      />
                    </div>
                    <div className="titre-des">
                      Ex chef de service de Gynécologie-Obstétrique de l'hôpital
                      militaire de Rabat
                    </div>
                  </div>

                  <div className="titre ttl2">
                    <div className="check">
                      <Image
                        src="/img/2024/orateur-icon-04.png"
                        alt="#"
                        width={100}
                        height={100}
                      />
                    </div>
                    <div className="titre-des">
                      Installé en pratique Privée depuis 2021 en qualité de
                      Chirurgien Spécialisé en Chirurg
                    </div>
                  </div>
                </div>
                <div className="revoir-les-presentations">
                  <Image
                    src="/img/2024/orateur-link-07.png"
                    alt="#"
                    width={100}
                    height={100}
                  />
                </div>
              </div>
            </div>

            <div className="details-container ctn-4">
              <div className="orateur-profil">
                <div className="profil-name">
                  <h1>
                    <small>PR GERTRUDE LUYEYE</small> MVILA
                  </h1>
                </div>
                <div className="profil-des">
                  <div className="profil-photo">
                    <Image
                      src="/img/2024/orateur-name-08.png"
                      alt="#"
                      width={100}
                      height={100}
                    />
                  </div>
                  <div className="profil-country">
                    République Démocratique
                    <br />
                    du Congo
                  </div>
                </div>
              </div>

              <div className="orateur-infos">
                <div className="function">Radiologue</div>
                <div className="titres">
                  <div className="titre ttl1">
                    <div className="check">
                      <Image
                        src="/img/2024/orateur-icon-04.png"
                        alt="#"
                        width={100}
                        height={100}
                      />
                    </div>
                    <div className="titre-des">
                      Hôpital militaire camp Tshatshi de Kinshasa
                    </div>
                  </div>
                </div>
                <div className="revoir-les-presentations">
                  <Image
                    src="/img/2024/orateur-link-07.png"
                    alt="#"
                    width={100}
                    height={100}
                  />
                </div>
              </div>
            </div>

            <div className="details-container ctn-5">
              <div className="orateur-profil">
                <div className="profil-name">
                  <h1>
                    <small>PR JUDITH DIDI KOUKO</small> COULIBALY
                  </h1>
                </div>
                <div className="profil-des">
                  <div className="profil-photo">
                    <Image
                      src="/img/2024/orateur-name-10.png"
                      alt="#"
                      width={100}
                      height={100}
                    />
                  </div>
                  <div className="profil-country">Côte d'Ivoire</div>
                </div>
              </div>

              <div className="orateur-infos">
                <div className="function">Oncologue médicale</div>
                <div className="titres">
                  <div className="titre ttl1">
                    <div className="check">
                      <Image
                        src="/img/2024/orateur-icon-04.png"
                        alt="#"
                        width={100}
                        height={100}
                      />
                    </div>
                    <div className="titre-des">
                      Professeur titulaire d'oncologie à l'UFR des sciences
                      médicales de l'université Félix Houphouët Boigny (Abidjan)
                    </div>
                  </div>

                  <div className="titre ttl2">
                    <div className="check">
                      <Image
                        src="/img/2024/orateur-icon-04.png"
                        alt="#"
                        width={100}
                        height={100}
                      />
                    </div>
                    <div className="titre-des">
                      Directrice du centre national d'oncologie médicale et de
                      radiothérapie Alassane Ouattara (CNRAO)
                    </div>
                  </div>

                  <div className="titre ttl3">
                    <div className="check">
                      <Image
                        src="/img/2024/orateur-icon-04.png"
                        alt="#"
                        width={100}
                        height={100}
                      />
                    </div>
                    <div className="titre-des">
                      Première femme agrégée en oncologie d'afrique
                      subsahérienne francophone
                    </div>
                  </div>
                </div>
                <div className="revoir-les-presentations">
                  <Image
                    src="/img/2024/orateur-link-07.png"
                    alt="#"
                    width={100}
                    height={100}
                  />
                </div>
              </div>
            </div>

            <div className="details-container ctn-6">
              <div className="orateur-profil">
                <div className="profil-name">
                  <h1>
                    <small>PR NAZIK</small> ALLALI
                  </h1>
                </div>
                <div className="profil-des">
                  <div className="profil-photo">
                    <Image
                      src="/img/2024/orateur-name-12.png"
                      alt="#"
                      width={100}
                      height={100}
                    />
                  </div>
                  <div className="profil-country">Maroc</div>
                </div>
              </div>

              <div className="orateur-infos">
                <div className="function">Radiologue</div>
                <div className="titres">
                  <div className="titre ttl1">
                    <div className="check">
                      <Image
                        src="/img/2024/orateur-icon-04.png"
                        alt="#"
                        width={100}
                        height={100}
                      />
                    </div>
                    <div className="titre-des">
                      Responsable de l'unité d'imagerie de la femme au CHU de
                      rabat
                    </div>
                  </div>

                  <div className="titre ttl2">
                    <div className="check">
                      <Image
                        src="/img/2024/orateur-icon-04.png"
                        alt="#"
                        width={100}
                        height={100}
                      />
                    </div>
                    <div className="titre-des">
                      Enseignante à la faculté de médecine et de pharmacie de
                      l'université Mohamed 5 de Rabat
                    </div>
                  </div>
                </div>
                <div className="revoir-les-presentations">
                  <Image
                    src="/img/2024/orateur-link-07.png"
                    alt="#"
                    width={100}
                    height={100}
                  />
                </div>
              </div>
            </div>

            <div className="details-container ctn-7">
              <div className="orateur-profil">
                <div className="profil-name">
                  <h1>
                    <small>PR BIENVENU</small> LEBWAZE
                  </h1>
                </div>
                <div className="profil-des">
                  <div className="profil-photo">
                    <Image
                      src="/img/2024/orateur-name-14.png"
                      alt="#"
                      width={100}
                      height={100}
                    />
                  </div>
                  <div className="profil-country">
                    République Démocratique
                    <br />
                    du Congo
                  </div>
                </div>
              </div>

              <div className="orateur-infos">
                <div className="function">Anatomopathologiste</div>
                <div className="titres">
                  <div className="titre ttl1">
                    <div className="check">
                      <Image
                        src="/img/2024/orateur-icon-04.png"
                        alt="#"
                        width={100}
                        height={100}
                      />
                    </div>
                    <div className="titre-des">
                      Chef de service d'anatomopathologie des cliniques
                      universitaires de Kinshasa
                    </div>
                  </div>

                  <div className="titre ttl2">
                    <div className="check">
                      <Image
                        src="/img/2024/orateur-icon-04.png"
                        alt="#"
                        width={100}
                        height={100}
                      />
                    </div>
                    <div className="titre-des">
                      Directeur du centre nationale de lutte contre le cancer
                    </div>
                  </div>
                </div>
                <div className="revoir-les-presentations">
                  <Image
                    src="/img/2024/orateur-link-07.png"
                    alt="#"
                    width={100}
                    height={100}
                  />
                </div>
              </div>
            </div>

            <div className="details-container ctn-8">
              <div className="orateur-profil">
                <div className="profil-name">
                  <h1>
                    <small>DR ETIENNE</small> ATENGUENA
                  </h1>
                </div>
                <div className="profil-des">
                  <div className="profil-photo">
                    <Image
                      src="/img/2024/orateur-name-16.png"
                      alt="#"
                      width={100}
                      height={100}
                    />
                  </div>
                  <div className="profil-country">Cameroun</div>
                </div>
              </div>

              <div className="orateur-infos">
                <div className="function">Oncologue médical</div>
                <div className="titres">
                  <div className="titre ttl1">
                    <div className="check">
                      <Image
                        src="/img/2024/orateur-icon-04.png"
                        alt="#"
                        width={100}
                        height={100}
                      />
                    </div>
                    <div className="titre-des">
                      Responsable du service d'oncologie médicale de l'hôpital
                      général de Yaoundé
                    </div>
                  </div>
                </div>
                <div className="revoir-les-presentations">
                  <Image
                    src="/img/2024/orateur-link-07.png"
                    alt="#"
                    width={100}
                    height={100}
                  />
                </div>
              </div>
            </div>

            <div className="details-container ctn-9">
              <div className="orateur-profil">
                <div className="profil-name">
                  <h1>
                    <small>PR BRAHIMA</small> DOUKOURÉ
                  </h1>
                </div>
                <div className="profil-des">
                  <div className="profil-photo">
                    <Image
                      src="/img/2024/orateur-name-17.png"
                      alt="#"
                      width={100}
                      height={100}
                    />
                  </div>
                  <div className="profil-country">Côte d'Ivoire</div>
                </div>
              </div>

              <div className="orateur-infos">
                <div className="function">Anatomopathologiste</div>
                <div className="titres">
                  <div className="titre ttl1">
                    <div className="check">
                      <Image
                        src="/img/2024/orateur-icon-04.png"
                        alt="#"
                        width={100}
                        height={100}
                      />
                    </div>
                    <div className="titre-des">Professeur titula</div>
                  </div>

                  <div className="titre ttl2">
                    <div className="check">
                      <Image
                        src="/img/2024/orateur-icon-04.png"
                        alt="#"
                        width={100}
                        height={100}
                      />
                    </div>
                    <div className="titre-des">
                      Chef du service d'anatomopathologie du CHU de Cocody (Côte
                      d'Ivoire)
                    </div>
                  </div>
                </div>
                <div className="revoir-les-presentations">
                  <Image
                    src="/img/2024/orateur-link-07.png"
                    alt="#"
                    width={100}
                    height={100}
                  />
                </div>
              </div>
            </div>

            <div className="details-container ctn-10">
              <div className="orateur-profil">
                <div className="profil-name">
                  <h1>
                    <small>DR DOUDOU</small> DIOUF
                  </h1>
                </div>
                <div className="profil-des">
                  <div className="profil-photo">
                    <Image
                      src="/img/2024/orateur-name-20.png"
                      alt="#"
                      width={100}
                      height={100}
                    />
                  </div>
                  <div className="profil-country">Sénegal</div>
                </div>
              </div>

              <div className="orateur-infos">
                <div className="function">Oncologue médical</div>
                <div className="titres">
                  <div className="titre ttl1">
                    <div className="check">
                      <Image
                        src="/img/2024/orateur-icon-04.png"
                        alt="#"
                        width={100}
                        height={100}
                      />
                    </div>
                    <div className="titre-des">
                      Maître assistant à l'université Cheikh Anta Diop de Dakar
                    </div>
                  </div>

                  <div className="titre ttl2">
                    <div className="check">
                      <Image
                        src="/img/2024/orateur-icon-04.png"
                        alt="#"
                        width={100}
                        height={100}
                      />
                    </div>
                    <div className="titre-des">
                      Médecin à l'unité d'oncologie médicale et hôpital du jour
                      à l'hôpital militaire de Ouakam (Dakar)
                    </div>
                  </div>
                </div>
                <div className="revoir-les-presentations">
                  <Image
                    src="/img/2024/orateur-link-07.png"
                    alt="#"
                    width={100}
                    height={100}
                  />
                </div>
              </div>
            </div>

            <div className="details-container ctn-11">
              <div className="orateur-profil">
                <div className="profil-name">
                  <h1>
                    <small>PR BASMA</small> EL KHANNOUSSI
                  </h1>
                </div>
                <div className="profil-des">
                  <div className="profil-photo">
                    <Image
                      src="/img/2024/orateur-name-23.png"
                      alt="#"
                      width={100}
                      height={100}
                    />
                  </div>
                  <div className="profil-country">Maroc</div>
                </div>
              </div>

              <div className="orateur-infos">
                <div className="function">Anatomopathologiste</div>
                <div className="titres">
                  <div className="titre ttl1">
                    <div className="check">
                      <Image
                        src="/img/2024/orateur-icon-04.png"
                        alt="#"
                        width={100}
                        height={100}
                      />
                    </div>
                    <div className="titre-des">
                      Chef du service d'anatomopathologie de l'institut
                      d'oncologie de Rabat
                    </div>
                  </div>

                  <div className="titre ttl2">
                    <div className="check">
                      <Image
                        src="/img/2024/orateur-icon-04.png"
                        alt="#"
                        width={100}
                        height={100}
                      />
                    </div>
                    <div className="titre-des">
                      Enseignante à la faculté de médecine et de pharmacie de
                      l'université Mohamed 5 de Rabat
                    </div>
                  </div>
                </div>
                <div className="revoir-les-presentations">
                  <Image
                    src="/img/2024/orateur-link-07.png"
                    alt="#"
                    width={100}
                    height={100}
                  />
                </div>
              </div>
            </div>

            <div className="details-container ctn-12">
              <div className="orateur-profil">
                <div className="profil-name">
                  <h1>
                    <small>PR YVON</small> KOUASSI
                  </h1>
                </div>
                <div className="profil-des">
                  <div className="profil-photo">
                    <Image
                      src="/img/2024/orateur-name-22.png"
                      alt="#"
                      width={100}
                      height={100}
                    />
                  </div>
                  <div className="profil-country">Côte d'Ivoire</div>
                </div>
              </div>

              <div className="orateur-infos">
                <div className="function">Oncologue médical</div>
                <div className="titres">
                  <div className="titre ttl1">
                    <div className="check">
                      <Image
                        src="/img/2024/orateur-icon-04.png"
                        alt="#"
                        width={100}
                        height={100}
                      />
                    </div>
                    <div className="titre-des">
                      Maître de conférence agrégé en oncologie médicale
                    </div>
                  </div>

                  <div className="titre ttl2">
                    <div className="check">
                      <Image
                        src="/img/2024/orateur-icon-04.png"
                        alt="#"
                        width={100}
                        height={100}
                      />
                    </div>
                    <div className="titre-des">
                      Coordinateur général des soins en oncologie du CHU de
                      Treichville (Abidjan)
                    </div>
                  </div>
                </div>
                <div className="revoir-les-presentations">
                  <Image
                    src="/img/2024/orateur-link-07.png"
                    alt="#"
                    width={100}
                    height={100}
                  />
                </div>
              </div>
            </div>

            <div className="details-container ctn-13">
              <div className="orateur-profil">
                <div className="profil-name">
                  <h1>
                    <small>DR AMARALDO</small> AYÉMOU
                  </h1>
                </div>
                <div className="profil-des">
                  <div className="profil-photo">
                    <Image
                      src="/img/2024/orateur-name-19.png"
                      alt="#"
                      width={100}
                      height={100}
                    />
                  </div>
                  <div className="profil-country">Côte d'Ivoire</div>
                </div>
              </div>

              <div className="orateur-infos">
                <div className="function">Radiothérapeute</div>
                <div className="titres">
                  <div className="titre ttl1">
                    <div className="check">
                      <Image
                        src="/img/2024/orateur-icon-04.png"
                        alt="#"
                        width={100}
                        height={100}
                      />
                    </div>
                    <div className="titre-des">
                      Institut européen de cancérologie de Bingerville
                    </div>
                  </div>
                </div>
                <div className="revoir-les-presentations">
                  <Image
                    src="/img/2024/orateur-link-07.png"
                    alt="#"
                    width={100}
                    height={100}
                  />
                </div>
              </div>
            </div>

            <div className="details-container ctn-14">
              <div className="orateur-profil">
                <div className="profil-name">
                  <h1>
                    <small>PR SIDY</small> KA
                  </h1>
                </div>
                <div className="profil-des">
                  <div className="profil-photo">
                    <Image
                      src="/img/2024/orateur-name-21.png"
                      alt="#"
                      width={100}
                      height={100}
                    />
                  </div>
                  <div className="profil-country">Sénégal</div>
                </div>
              </div>

              <div className="orateur-infos">
                <div className="function">Chrirurgien oncologue</div>
                <div className="titres">
                  <div className="titre ttl1">
                    <div className="check">
                      <Image
                        src="/img/2024/orateur-icon-04.png"
                        alt="#"
                        width={100}
                        height={100}
                      />
                    </div>
                    <div className="titre-des">
                      Chef du service de Cancérologie du Centre Hospitalier
                      National Dalal Jamm
                    </div>
                  </div>

                  <div className="titre ttl2">
                    <div className="check">
                      <Image
                        src="/img/2024/orateur-icon-04.png"
                        alt="#"
                        width={100}
                        height={100}
                      />
                    </div>
                    <div className="titre-des">
                      Chargé d'enseignement de Cancérologie à l'Université
                      Cheikh Anta Diop de Dakar
                    </div>
                  </div>

                  <div className="titre ttl3">
                    <div className="check">
                      <Image
                        src="/img/2024/orateur-icon-04.png"
                        alt="#"
                        width={100}
                        height={100}
                      />
                    </div>
                    <div className="titre-des">
                      Coordonnateur du DES de Cancérologie Chirurgicale à
                      l'Université Cheikh Anta Diop de Dakar
                    </div>
                  </div>

                  <div className="titre ttl4">
                    <div className="check">
                      <Image
                        src="/img/2024/orateur-icon-04.png"
                        alt="#"
                        width={100}
                        height={100}
                      />
                    </div>
                    <div className="titre-des">
                      Président du Groupe d'Etudes et de Recherches sur les
                      Cancers (GERC)
                    </div>
                  </div>
                </div>
                <div className="revoir-les-presentations">
                  <Image
                    src="/img/2024/orateur-link-07.png"
                    alt="#"
                    width={100}
                    height={100}
                  />
                </div>
              </div>
            </div>
            <div className="details-container ctn-15">
              <div className="orateur-profil">
                <div className="profil-name">
                  <h1>
                    <small>DR NARJISS</small> BERRADA
                  </h1>
                </div>
                <div className="profil-des">
                  <div className="profil-photo">
                    <Image
                      src="/img/2024/orateur-name-18.png"
                      alt="#"
                      width={100}
                      height={100}
                    />
                  </div>
                  <div className="profil-country">Maroc</div>
                </div>
              </div>

              <div className="orateur-infos">
                <div className="function">Oncologue médicale</div>
                <div className="titres">
                  <div className="titre ttl1">
                    <div className="check">
                      <Image
                        src="/img/2024/orateur-icon-04.png"
                        alt="#"
                        width={100}
                        height={100}
                      />
                    </div>
                    <div className="titre-des">
                      Clinique Chellah Oncology, Rabat (MAROC)
                    </div>
                  </div>

                  <div className="titre ttl2">
                    <div className="check">
                      <Image
                        src="/img/2024/orateur-icon-04.png"
                        alt="#"
                        width={100}
                        height={100}
                      />
                    </div>
                    <div className="titre-des">
                      Secrétaire générale de l'Association Marocaine de
                      Formation et de Recherche en Oncologie Médicale (AMFROM)
                    </div>
                  </div>
                </div>
                <div className="revoir-les-presentations">
                  <Image
                    src="/img/2024/orateur-link-07.png"
                    alt="#"
                    width={100}
                    height={100}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Suspense>
  );
}
