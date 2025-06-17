import axios from "axios";
import { AuthResponse } from "../types/auth";
import Cookies from "js-cookie";

interface RegisterData {
  titre: string;
  nom: string;
  specialite: string;
  pays: string;
  lieuExercice: string;
  email: string;
  telephone: string;
  participation: string;
  gdprConsent: boolean;
  signature?: string;
}

export const authService = {
  async login(credentials: { email: string }) {
    try {
      const response = await axios.post<AuthResponse>(
        "/api/auth/login",
        credentials
      );

      if (!response.data.access_token) {
        throw new Error("Token manquant dans la réponse");
      }

      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async register(data: RegisterData): Promise<{ message: string }> {
    try {
      const response = await axios.post<{ message: string }>(
        "/api/auth/register",
        data
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async logout() {
    try {
      const token = Cookies.get("access_token");
      await axios.post(
        "/api/auth/logout",
        {},
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : undefined,
          },
        }
      );
    } catch (error) {
      throw error;
    }
  },

  async getCurrentUser() {
    try {
      const response = await axios.get("/api/auth/me");
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async updateParticipationMode(
    mode: "en ligne" | "présentiel"
  ): Promise<void> {
    try {
      const token = Cookies.get("access_token");
      await axios.patch(
        "/api/auth/participation-mode",
        { participationMode: mode },
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : undefined,
          },
        }
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message ||
            "Erreur lors de la mise à jour du mode de participation"
        );
      }
      throw error;
    }
  },
};
