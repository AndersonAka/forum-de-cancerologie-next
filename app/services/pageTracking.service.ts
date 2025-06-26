import axios from "axios";
import Cookies from "js-cookie";

export interface PageVisitData {
  userId: number;
  pageUrl: string;
  timeSpent?: number;
  timestamp?: string;
}

export interface PageVisitResponse {
  success: boolean;
  message?: string;
}

class PageTrackingService {
  private readonly API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
  private readonly STORAGE_KEY = "pending_page_visits";
  private readonly MAX_RETRIES = 3;
  private readonly RETRY_DELAY = 5000; // 5 secondes

  /**
   * Envoie une visite de page à l'API
   */
  async trackPageVisit(data: PageVisitData): Promise<PageVisitResponse> {
    try {
      const token = Cookies.get("access_token");

      if (!token) {
        return { success: false, message: "Token non trouvé" };
      }

      await axios.post<PageVisitResponse>(
        `${this.API_BASE_URL}/page-visits`,
        {
          ...data,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          timeout: 10000, // 10 secondes de timeout
        }
      );

      return { success: true, message: "Visite enregistrée avec succès" };
    } catch (error) {
      // Stocker les données pour retry ultérieur
      this.storePendingVisit(data);

      return {
        success: false,
        message: error instanceof Error ? error.message : "Erreur inconnue",
      };
    }
  }

  /**
   * Stocke une visite en attente pour retry ultérieur
   */
  private storePendingVisit(data: PageVisitData): void {
    try {
      const pendingVisits = this.getPendingVisits();
      pendingVisits.push({
        ...data,
        timestamp: new Date().toISOString(),
        retryCount: 0,
      });

      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(pendingVisits));
    } catch (error) {
      console.error(
        "PageTracking: Erreur lors du stockage des données en attente:",
        error
      );
    }
  }

  /**
   * Récupère les visites en attente
   */
  private getPendingVisits(): Array<PageVisitData & { retryCount: number }> {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error(
        "PageTracking: Erreur lors de la récupération des données en attente:",
        error
      );
      return [];
    }
  }

  /**
   * Retry automatique des visites en attente
   */
  async retryPendingVisits(): Promise<void> {
    const pendingVisits = this.getPendingVisits();

    if (pendingVisits.length === 0) return;

    const successfulVisits: number[] = [];
    const failedVisits: Array<PageVisitData & { retryCount: number }> = [];

    for (let i = 0; i < pendingVisits.length; i++) {
      const visit = pendingVisits[i];

      if (visit.retryCount >= this.MAX_RETRIES) {
        continue;
      }

      try {
        const result = await this.trackPageVisit({
          userId: visit.userId,
          pageUrl: visit.pageUrl,
          timeSpent: visit.timeSpent,
        });

        if (result.success) {
          successfulVisits.push(i);
        } else {
          visit.retryCount++;
          failedVisits.push(visit);
        }
      } catch {
        visit.retryCount++;
        failedVisits.push(visit);
      }
    }

    // Mettre à jour le stockage local
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(failedVisits));
  }

  /**
   * Nettoie les anciennes visites en attente (plus de 24h)
   */
  cleanupOldPendingVisits(): void {
    try {
      const pendingVisits = this.getPendingVisits();
      const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

      const filteredVisits = pendingVisits.filter((visit) => {
        const visitDate = new Date(visit.timestamp || "");
        return visitDate > oneDayAgo;
      });

      if (filteredVisits.length !== pendingVisits.length) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filteredVisits));
      }
    } catch (error) {
      console.error(
        "PageTracking: Erreur lors du nettoyage des anciennes visites:",
        error
      );
    }
  }

  /**
   * Initialise le service (nettoyage + retry)
   */
  async initialize(): Promise<void> {
    this.cleanupOldPendingVisits();
    await this.retryPendingVisits();
  }
}

export const pageTrackingService = new PageTrackingService();
