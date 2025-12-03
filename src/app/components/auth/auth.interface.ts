export interface ForgotForm {
  email: string;
}

export interface LoginForm {
  email: string;
  password: string;
}

export interface ResetPasswordForm {
  newPassword: string;
  repeatedPassword: string;
}

export interface RegistrationForm {
  email: string;
  password: string;
  type: string;
}

export interface UpdatePasswordRequest {
  currentPassword: string;
  newPassword: string;
  repeatedPassword: string;
}

export interface AuthInterface {
  accessToken: string;
  refreshToken: string;
}
