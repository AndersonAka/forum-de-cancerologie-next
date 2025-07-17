//page safca

'use client';
import { useRef, useState } from 'react';

export default function Safca() {
  // Liste des vidéos
  const videos = [
    {
      id: '25',
      src: '/medias/video1.mp4',
      label: 'Vidéo 1',
      title:
        "Cancer du col de l’utérus localement avancé  Actualités thérapeutiques et alternatives en milieu à ressources limitées (Dr Mohammed Bachir Ba)  M-CI-00000356",
    },
    {
      id: '26',
      src: '/medias/video2.mp4',
      label: 'Vidéo 2',
      title:
        "Cancer du sein Triple Négatif  Actualités thérapeutiques et alternatives en Afrique (Dr Vincent Lokonga)  M-CI-00000355",
    },
    {
      id: '27',
      src: '/medias/video3.mp4',
      label: 'Vidéo 3',
      title:
        "Cancer du sein Triple Négatif en Afrique  Aspects épidémiologiques et diagnostiques (Dr Didier Abouna) M-CI-00000354",
    },
    {
      id: '28',
      src: '/medias/video4.mp4',
      label: 'Vidéo 4',
      title: 'Rediffussion WEBINAIRE HER2+ NARJISS_M-CI-00000385',
    },
  ];

  const [currentVideo, setCurrentVideo] = useState(videos[3]); // Par défaut la dernière vidéo
  const videoRef = useRef<HTMLVideoElement>(null);

  // Changement de vidéo + envoi de l'ID au serveur
  const handleVideoChange = async (video: typeof videos[0]) => {
    setCurrentVideo(video);
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play();
    }
    // Envoi de l'ID au serveur (optionnel, à adapter côté API si besoin)
    try {
      await fetch('/revision.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: 'video_id=' + encodeURIComponent(video.id),
      });
    } catch (e) {
      // Erreur silencieuse
    }
  };

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* Player vidéo */}
      <div style={{ width: '80%', maxWidth: 800, background: '#000', borderRadius: 10, overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.3)', marginBottom: 20 }}>
        <video ref={videoRef} controls style={{ width: '100%', display: 'block' }}>
          <source src={currentVideo.src} type="video/mp4" />
          Votre navigateur ne supporte pas la vidéo.
        </video>
      </div>
      {/* Liste des vidéos */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 30 }}>
        {videos.map((video) => (
          <button
            key={video.id}
            onClick={() => handleVideoChange(video)}
            title={video.title}
            style={{
              background: currentVideo.id === video.id ? '#003F9B' : '#222',
              color: '#fff',
              border: 'none',
              padding: '10px 15px',
              borderRadius: 5,
              cursor: 'pointer',
              transition: 'background 0.3s',
            }}
          >
            {video.label}
          </button>
        ))}
      </div>
      {/* Disclaimer */}
      <section style={{ width: '100%', maxWidth: 800, background: '#f5f8fc', borderRadius: 12, margin: '0 auto', marginBottom: 40, padding: 24, display: 'flex', alignItems: 'flex-start', gap: 16 }}>
        <div style={{ minWidth: 48 }}>
          <svg viewBox="0 0 47.5 42.84" width={48} height={48}>
            <path fill="#003F9B" d="M23.75,3.86c.86,0,1.71.42,2.2,1.27l17.34,30.03c.98,1.7-.24,3.82-2.2,3.82H6.41c-1.96,0-3.18-2.12-2.2-3.82L21.54,5.13c.49-.85,1.35-1.27,2.2-1.27M23.75,0c-1.09,0-2.16.28-3.11.8-1.01.56-1.85,1.39-2.44,2.4L.86,33.23C.28,34.25-.02,35.39,0,36.54c.02,1.08.32,2.15.86,3.09.54.94,1.32,1.74,2.25,2.29.99.59,2.13.91,3.3.91h34.68c1.17,0,2.31-.31,3.3-.91.93-.56,1.71-1.35,2.25-2.29s.84-2.01.86-3.09c.02-1.15-.28-2.3-.86-3.31L29.29,3.2c-.58-1.01-1.43-1.84-2.44-2.4-.95-.52-2.02-.8-3.11-.8h0Z" />
            <path fill="#003F9B" d="M23.92,32.99c-.75,0-1.39-.63-1.39-1.39s.63-1.39,1.39-1.39,1.39.63,1.39,1.39-.63,1.39-1.39,1.39ZM24.72,27.3h-1.61l-.44-11.2h2.48l-.44,11.2Z" />
          </svg>
        </div>
        <div style={{ flex: 1 }}>
          <p style={{ margin: 0, color: '#003F9B', fontWeight: 500 }}>
            Cette plateforme est dédiée aux échanges relatifs au programme scientifique du Forum de Cancérologie de Roche.<br /><br />
            Elle n'est pas destinée à la notification des évènements indésirables.<br /><br />
            Néanmoins, pour toute notification d'un éventuel événement indésirable, veuillez le rapporter à l'adresse :<br />
            <a href="mailto:global.irt_sahubtcs@roche.com" style={{ color: '#003F9B', textDecoration: 'underline' }}>global.irt_sahubtcs@roche.com</a>
          </p>
        </div>
      </section>
    </div>
  );
}