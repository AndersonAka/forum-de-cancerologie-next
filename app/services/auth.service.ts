import axios from "axios";
import { AuthResponse, LoginCredentials } from "../types/auth";

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

class AuthService {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      console.log("Tentative de connexion avec:", credentials);
      const response = await axios.post<AuthResponse>("/api/auth/login", {
        email: credentials.email,
      });
      console.log("Réponse de connexion:", response.data);

      if (!response.data.user || !response.data.access_token) {
        throw new Error("Réponse invalide du serveur");
      }

      return response.data;
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message || "Erreur lors de la connexion"
        );
      }
      throw error;
    }
  }

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
  }

  async logout(): Promise<void> {
    try {
      await axios.post("/api/auth/logout");
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  }
}

export const authService = new AuthService();
