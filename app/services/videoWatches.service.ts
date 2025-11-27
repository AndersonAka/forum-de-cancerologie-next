import axios from "axios";
import Cookies from "js-cookie";

export interface VideoWatch {
  id: number;
  userId: number;
  videoId: string;
  startTime: string;
  endTime: string | null;
  duration: number | null;
  progress: number | null;
  completed: boolean;
  auteur: string;
  dateVisualisation: string;
}

export interface TrackVideoWatchRequest {
  videoId: string;
  duration: number;
  progress: number;
  completed: boolean;
  auteur: string;
  dateVisualisation: string; // ISO 8601 format
}

export interface VideoWatchResponse {
  success: boolean;
  message?: string;
  data?: VideoWatch;
}

class VideoWatchesService {
  private readonly API_BASE_URL = "/api"; // Utiliser la route Next.js pour éviter les erreurs CORS
  private readonly STORAGE_KEY = "pending_video_watches";
  private readonly MAX_RETRIES = 3;
  private readonly RETRY_DELAY = 5000; // 5 secondes

  /**
   * Enregistre une visualisation de vidéo
   * Utilise la route Next.js /api/user-journey/video-watch qui fait le proxy vers le backend
   */
  async trackVideoWatch(
    data: TrackVideoWatchRequest
  ): Promise<VideoWatchResponse> {
    try {
      const token = Cookies.get("access_token");

      if (!token) {
        return { success: false, message: "Token non trouvé" };
      }

      // Appel à la route Next.js qui fait le proxy vers le backend
      const response = await axios.post<VideoWatch>(
        `${this.API_BASE_URL}/user-journey/video-watch`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          timeout: 10000, // 10 secondes de timeout
        }
      );

      return {
        success: true,
        message: "Visualisation enregistrée avec succès",
        data: response.data,
      };
    } catch (error: any) {
      // Stocker les données pour retry ultérieur
      this.storePendingWatch(data);

      const errorMessage =
        error.response?.data?.error ||
        error.response?.data?.message ||
        error.message ||
        "Erreur lors de l'enregistrement de la visualisation";

      return {
        success: false,
        message: errorMessage,
      };
    }
  }

  /**
   * Stocke une visualisation en attente pour retry ultérieur
   */
  private storePendingWatch(data: TrackVideoWatchRequest): void {
    try {
      const pendingWatches = this.getPendingWatches();
      pendingWatches.push({
        ...data,
        timestamp: new Date().toISOString(),
        retryCount: 0,
      });

      localStorage.setItem(
        this.STORAGE_KEY,
        JSON.stringify(pendingWatches)
      );
    } catch (error) {
      console.error(
        "VideoWatches: Erreur lors du stockage des données en attente:",
        error
      );
    }
  }

  /**
   * Récupère les visualisations en attente
   */
  private getPendingWatches(): Array<
    TrackVideoWatchRequest & { timestamp: string; retryCount: number }
  > {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error(
        "VideoWatches: Erreur lors de la récupération des données en attente:",
        error
      );
      return [];
    }
  }

  /**
   * Retry automatique des visualisations en attente
   */
  async retryPendingWatches(): Promise<void> {
    const pendingWatches = this.getPendingWatches();

    if (pendingWatches.length === 0) return;

    const successfulWatches: number[] = [];
    const failedWatches: Array<
      TrackVideoWatchRequest & { timestamp: string; retryCount: number }
    > = [];

    for (let i = 0; i < pendingWatches.length; i++) {
      const watch = pendingWatches[i];

      if (watch.retryCount >= this.MAX_RETRIES) {
        continue;
      }

      try {
        const result = await this.trackVideoWatch({
          videoId: watch.videoId,
          duration: watch.duration,
          progress: watch.progress,
          completed: watch.completed,
          auteur: watch.auteur,
          dateVisualisation: watch.dateVisualisation,
        });

        if (result.success) {
          successfulWatches.push(i);
        } else {
          watch.retryCount++;
          failedWatches.push(watch);
        }
      } catch {
        watch.retryCount++;
        failedWatches.push(watch);
      }
    }

    // Mettre à jour le stockage local
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(failedWatches));
  }

  /**
   * Nettoie les anciennes visualisations en attente (plus de 24h)
   */
  cleanupOldPendingWatches(): void {
    try {
      const pendingWatches = this.getPendingWatches();
      const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

      const filteredWatches = pendingWatches.filter((watch) => {
        const watchDate = new Date(watch.timestamp || "");
        return watchDate > oneDayAgo;
      });

      if (filteredWatches.length !== pendingWatches.length) {
        localStorage.setItem(
          this.STORAGE_KEY,
          JSON.stringify(filteredWatches)
        );
      }
    } catch (error) {
      console.error(
        "VideoWatches: Erreur lors du nettoyage des anciennes visualisations:",
        error
      );
    }
  }

  /**
   * Initialise le service (nettoyage + retry)
   */
  async initialize(): Promise<void> {
    this.cleanupOldPendingWatches();
    await this.retryPendingWatches();
  }
}

export const videoWatchesService = new VideoWatchesService();

