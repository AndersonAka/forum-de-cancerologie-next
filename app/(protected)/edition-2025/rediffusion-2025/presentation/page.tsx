// Page rediffusion 2025 presentation

import VideoSection from "@/app/components/VideoSection";

const videos = [
    {
      id:1,
      question:"Traitement adjuvant des cancers du sein HER2+",
      title: "Dr Narjiss Berrada",
      src: "https://medias-forum-cancerologie.s3.eu-west-3.amazonaws.com/redifussion-2025/podcasts/NARJISS_M-CI-00000465.mp4"
    },
    {
      id:2,
      question:"Intérêt des formes sous cutanées dans la traitement des cancers du sein HER2+",
      title: "Dr Doudou Diouf",
      src: "https://medias-forum-cancerologie.s3.eu-west-3.amazonaws.com/redifussion-2025/podcasts/DR+DOUDOU+DIOUF_M-CI-00000466.mp4"
    },
    {
      id:3,
      question:"Quelles chirurgies du sein pour les patients mutées ?",
      title: "Pr Driss Moussaoui (Maroc)",
      src: "https://medias-forum-cancerologie.s3.eu-west-3.amazonaws.com/redifussion-2025/podcasts/JEAN-PASCAL+_M-CI-00000469.mp4"
    },
    {
      id:4,
      question:"Place de l'imagerie métabolique dans la prise en charge du cancer du sein",
      title: "Pr Yassir Oufrokhi",
      src: "https://medias-forum-cancerologie.s3.eu-west-3.amazonaws.com/redifussion-2025/podcasts/YACIR_M-CI-00000458.mp4"
    },
    {
      id:5,
      question:"Radiothérapie dans les cancers du sein localisés",
      title: "Dr Amaraldo Ayemou",
      src: "https://medias-forum-cancerologie.s3.eu-west-3.amazonaws.com/redifussion-2025/podcasts/AMARALDO_M-CI-00000473.mp4"
    },
    {
      id:6,
      question:"Conduite à tenir devant les microcalcifications",
      title: "Pr Nazik Allali",
      src: "https://medias-forum-cancerologie.s3.eu-west-3.amazonaws.com/redifussion-2025/podcasts/NAZIK+ALLALI_M-CI-00000460.mp4"
    },
    {
      id:7,
      question:"Place de la phase préanalytique en 2025",
      title: "Pr Basma El Khannoussi",
      src: "https://medias-forum-cancerologie.s3.eu-west-3.amazonaws.com/redifussion-2025/podcasts/BASMA+EL+KHANOUSSI_M-CI-00000462.mp4"
    },
    {
      id:8,
      question:"Chirurgie des cancers du sein",
      title: "Pr Sidy Ka",
      src: "https://medias-forum-cancerologie.s3.eu-west-3.amazonaws.com/redifussion-2025/podcasts/SIDY+KA_M-CI-00000459.mp4"
    },
    {
      id:9,
      question:"Irradiation ganglionnaire dans les cancers du sein",
      title: "Dr Mouhamadou Bachir Ba",
      src: "https://medias-forum-cancerologie.s3.eu-west-3.amazonaws.com/redifussion-2025/podcasts/BACHIR+BA_M-CI-00000467.mp4"
    },   
    {
      id:10,
      question:"Place et indications du traitement néoadjuvant dans les stades précoces",
      title: "Dr Odo Bitti",
      src: "https://medias-forum-cancerologie.s3.eu-west-3.amazonaws.com/redifussion-2025/podcasts/ODDO+BITTI_M-CI-00000464.mp4"
    },    
    {
      id:11,
      question:"Actualité de la prise en charge des cancers du sein précoce hormono dépendants",
      title: "Pr Yvon Kouassi",
      src: "  https://medias-forum-cancerologie.s3.eu-west-3.amazonaws.com/redifussion-2025/podcasts/YVON+KOUASSi_M-CI-00000463.mp4"
    }, 
  ];

export default function Rediffusion2025PresentationPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
    <h1 className="text-2xl sm:text-3xl font-bold text-center mb-8 text-bleu-roche">Présentations - 2025</h1>
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