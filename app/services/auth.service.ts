import { apiService } from "./api.service";

export interface LoginCredentials {
  email: string;
  [key: string]: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  title: string;
  participationMode: string;
  [key: string]: string;
}

export interface User {
  id: string;
  email: string;
  nom: string;
  specialite: string;
  pays: string;
  lieuExercice: string;
  participation: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  message?: string;
}

class AuthService {
  private token: string | null = null;
  private readonly USER_KEY = "user";

  constructor() {
    if (typeof window !== "undefined") {
      this.token = localStorage.getItem("token");
    }
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await apiService.post<AuthResponse>(
        "/auth/login",
        credentials
      );
      this.setToken(response.token);
      return response;
    } catch (error) {
      console.error("Erreur de connexion:", error);
      throw error;
    }
  }

  async checkAuth(): Promise<AuthResponse> {
    try {
      const response = await apiService.get<AuthResponse>("/auth/check");
      this.setToken(response.token);
      return response;
    } catch (error) {
      console.error("Erreur de vérification d'authentification:", error);
      throw error;
    }
  }

  async register(
    userData: Omit<User, "id" | "createdAt" | "updatedAt">
  ): Promise<AuthResponse> {
    try {
      const response = await apiService.post<AuthResponse>(
        "/auth/register",
        userData
      );
      return {
        ...response,
        message:
          "Inscription réussie ! Vous allez être redirigé vers la page de connexion.",
      };
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error);
      throw error;
    }
  }

  async getCurrentUser(): Promise<User> {
    try {
      const userStr = localStorage.getItem(this.USER_KEY);
      if (!userStr) {
        throw new Error("Utilisateur non trouvé");
      }
      return JSON.parse(userStr);
    } catch (error) {
      console.error("Erreur lors de la récupération de l'utilisateur:", error);
      throw error;
    }
  }

  logout(): void {
    this.token = null;
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
  }

  getToken(): string | null {
    return this.token;
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  private setToken(token: string): void {
    this.token = token;
    if (typeof window !== "undefined") {
      localStorage.setItem("token", token);
    }
  }

  private setUser(user: User) {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }
}

export const authService = new AuthService();
