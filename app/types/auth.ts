export interface LoginCredentials {
  email: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
}

export interface User {
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
  role: string;
  gdprConsent: boolean;
  rememberMeToken: string | null;
  signature: string | null;
  has_signature: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  access_token: string;
  user: User;
}
