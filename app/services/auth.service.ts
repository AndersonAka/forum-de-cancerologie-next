import axios from "axios";
import { AuthResponse, LoginCredentials } from "../types/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

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
}

export const authService = {
  async login(credentials: { email: string }) {
    try {
      console.log("Tentative de connexion avec:", credentials);
      const response = await axios.post<AuthResponse>(
        "/api/auth/login",
        credentials
      );
      console.log("Réponse de connexion:", response.data);
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      throw error;
    }
  },

  async register(data: RegisterData): Promise<{ message: string }> {
    try {
      console.log("Tentative d'inscription avec:", data);
      const response = await axios.post<{ message: string }>(
        "/api/auth/register",
        data
      );
      console.log("Réponse d'inscription:", response.data);
      return response.data;
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error);
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message || "Erreur lors de l'inscription"
        );
      }
      throw error;
    }
  },

  async logout() {
    try {
      await axios.post("/api/auth/logout");
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
      throw error;
    }
  },

  async getCurrentUser() {
    try {
      const response = await axios.get("/api/auth/me");
      return response.data;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des données utilisateur:",
        error
      );
      throw error;
    }
  },
};
