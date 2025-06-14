import { apiService } from "./api.service";

export interface LoginCredentials {
  email: string;
  password: string;
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

interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  title: string;
  specialty: string;
  country: string;
  workplace: string;
  phoneNumber: string;
  participationMode: string;
  gdprConsent: boolean;
  rememberMeToken: string | null;
  createdAt: string;
  updatedAt: string;
}

interface AuthResponse {
  auth_token: string;
  user: User;
}

class AuthService {
  private readonly TOKEN_KEY = "auth_token";
  private readonly USER_KEY = "user";

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await apiService.post<AuthResponse>(
        "/auth/login",
        credentials
      );
      this.setToken(response.auth_token);
      this.setUser(response.user);
      return response;
    } catch (error) {
      console.error("Erreur de connexion:", error);
      throw error;
    }
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      const response = await apiService.post<AuthResponse["user"]>(
        "/register",
        data
      );
      console.log("Réponse du backend lors de l'inscription:", response);

      // Retourner la réponse avec un message de succès sans stocker l'utilisateur
      return {
        user: response,
        message:
          "Inscription réussie ! Vous allez être redirigé vers la page de connexion.",
      };
    } catch (error) {
      console.error("Erreur d'inscription:", error);
      throw error;
    }
  }

  async getCurrentUser(): Promise<User> {
    try {
      // Récupérer l'utilisateur depuis le localStorage
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

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    document.cookie =
      "auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  private setToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
    const expires = new Date();
    expires.setTime(expires.getTime() + 7 * 24 * 60 * 60 * 1000); // 7 jours
    document.cookie = `auth_token=${token}; expires=${expires.toUTCString()}; path=/; SameSite=Strict`;
  }

  private setUser(user: User) {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }
}

export const authService = new AuthService();
