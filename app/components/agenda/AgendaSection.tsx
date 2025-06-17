"use client"

// import Image from "next/image";
import { DownloadProgramButton } from "../DownloadProgramButton";

export const AgendaSection = () => {
    return (
        <section className="agenda">
            <div className="agenda-list jour-1">

                <div className="agenda-date">
                    <div className="date-title">
                        <div className="jour">JOUR</div>
                        <div className="jour-number">1</div>
                    </div>
                    <div className="date-complete">Jeudi 26 Juin 2025</div>
                </div>

                {/* Bouton de téléchargement du programme */}
                <div className="flex justify-center mb-6">
                    <DownloadProgramButton
                        day={1}
                        size="large"
                        variant="outline"
                        className="shadow-lg hover:shadow-xl"
                    />
                </div>

                <div className="agenda-container ATELIERS">

                    <div className="agenda-title title-1"> <h1>ATELIERS</h1></div>

                    <div className="agenda-group">

                        <div className="agenda-detail">

                            <div className="event-list">

                                <div className="pause-cafe"><h2>09h00 - 12h00</h2></div>


                            </div>

                            {/*   CHIRURGIE    */}

                            <div className="event-list">
                                <div className="hour h1"><h2>Chirurgie</h2></div>

                                <a href="rediffusion.html" className="event-title">
                                    <h3>
                                        Réalisation du ganglion sentinelle
                                    </h3>
                                </a>

                                <div className="orateur ort-1">
                                    <ul>
                                        <li>Pr Driss Moussaoui (Maroc)</li>
                                    </ul>
                                </div>

                                <a href="rediffusion.html" className="event-title">
                                    <h3>
                                        Aspects pratiques de la chirurgie du cancer du sein
                                    </h3>
                                </a>

                                <div className="orateur ort-1">
                                    <ul>
                                        <li>Pr Sidy Ka (Sénégal)</li>
                                    </ul>
                                </div>

                                {/* <div className="notification-mail">
                                    <Image src="/img/notification-icon-pink.png" alt="#" width={40} height={40} />
                                    <div className="notif-title">RECEVOIR UN RAPPEL</div>
                                </div> */}
                            </div>

                            {/*   ANATOMOPATOLOGIE    */}

                            <div className="event-list">
                                <div className="hour h1"><h2>Anatomopathologie et Imagerie</h2></div>

                                <a href="rediffusion.html" className="event-title">
                                    <h3>
                                        Thème à définir
                                    </h3>
                                </a>

                                <div className="orateur ort-1">
                                    <ul>
                                        <li>Pr Aboubacar Diabaté (Côte d&apos;Ivoire)</li>
                                    </ul>
                                </div>

                                <a href="rediffusion.html" className="event-title">
                                    <h3>
                                        Importance de la préanalytique
                                    </h3>
                                </a>

                                <div className="orateur ort-1">
                                    <ul>
                                        <li>Dr Alain Didier Abouna (Côte d&apos;Ivoire)</li>
                                    </ul>
                                </div>

                                <a href="rediffusion.html" className="event-title">
                                    <h3>
                                        Demande d&apos;examen anatomopathologique
                                    </h3>
                                </a>

                                <div className="orateur ort-1">
                                    <ul>
                                        <li>Pr Bienvenu Lebwaze (République Démocratique du Congo)</li>
                                    </ul>
                                </div>

                                {/* <div className="notification-mail">
                                    <Image src="/img/notification-icon-pink.png" alt="#" width={40} height={40} />
                                    <div className="notif-title">RECEVOIR UN RAPPEL</div>
                                </div> */}
                            </div>


                            {/*   Radiothérapie    */}

                            <div className="event-list">
                                <div className="hour h1"><h2>Radiothérapie</h2></div>

                                <a href="rediffusion.html" className="event-title">
                                    <h3>
                                        Implémentation de la radiothérapie hypofractionnée
                                    </h3>
                                </a>

                                <div className="orateur ort-1">
                                    <ul>
                                        <li>Dr Mouhamadou Bachir Ba (Sénégal)</li>
                                    </ul>
                                </div>

                                <a href="rediffusion.html" className="event-title">
                                    <h3>
                                        Délais de la radiothérapie dans le cancer du sein
                                    </h3>
                                </a>

                                <div className="orateur ort-1">
                                    <ul>
                                        <li>Dr Evrard Séka (Côte d&apos;Ivoire)</li>
                                    </ul>
                                </div>


                                {/* <div className="notification-mail">
                                    <Image src="/img/notification-icon-pink.png" alt="#" width={40} height={40} />
                                    <div className="notif-title">RECEVOIR UN RAPPEL</div>
                                </div> */}
                            </div>


                            {/*   Traitements médicaux et soins palliatifs    */}

                            <div className="event-list">
                                <div className="hour h1"><h2>Traitements médicaux et soins palliatifs</h2></div>

                                <a href="rediffusion.html" className="event-title">
                                    <h3>
                                        Traitements sous cutanées en oncologie
                                    </h3>
                                </a>

                                <a href="rediffusion.html" className="event-title">
                                    <h3>
                                        Annonce diagnostique (jeu de rôle)
                                    </h3>
                                </a>

                                <div className="orateur ort-1">
                                    <ul>
                                        <li>Dr Narjiss Berrada (Maroc)</li>
                                    </ul>
                                </div>




                                {/* <div className="notification-mail">
                                    <Image src="/img/notification-icon-pink.png" alt="#" width={40} height={40} />
                                    <div className="notif-title">RECEVOIR UN RAPPEL</div>
                                </div> */}
                            </div>

                        </div>

                    </div>

                </div>


                <div className="agenda-container PAUSE-dejeuner">

                    <div className="agenda-title title-1"> <h1>PAUSE DEJEUNER</h1></div>

                    <div className="agenda-group">

                        <div className="agenda-detail">

                            <div className="event-list">
                                <div className="pause-cafe"><h2>12h00 - 14h00</h2></div>
                            </div>

                            <div className="pause">
                                <h1>
                                    PAUSE
                                </h1>
                            </div>

                        </div>

                    </div>

                </div>

                <div className="agenda-container CONFERENCES">

                    <div className="agenda-title title-1"> <h1>CONFERENCES</h1></div>

                    <div className="agenda-group">

                        <div className="agenda-detail">

                            <div className="event-list">
                                <div className="pause-cafe"><h2>14h00 - 14h45</h2></div>
                            </div>

                            {/*   Imagerie    */}

                            <div className="event-list">
                                <div className="hour h1"><h2>Imagerie</h2></div>

                                <a href="rediffusion.html" className="event-title">
                                    <h3>
                                        Conduite à tenir devant les microcalcifications
                                    </h3>
                                </a>

                                <div className="orateur ort-1">
                                    <ul>
                                        <li>Pr Nazik Allali (Maroc)</li>
                                    </ul>
                                </div>

                                <a href="rediffusion.html" className="event-title">
                                    <h3>
                                        Place de l&apos;imagerie métabolique dans le diagnostic
                                    </h3>
                                </a>

                                <div className="orateur ort-1">
                                    <ul>
                                        <li>Pr Yassir Oufrokhi (Maroc)</li>
                                    </ul>
                                </div>






                                {/* <div className="notification-mail">
                                    <Image src="/img/notification-icon-pink.png" alt="#" width={100} height={100} />
                                    <div className="notif-title">RECEVOIR UN RAPPEL</div>
                                </div> */}
                            </div>

                        </div>

                    </div>

                </div>

                <div className="agenda-container DEBAT">

                    <div className="agenda-title title-1"> <h1>DEBAT</h1></div>

                    <div className="agenda-group">

                        <div className="agenda-detail">

                            <div className="event-list">
                                <div className="pause-cafe"><h2>14h45 - 15h15</h2></div>
                            </div>

                            <div className="event-list">
                                <div className="hour h1"><h2>Imagerie</h2></div>

                                <a href="rediffusion.html" className="event-title">
                                    <h3>
                                        Défis à relever pour rendre l&apos;imagerie plus performante dans notre contexte
                                    </h3>
                                </a>

                                <div className="orateur ort-1">
                                    <ul>
                                        <li>Pr Aboubacar Diabaté (Côte d&apos;Ivoire)</li>
                                        <li>Pr Nazik Allali (Maroc), Pr Yassir Oufrokhi (Maroc)</li>
                                    </ul>
                                </div>



                                {/* <div className="notification-mail">
                                    <Image src="/img/notification-icon-pink.png" alt="#" width={40} height={40} />
                                    <div className="notif-title">RECEVOIR UN RAPPEL</div>
                                </div> */}

                            </div>




                        </div>

                    </div>

                </div>

                <div className="agenda-container CONFERENCES-2">

                    <div className="agenda-title title-1"> <h1>CONFERENCES</h1></div>

                    <div className="agenda-group">

                        <div className="agenda-detail">

                            <div className="event-list">
                                <div className="pause-cafe"><h2>15h15 - 16h00</h2></div>
                            </div>

                            {/*   Anatomopathologie    */}

                            <div className="event-list">
                                <div className="hour h1"><h2>Anatomopathologie</h2></div>




                                <a href="rediffusion.html" className="event-title">
                                    <h3>
                                        Place de la phase préanalytique en 2025
                                    </h3>
                                </a>

                                <div className="orateur ort-1">
                                    <ul>
                                        <li>Pr Basma El Khannoussi (Maroc)</li>
                                    </ul>
                                </div>




                                <a href="rediffusion.html" className="event-title">
                                    <h3>
                                        Lésions délicates (in situ et frontières)
                                    </h3>
                                </a>

                                <div className="orateur ort-1">
                                    <ul>
                                        <li>Pr Brahima Doukouré (Côte d&apos;Ivoire)</li>
                                    </ul>
                                </div>




                                <a href="rediffusion.html" className="event-title">
                                    <h3>
                                        Place de la génomique dans le diagnostic du cancer du sein
                                    </h3>
                                </a>

                                <div className="orateur ort-1">
                                    <ul>
                                        <li>Dr Jean Pascal Demba Diop (Sénégal)</li>
                                    </ul>
                                </div>






                                {/* <div className="notification-mail">
                                    <Image src="/img/notification-icon-pink.png" alt="#" width={40} height={40} />
                                    <div className="notif-title">RECEVOIR UN RAPPEL</div>
                                </div> */}
                            </div>


                        </div>

                    </div>

                </div>

                <div className="agenda-container PAUSE-café">

                    <div className="agenda-title title-1"> <h1>PAUSE CAFE</h1></div>

                    <div className="agenda-group">

                        <div className="agenda-detail">

                            <div className="event-list">
                                <div className="pause-cafe"><h2>16h00 - 16h30</h2></div>
                            </div>

                            <div className="pause">
                                <h1>
                                    PAUSE
                                </h1>
                            </div>


                        </div>

                    </div>

                </div>

                <div className="agenda-container DEBAT">

                    <div className="agenda-title title-1"> <h1>DEBAT</h1></div>

                    <div className="agenda-group">

                        <div className="agenda-detail">

                            <div className="event-list">
                                <div className="pause-cafe"><h2>16h30 - 17h00</h2></div>
                            </div>

                            <div className="event-list">
                                <div className="hour h1"><h2>Anatomopathologie</h2>
                                </div>

                                <a href="rediffusion.html" className="event-title">
                                    <h3>
                                        Évaluation de la réponse pathologique complète dans notre contexte
                                    </h3>
                                </a>

                                <div className="orateur ort-1">
                                    <ul>
                                        <li>Pr Doukouré Brahima (Côte d&apos;Ivoire)</li>
                                        <li>Pr Mohamed Kouyaté (Côte d&apos;Ivoire)</li>
                                        <li>Pr Basma El Khannoussi (Maroc)</li>
                                    </ul>
                                </div>



                                {/* <div className="notification-mail">
                                    <Image src="/img/notification-icon-pink.png" alt="#" width={40} height={40} />
                                    <div className="notif-title">RECEVOIR UN RAPPEL</div>
                                </div> */}

                            </div>




                        </div>

                    </div>

                </div>

                <div className="agenda-container CONFERENCES">

                    <div className="agenda-title title-1"> <h1>CONFERENCES</h1></div>

                    <div className="agenda-group">

                        <div className="agenda-detail">

                            <div className="event-list">
                                <div className="pause-cafe"><h2>17h00 - 18h00</h2></div>
                            </div>

                            <div className="event-list">
                                <div className="hour h1"><h2>Chirurgie</h2>
                                </div>




                                <a href="rediffusion.html" className="event-title">
                                    <h3>
                                        Gestion du creux axillaire
                                    </h3>
                                </a>

                                <div className="orateur ort-1">
                                    <ul>
                                        <li>Pr Driss Moussaoui (Maroc)</li>
                                    </ul>
                                </div>





                                <a href="rediffusion.html" className="event-title">
                                    <h3>
                                        Chirurgie des cancers du sein
                                    </h3>
                                </a>

                                <div className="orateur ort-1">
                                    <ul>
                                        <li>Pr Sidy Ka (Sénégal)</li>
                                    </ul>
                                </div>








                                {/* <div className="notification-mail">
                                    <Image src="/img/notification-icon-pink.png" alt="#" width={40} height={40} />
                                    <div className="notif-title">RECEVOIR UN RAPPEL</div>
                                </div> */}

                            </div>




                        </div>

                    </div>

                </div>

                <div className="agenda-container DEBAT">

                    <div className="agenda-title title-1"> <h1>DEBAT</h1></div>

                    <div className="agenda-group">

                        <div className="agenda-detail">

                            <div className="event-list">
                                <div className="pause-cafe"><h2>18h00 - 18h30</h2></div>
                            </div>

                            <div className="event-list">
                                <div className="hour h1"><h2>Chirurgie</h2>
                                </div>

                                <a href="rediffusion.html" className="event-title">
                                    <h3>
                                        Circuit de soin en sénologie
                                    </h3>
                                </a>

                                <div className="orateur ort-1">
                                    <ul>
                                        <li>Pr Simplice Anongba (Côte d&apos;Ivoire)                                      Pr Driss Moussaoui (Maroc)</li>
                                        <li>Pr Sidy Ka (Sénégal)</li>
                                        <li>Pr Appolinaire Horo (Côte d&apos;Ivoire)</li>
                                        <li>Pr Driss Moussaoui (Maroc)</li>
                                    </ul>
                                </div>

                                {/* <div className="notification-mail">
                                    <Image src="/img/notification-icon-pink.png" alt="#" width={40} height={40} />
                                    <div className="notif-title">RECEVOIR UN RAPPEL</div>
                                </div> */}

                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div className="agenda-list jour-2">
                <div className="agenda-date">
                    <div className="date-title">
                        <div className="jour">JOUR</div>
                        <div className="jour-number">2</div>
                    </div>
                    <div className="date-complete">Vendredi 27 Juin 2025</div>
                </div>
                {/* Bouton de téléchargement du programme */}
                <div className="flex justify-center mb-6">
                    <DownloadProgramButton
                        day={2}
                        size="large"
                        variant="outline"
                        className="shadow-lg hover:shadow-xl"
                    />
                </div>

                <div className="agenda-container CONFERENCES">

                    <div className="agenda-title title-1"> <h1>CONFERENCES</h1></div>

                    <div className="agenda-group">

                        <div className="agenda-detail">

                            <div className="event-list">
                                <div className="pause-cafe"><h2>08h30 - 09h30</h2></div>
                            </div>

                            {/*   Radiothérapie    */}

                            <div className="event-list">
                                <div className="hour h1"><h2>Radiothérapie</h2></div>

                                <a href="rediffusion.html" className="event-title">
                                    <h3>
                                        Irradiation ganglionnaire dans les cancers du sein
                                    </h3>
                                </a>

                                <div className="orateur ort-1">
                                    <ul>
                                        <li>Dr Mouhamadou Bachir Ba (Sénégal)</li>
                                    </ul>
                                </div>

                                <a href="rediffusion.html" className="event-title">
                                    <h3>
                                        Radiothérapie dans les cancers du sein localement avancés
                                    </h3>
                                </a>

                                <div className="orateur ort-1">
                                    <ul>
                                        <li>Dr Amaraldo Ayemou (Côte d&apos;Ivoire)</li>
                                    </ul>
                                </div>

                                {/* <div className="notification-mail">
                                    <Image src="/img/notification-icon-pink.png" alt="#" width={40} height={40} />
                                    <div className="notif-title">RECEVOIR UN RAPPEL</div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="agenda-container CONFERENCES">
                    <div className="agenda-title title-1"> <h1>CONFERENCES</h1></div>

                    <div className="agenda-group">

                        <div className="agenda-detail">

                            <div className="event-list">
                                <div className="pause-cafe"><h2>09h30 - 10h30</h2></div>
                            </div>

                            {/*   Radiothérapie   */}

                            <div className="event-list">
                                <div className="hour h1"><h2>Traitements médicaux et soins palliatifs</h2></div>

                                <a href="rediffusion.html" className="event-title">
                                    <h3>
                                        Place et indications du traitement néoadjuvant dans les stades précoces
                                    </h3>
                                </a>

                                <div className="orateur ort-1">
                                    <ul>
                                        <li>Dr Odo Bitti (Côte d&apos;Ivoire)</li>
                                    </ul>
                                </div>

                                <a href="rediffusion.html" className="event-title">
                                    <h3>
                                        Traitement adjuvant anti HER2
                                    </h3>
                                </a>

                                <div className="orateur ort-1">
                                    <ul>
                                        <li>Dr Narjiss Berrada (Maroc)</li>
                                    </ul>
                                </div>
                                {/* <div className="notification-mail">
                                    <Image src="/img/notification-icon-pink.png" alt="#" width={40} height={40} />
                                    <div className="notif-title">RECEVOIR UN RAPPEL</div>
                                </div> */}
                            </div>

                        </div>

                    </div>

                </div>


                <div className="agenda-container PAUSE-café">

                    <div className="agenda-title title-1"> <h1>PAUSE CAFE</h1></div>

                    <div className="agenda-group">

                        <div className="agenda-detail">

                            <div className="event-list">
                                <div className="pause-cafe"><h2>10h30 - 11h00</h2></div>
                            </div>

                            <div className="pause">
                                <h1>
                                    PAUSE
                                </h1>
                            </div>


                        </div>

                    </div>

                </div>

                <div className="agenda-container CONFERENCES">

                    <div className="agenda-title title-1"> <h1>CONFERENCES</h1></div>

                    <div className="agenda-group">

                        <div className="agenda-detail">

                            <div className="event-list">
                                <div className="pause-cafe"><h2>11h00 - 12h00</h2></div>
                            </div>

                            {/*   Radiothérapie   */}

                            <div className="event-list">
                                <div className="hour h1"><h2>Traitements médicaux et soins palliatifs</h2></div>

                                <a href="rediffusion.html" className="event-title">
                                    <h3>
                                        Intérêt des formes sous cutanées dans le traitement des cancers du sein HER2+
                                    </h3>
                                </a>

                                <div className="orateur ort-1">
                                    <ul>
                                        <li>Orateurs</li>
                                    </ul>
                                </div>

                                <a href="rediffusion.html" className="event-title">
                                    <h3>
                                        Actualité de la prise en charge des cancers du sein précoce hormono dépendants
                                    </h3>
                                </a>

                                <div className="orateur ort-1">
                                    <ul>
                                        <li>Pr Yvon Kouassi (Côte d&apos;Ivoire)</li>
                                    </ul>
                                </div>
                                {/* <div className="notification-mail">
                                    <Image src="/img/notification-icon-pink.png" alt="#" width={40} height={40} />
                                    <div className="notif-title">RECEVOIR UN RAPPEL</div>
                                </div> */}
                            </div>

                        </div>

                    </div>

                </div>

                <div className="agenda-container DEBAT">

                    <div className="agenda-title title-1"> <h1>DEBAT</h1></div>

                    <div className="agenda-group">

                        <div className="agenda-detail">

                            <div className="event-list">
                                <div className="pause-cafe"><h2>12h00 - 12h30</h2></div>
                            </div>

                            {/*   Radiothérapie   */}

                            <div className="event-list">
                                <div className="hour h1"><h2>Traitements médicaux et soins palliatifs</h2></div>

                                <a href="rediffusion.html" className="event-title">
                                    <h3>
                                        Solutions pour la réussite d&apos;une stratégie néo-adjuvante et de la personnalisation du traitement adjuvant en Afrique
                                    </h3>
                                </a>

                                <div className="orateur ort-1">
                                    <ul>
                                        <li>Pr Sidy Ka (Sénégal)</li>
                                        <li>Pr Mohamed Kouyaté (Côte d&apos;Ivoire)</li>
                                        <li>Pr Aboubacar Sidik Diabaté (Côte d&apos;Ivoire)</li>
                                        <li>Pr Kouassi Yvon (Côte d&apos;Ivoire)</li>
                                    </ul>
                                </div>
                                {/* <div className="notification-mail">
                                    <Image src="/img/notification-icon-pink.png" alt="#" width={40} height={40} />
                                    <div className="notif-title">RECEVOIR UN RAPPEL</div>
                                </div> */}
                            </div>

                        </div>

                    </div>

                </div>

                <div className="agenda-container PAUSE-dejeuner">

                    <div className="agenda-title title-1"> <h1>PAUSE DEJEUNER</h1></div>

                    <div className="agenda-group">

                        <div className="agenda-detail">

                            <div className="event-list">
                                <div className="pause-cafe"><h2>12h30 - 14h00</h2></div>
                            </div>

                            <div className="pause">
                                <h1>
                                    PAUSE
                                </h1>
                            </div>


                        </div>

                    </div>

                </div>

                <div className="agenda-container DEBAT">

                    <div className="agenda-title title-1"> <h1>DEBAT</h1></div>

                    <div className="agenda-group">

                        <div className="agenda-detail">

                            <div className="event-list">
                                <div className="pause-cafe"><h2>14h00 - 14h30</h2></div>
                            </div>

                            {/*   Radiothérapie   */}

                            <div className="event-list">
                                <div className="hour h1"><h2>Traitements médicaux et soins palliatifs</h2></div>



                                <a href="rediffusion.html" className="event-title">
                                    <h3>
                                        Soins palliatifs et accompagnement : Expériences du Maroc et du CNRAO en Côte d&apos;Ivoire
                                    </h3>
                                </a>

                                <div className="orateur ort-1">
                                    <ul>
                                        <li>Pr Simplice Anongba (Côte d&apos;Ivoire)</li>
                                        <li>Pr Judith Didi-Kouko (Côte d&apos;Ivoire)</li>
                                        <li>Pr Hortense Aka Dago Akribi (Côte d&apos;Ivoire)</li>
                                        <li>Dr Narjiss Berrada (Maroc)</li>
                                    </ul>
                                </div>
                                {/* <div className="notification-mail">
                                    <Image src="/img/notification-icon-pink.png" alt="#" width={40} height={40} />
                                    <div className="notif-title">RECEVOIR UN RAPPEL</div>
                                </div> */}
                            </div>

                        </div>

                    </div>

                </div>

                <div className="agenda-container CONFERENCES">

                    <div className="agenda-title title-1"> <h1>CONFERENCE</h1></div>

                    <div className="agenda-group">

                        <div className="agenda-detail">

                            <div className="event-list">
                                <div className="pause-cafe"><h2>14h30 - 15h00</h2></div>
                            </div>

                            {/*   Radiothérapie   */}

                            <div className="event-list">
                                <div className="hour h1"><h2>Communications libres</h2></div>



                                <a href="rediffusion.html" className="event-title">
                                    <h3>
                                        Prise en charge des métastases cérébrales
                                    </h3>
                                </a>

                                <div className="orateur ort-1">
                                    <ul>
                                        <li>Pr Adil El Melhaoui (Maroc)</li>
                                    </ul>
                                </div>
                                {/* <div className="notification-mail">
                                    <Image src="/img/notification-icon-pink.png" alt="#" width={40} height={40} />
                                    <div className="notif-title">RECEVOIR UN RAPPEL</div>
                                </div> */}
                            </div>

                        </div>

                    </div>

                </div>

                <div className="agenda-container DEBAT">

                    <div className="agenda-title title-1"> <h1>DEBAT</h1></div>

                    <div className="agenda-group">

                        <div className="agenda-detail">

                            <div className="event-list">
                                <div className="pause-cafe"><h2>15h00 - 15h30</h2></div>
                            </div>

                            {/*   Radiothérapie   */}

                            <div className="event-list">
                                <div className="hour h1"><h2>Communications libres</h2></div>



                                <a href="rediffusion.html" className="event-title">
                                    <h3>
                                        Expérience de la Côte d&apos;Ivoire en oncocardiologie
                                    </h3>
                                </a>

                                <div className="orateur ort-1">
                                    <ul>
                                        <li>Pr Judith Didi-Kouko (Côte d&apos;Ivoire)</li>
                                        <li>Pr Jean Baptiste Anzouan-Kacou (Côte d&apos;Ivoire)</li>
                                        <li>Pr Benedicte Boka (Côte d&apos;Ivoire)</li>
                                    </ul>
                                </div>
                                {/* <div className="notification-mail">
                                    <Image src="/img/notification-icon-pink.png" alt="#" width={40} height={40} />
                                    <div className="notif-title">RECEVOIR UN RAPPEL</div>
                                </div> */}
                            </div>

                        </div>

                    </div>

                </div>

                <div className="agenda-container DEBAT">

                    <div className="agenda-title title-1"> <h1>DEBAT</h1></div>

                    <div className="agenda-group">

                        <div className="agenda-detail">

                            <div className="event-list">
                                <div className="pause-cafe"><h2>15h30 - 16h00</h2></div>
                            </div>

                            {/*   Radiothérapie   */}

                            <div className="event-list">
                                <div className="hour h1"><h2>Communications libres</h2></div>



                                <a href="rediffusion.html" className="event-title">
                                    <h3>
                                        Cancer du sein et préservation de la fertilité
                                    </h3>
                                </a>

                                <div className="orateur ort-1">
                                    <ul>
                                        <li>Pr Horo Appolinaire (Côte d&apos;Ivoire)</li>
                                        <li>Dr Kourouma (Côte d&apos;Ivoire)</li>
                                        <li>Pr Judith Didi-Kouko (Côte d&apos;Ivoire)</li>
                                        <li>Pr Driss Moussaoui (Maroc)</li>
                                    </ul>
                                </div>

                                {/* <div className="notification-mail">
                                    <Image src="/img/notification-icon-pink.png" alt="#" width={40} height={40} />
                                    <div className="notif-title">RECEVOIR UN RAPPEL</div>
                                </div> */}
                            </div>

                        </div>

                    </div>

                </div>

                <div className="agenda-container PAUSE-café">

                    <div className="agenda-title title-1"> <h1>PAUSE CAFE</h1></div>

                    <div className="agenda-group">

                        <div className="agenda-detail">

                            <div className="event-list">
                                <div className="pause-cafe"><h2>16h00 - 16h30</h2></div>
                            </div>

                            <div className="pause">
                                <h1>
                                    PAUSE
                                </h1>
                            </div>


                        </div>

                    </div>

                </div>

                <div className="agenda-container CONFERENCES">

                    <div className="agenda-title title-1"> <h1>CONFERENCE</h1></div>

                    <div className="agenda-group">

                        <div className="agenda-detail">

                            <div className="event-list">
                                <div className="pause-cafe"><h2>16h30 - 17h00</h2></div>
                            </div>

                            {/*   Radiothérapie   */}

                            <div className="event-list">
                                <div className="hour h1"><h2>Communications libres</h2></div>



                                <a href="rediffusion.html" className="event-title">
                                    <h3>
                                        Alimentation et cancers
                                    </h3>
                                </a>

                                <div className="orateur ort-1">
                                    <ul>
                                        <li>Pr Judith Didi-Kouko (Côte d&apos;Ivoire)</li>
                                    </ul>
                                </div>

                                {/* <div className="notification-mail">
                                    <Image src="/img/notification-icon-pink.png" alt="#" width={40} height={40} />
                                    <div className="notif-title">RECEVOIR UN RAPPEL</div>
                                </div> */}
                            </div>

                        </div>

                    </div>

                </div>

                <div className="agenda-container CEREMONIE DE FIN">

                    <div className="agenda-title title-1"> <h1>CEREMONIE DE CLÔTURE ET COCKTAIL DINATOIRE</h1></div>

                    <div className="agenda-group">

                        <div className="agenda-detail">

                            <div className="event-list">
                                <div className="pause-cafe"><h2>17h00 - 19h30</h2></div>
                            </div>

                            {/*   Radiothérapie   */}

                            <div className="event-list">


                                <div className="fin">
                                    <h1>
                                        FIN
                                    </h1>
                                </div>


                            </div>

                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
};