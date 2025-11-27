// Page rediffusion 2025 presentation

import VideoSection from "@/app/components/VideoSection";
import { getVideosByCategory, getVideoId, getAuteur } from "@/app/data/videos";

const videos = getVideosByCategory('presentation');
 
export default function Rediffusion2025PresentationPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
    <h1 className="text-2xl sm:text-3xl font-bold text-center mb-8 text-bleu-roche">Présentations - 2025</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
      {videos.map((video, idx) => (
        <div key={video.id} className="bg-white rounded-lg shadow-lg p-4 flex flex-col items-center">
          {video.src ? (
            <VideoSection 
              src={video.src} 
              question={video.question} 
              title={video.title} 
              className="!mt-0 !mb-0"
              videoId={getVideoId(video)}
              auteur={getAuteur(video)}
              enableTracking={true}
            />
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