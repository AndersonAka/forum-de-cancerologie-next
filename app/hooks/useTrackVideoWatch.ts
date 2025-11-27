import { useState, useCallback } from "react";
import {
  videoWatchesService,
  TrackVideoWatchRequest,
  VideoWatchResponse,
} from "@/app/services/videoWatches.service";

export const useTrackVideoWatch = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const trackVideoWatch = useCallback(
    async (data: TrackVideoWatchRequest): Promise<VideoWatchResponse> => {
      try {
        setLoading(true);
        setError(null);

        const result = await videoWatchesService.trackVideoWatch(data);

        if (!result.success) {
          setError(result.message || "Erreur lors de l'enregistrement");
        }

        return result;
      } catch (err: any) {
        const errorMessage =
          err.response?.data?.message ||
          err.message ||
          "Erreur lors de l'enregistrement de la visualisation";
        setError(errorMessage);
        console.error("Erreur useTrackVideoWatch:", err);
        return {
          success: false,
          message: errorMessage,
        };
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { trackVideoWatch, loading, error };
};

