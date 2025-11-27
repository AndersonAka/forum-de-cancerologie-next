/**
 * Fichier centralisé pour toutes les vidéos de l'édition 2025
 * Catégorisation : podcasts et presentation
 */

export type VideoCategory = 'podcasts' | 'presentation';

export interface Video {
  id: number;
  category: VideoCategory;
  question: string;
  title: string;
  src: string;
}

/**
 * Génère un identifiant unique pour une vidéo
 * Format: "category-id" (ex: "podcasts-1", "presentation-5")
 */
export function getVideoId(video: Video): string {
  return `${video.category}-${video.id}`;
}

/**
 * Génère le champ "auteur" pour l'API
 * Format: "category - title" (ex: "podcasts - Pr Ernest Belembaogo (Gabon)")
 */
export function getAuteur(video: Video): string {
  return `${video.category} - ${video.title}`;
}

// Vidéos de la catégorie "podcasts"
const podcastsVideos: Video[] = [
  {
    id: 1,
    category: 'podcasts',
    question: "Quelle est l'histoire de la cancérologie en tant que spécialité médicale en Afrique subsaharienne francophone ?",
    title: "Pr Ernest Belembaogo (Gabon) ",
    src: "https://medias-forum-cancerologie.s3.eu-west-3.amazonaws.com/redifussion-2025/podcasts/1-pr-ernest-belembaogo-a-ci.mp4"
  },
  {
    id: 2,
    category: 'podcasts',
    question: "Le traitement néoadjuvant du cancer du sein : pour quels profils de patientes ?",
    title: "Dr Odo Bitti (Côte d'Ivoire)",
    src: "https://medias-forum-cancerologie.s3.eu-west-3.amazonaws.com/redifussion-2025/podcasts/2-pr-oddo-bitty-a-ci.mp4"
  },
  {
    id: 3,
    category: 'podcasts',
    question: "Quelles chirurgies du sein pour les patients mutées ?",
    title: "Pr Driss Moussaoui (Maroc)",
    src: "https://medias-forum-cancerologie.s3.eu-west-3.amazonaws.com/redifussion-2025/podcasts/3-pr-idriss-a-ci.mp4"
  },
  {
    id: 4,
    category: 'podcasts',
    question: "Quel est l'intérêt du ciblage HER2 dans les cancers du sein ?",
    title: "Dr Doudou Diouf (Sénégal)",
    src: "https://medias-forum-cancerologie.s3.eu-west-3.amazonaws.com/redifussion-2025/podcasts/4-dr-doudou-diouf-a-ci.mp4"
  },
  {
    id: 5,
    category: 'podcasts',
    question: "Comment personnaliser le traitement adjuvant des cancers du sein HER2+ ?",
    title: "Dr Narjiss Berrada (Maroc)",
    src: "https://medias-forum-cancerologie.s3.eu-west-3.amazonaws.com/redifussion-2025/podcasts/5-dr-narjiss-a-ci.mp4"
  },
  {
    id: 6,
    category: 'podcasts',
    question: "Quelle est la place de la génomique dans la prise en charge des cancers du sein ?",
    title: "Dr Jean Pascal Demba (Sénégal)",
    src: "https://medias-forum-cancerologie.s3.eu-west-3.amazonaws.com/redifussion-2025/podcasts/Dr%2BJEAN%2BPASCAL_A-CI-00000009.mp4"
  },
  {
    id: 7,
    category: 'podcasts',
    question: "Comment l'absence d'équipements de radiothérapie limite-t-elle la prise charge des cancers du sein en Afrique ?",
    title: "Dr Mouhamadou Bachir Ba (Sénégal)",
    src: "https://medias-forum-cancerologie.s3.eu-west-3.amazonaws.com/redifussion-2025/podcasts/7-pr-mamdou-bachir-a-ci.mp4"
  },
  {
    id: 8,
    category: 'podcasts',
    question: "Quel est l'état des lieux de la prise en charge des cancers du sein en Côte d'Ivoire ?",
    title: "Pr Innocent Adoubi (Côte d'Ivoire)",
    src: "https://medias-forum-cancerologie.s3.eu-west-3.amazonaws.com/redifussion-2025/podcasts/8-pr-innocent-adobi-ci.mp4"
  }
];

// Vidéos de la catégorie "presentation"
const presentationVideos: Video[] = [
  {
    id: 1,
    category: 'presentation',
    question: "Traitement adjuvant des cancers du sein HER2+",
    title: "Dr Narjiss Berrada",
    src: "https://medias-forum-cancerologie.s3.eu-west-3.amazonaws.com/redifussion-2025/podcasts/NARJISS_M-CI-00000465.mp4"
  },
  {
    id: 2,
    category: 'presentation',
    question: "Intérêt des formes sous cutanées dans le traitement des cancers du sein HER2+",
    title: "Dr Doudou Diouf",
    src: "https://medias-forum-cancerologie.s3.eu-west-3.amazonaws.com/redifussion-2025/podcasts/DR+DOUDOU+DIOUF_M-CI-00000466.mp4"
  },
  {
    id: 3,
    category: 'presentation',
    question: "Place de la génomique dans la prise en charge des cancers du sein",
    title: "Dr Jean Pascal Demba Diop",
    src: "https://medias-forum-cancerologie.s3.eu-west-3.amazonaws.com/redifussion-2025/podcasts/JEAN-PASCAL+_M-CI-00000469.mp4"
  },
  {
    id: 4,
    category: 'presentation',
    question: "Alimentation et cancers",
    title: "Pr Judith Didi-Kouko",
    src: "https://medias-forum-cancerologie.s3.eu-west-3.amazonaws.com/redifussion-2025/podcasts/DIDI+KOUKO_M-CI-00000468.mp4"
  },
  {
    id: 5,
    category: 'presentation',
    question: "Place de l'imagerie métabolique dans la prise en charge du cancer du sein",
    title: "Pr Yassir Oufrokhi",
    src: "https://medias-forum-cancerologie.s3.eu-west-3.amazonaws.com/redifussion-2025/podcasts/YACIR_M-CI-00000458.mp4"
  },
  {
    id: 6,
    category: 'presentation',
    question: "Radiothérapie dans les cancers du sein localisés",
    title: "Dr Amaraldo Ayemou",
    src: "https://medias-forum-cancerologie.s3.eu-west-3.amazonaws.com/redifussion-2025/podcasts/AMARALDO_M-CI-00000473.mp4"
  },
  {
    id: 7,
    category: 'presentation',
    question: "Conduite à tenir devant les microcalcifications",
    title: "Pr Nazik Allali",
    src: "https://medias-forum-cancerologie.s3.eu-west-3.amazonaws.com/redifussion-2025/podcasts/NAZIK+ALLALI_M-CI-00000460.mp4"
  },
  {
    id: 8,
    category: 'presentation',
    question: "Place de la phase préanalytique en 2025",
    title: "Pr Basma El Khannoussi",
    src: "https://medias-forum-cancerologie.s3.eu-west-3.amazonaws.com/redifussion-2025/podcasts/BASMA+EL+KHANOUSSI_M-CI-00000462.mp4"
  },
  {
    id: 9,
    category: 'presentation',
    question: "Gestion du creux axillaire",
    title: "Pr Driss Moussaoui",
    src: "https://medias-forum-cancerologie.s3.eu-west-3.amazonaws.com/redifussion-2025/podcasts/IDRISS-_M-CI-00000472.mp4"
  },
  {
    id: 10,
    category: 'presentation',
    question: "Chirurgie des cancers du sein",
    title: "Pr Sidy Ka",
    src: "https://medias-forum-cancerologie.s3.eu-west-3.amazonaws.com/redifussion-2025/podcasts/SIDY+KA_M-CI-00000459.mp4"
  },
  {
    id: 11,
    category: 'presentation',
    question: "Irradiation ganglionnaire dans les cancers du sein",
    title: "Dr Mouhamadou Bachir Ba",
    src: "https://medias-forum-cancerologie.s3.eu-west-3.amazonaws.com/redifussion-2025/podcasts/BACHIR+BA_M-CI-00000467.mp4"
  },
  {
    id: 12,
    category: 'presentation',
    question: "Place et indications du traitement néoadjuvant dans les stades précoces",
    title: "Dr Odo Bitti",
    src: "https://medias-forum-cancerologie.s3.eu-west-3.amazonaws.com/redifussion-2025/podcasts/ODDO+BITTI_M-CI-00000464.mp4"
  },
  {
    id: 13,
    category: 'presentation',
    question: "Actualité de la prise en charge des cancers du sein précoce hormono dépendants",
    title: "Pr Yvon Kouassi",
    src: "https://medias-forum-cancerologie.s3.eu-west-3.amazonaws.com/redifussion-2025/podcasts/YVON+KOUASSi_M-CI-00000463.mp4"
  }
];

/**
 * Toutes les vidéos regroupées par catégorie
 */
export const videosByCategory = {
  podcasts: podcastsVideos,
  presentation: presentationVideos,
};

/**
 * Toutes les vidéos (toutes catégories confondues)
 */
export const allVideos: Video[] = [
  ...podcastsVideos,
  ...presentationVideos,
];

/**
 * Récupère les vidéos d'une catégorie spécifique
 */
export function getVideosByCategory(category: VideoCategory): Video[] {
  return videosByCategory[category];
}

