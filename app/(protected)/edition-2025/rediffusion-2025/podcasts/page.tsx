import VideoSection from "@/app/components/VideoSection";

// Page rediffusion 2025 podcasts
const videos = [
  {
    id:1,
    question:"Quelle est l'histoire de la cancérologie en tant que spécialité médicale en Afrique subsaharienne francophone ?",
    title: "Pr Ernest Belembaogo (Gabon) ",
    src: "https://medias-forum-cancerologie.s3.eu-west-3.amazonaws.com/redifussion-2025/podcasts/1-pr-ernest-belembaogo-a-ci.mp4"
  },
  {
    id:2,
    question:"Le traitement néoadjuvant du cancer du sein : pour quels profils de patientes ?",
    title: "Dr Odo Bitti (Côte d'Ivoire)",
    src: "https://medias-forum-cancerologie.s3.eu-west-3.amazonaws.com/redifussion-2025/podcasts/2-pr-oddo-bitty-a-ci.mp4"
  },
  {
    id:3,
    question:"Quelles chirurgies du sein pour les patients mutées ?",
    title: "Pr Driss Moussaoui (Maroc)",
    src: "https://medias-forum-cancerologie.s3.eu-west-3.amazonaws.com/redifussion-2025/podcasts/3-pr-idriss-a-ci.mp4"
  },
  {
    id:4,
    question:"Quel est l'intérêt du ciblage HER2 dans les cancers du sein ?",
    title: "Dr Doudou Diouf (Sénégal)",
    src: "https://medias-forum-cancerologie.s3.eu-west-3.amazonaws.com/redifussion-2025/podcasts/4-dr-doudou-diouf-a-ci.mp4"
  },
  {
    id:5,
    question:"Comment personnaliser le traitement adjuvant des cancers du sein HER2+ ?",
    title: "Dr Narjiss Berrada (Maroc)",
    src: "https://medias-forum-cancerologie.s3.eu-west-3.amazonaws.com/redifussion-2025/podcasts/5-dr-narjiss-a-ci.mp4"
  },
  {
    id:6,
    question:"Quelle est la place de la génomique dans la prise en charge des cancers du sein ?",
    title: "Dr Jean Pascal Demba (Sénégal)",
    // src: "https://medias-forum-cancerologie.s3.eu-west-3.amazonaws.com/redifussion-2025/podcasts/6-eugene-moke-directeur-general-roche-fr-a-ci.mp4"
    src: "https://medias-forum-cancerologie.s3.eu-west-3.amazonaws.com/redifussion-2025/podcasts/Dr%2BJEAN%2BPASCAL_A-CI-00000009.mp4"
  },
  {
    id:7,
    question:"Comment l'absence d'équipements de radiothérapie limite-t-elle la prise charge des cancers du sein en Afrique ?",
    title: "Dr Mouhamadou Bachir Ba (Sénégal)",
    src: "https://medias-forum-cancerologie.s3.eu-west-3.amazonaws.com/redifussion-2025/podcasts/7-pr-mamdou-bachir-a-ci.mp4"
  },
  {
    id:8,
    question:"Quel est l'état des lieux de la prise en charge des cancers du sein en Côte d'Ivoire ?",
    title: "Pr Innocent Adoubi (Côte d'Ivoire)",
    src: "https://medias-forum-cancerologie.s3.eu-west-3.amazonaws.com/redifussion-2025/podcasts/8-pr-innocent-adobi-ci.mp4"
  }
];

export default function Rediffusion2025PodcastsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-8 text-bleu-roche">Podcasts - 2025</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {videos.map((video, idx) => (
          <div key={idx} className="bg-white rounded-lg shadow-lg p-4 flex flex-col items-center">
            {video.src ? (
              <VideoSection src={video.src} question={video.question} title={video.title} className="!mt-0 !mb-0" />
            ) : (
              <div className="w-full h-48 flex items-center justify-center bg-gray-100 rounded-md text-gray-400 text-xl border border-dashed border-gray-300">
                Bientôt disponible
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}