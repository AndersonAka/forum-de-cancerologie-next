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

export interface AuthResponse {
  token?: string;
  user: {
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
  };
  message?: string;
}

class AuthService {
  private readonly TOKEN_KEY = "auth_token";
  private readonly USER_KEY = "auth_user";

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await apiService.post<AuthResponse>(
        "/auth/login",
        credentials
      );
      if (response.token) {
        this.setToken(response.token);
      }
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

  async getCurrentUser(): Promise<AuthResponse["user"]> {
    try {
      const response = await apiService.get<AuthResponse>("/auth/me");
      return response.user;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des informations utilisateur:",
        error
      );
      throw error;
    }
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
  }

  getToken(): string | null {
    if (typeof window !== "undefined") {
      return localStorage.getItem(this.TOKEN_KEY);
    }
    return null;
  }

  getUser(): AuthResponse["user"] | null {
    if (typeof window !== "undefined") {
      const userStr = localStorage.getItem(this.USER_KEY);
      return userStr ? JSON.parse(userStr) : null;
    }
    return null;
  }

  isAuthenticated(): boolean {
    return !!this.getToken() || !!this.getUser();
  }

  private setToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  private setUser(user: AuthResponse["user"]) {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }
}

export const authService = new AuthService();
