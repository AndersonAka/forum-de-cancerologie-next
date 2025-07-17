import VideoSection from "@/app/components/VideoSection";

// Page rediffusion 2025 podcasts

const videos = [
  {
    title: "Pr Ernest BELEMBAOGO",
    src: "https://medias-forum-cancerologie.s3.eu-west-3.amazonaws.com/redifussion-2025/podcasts/1-pr-ernest-belembaogo-a-ci.mp4"
  },
  {
    title: "Dr Bitti ODO",
    src: "https://medias-forum-cancerologie.s3.eu-west-3.amazonaws.com/redifussion-2025/podcasts/2-pr-oddo-bitty-a-ci.mp4"
  },
  {
    title: "Pr Driss MOUSSAOUI",
    src: "https://medias-forum-cancerologie.s3.eu-west-3.amazonaws.com/redifussion-2025/podcasts/3-pr-idriss-a-ci.mp4"
  },
  {
    title: "Dr Doudou DIOUF",
    src: "https://medias-forum-cancerologie.s3.eu-west-3.amazonaws.com/redifussion-2025/podcasts/4-dr-doudou-diouf-a-ci.mp4"
  },
  {
    title: "Dr Narjiss BERRADA",
    src: "https://medias-forum-cancerologie.s3.eu-west-3.amazonaws.com/redifussion-2025/podcasts/5-dr-narjiss-a-ci.mp4"
  },
  {
    title: "Mr Eugene MWOKE",
    src: "https://medias-forum-cancerologie.s3.eu-west-3.amazonaws.com/redifussion-2025/podcasts/6-eugene-moke-directeur-general-roche-fr-a-ci.mp4"
  },
  {
    title: "Dr Jean Pascal Demba DIOP",
    src: "https://medias-forum-cancerologie.s3.eu-west-3.amazonaws.com/redifussion-2025/podcasts/7-dr-jean-pascal-a-ci.mp4"
  },
  {
    title: "Dr Mouhamadou BACHIR BA",
    src: "https://medias-forum-cancerologie.s3.eu-west-3.amazonaws.com/redifussion-2025/podcasts/8-dr-bachir-b-a-ci.mp4"
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
              <VideoSection src={video.src} title={video.title} className="!mt-0 !mb-0" />
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