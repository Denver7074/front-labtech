export interface AccountRequest {
  email: string | null | undefined,
}

export interface LoginForm {
  email: string | null | undefined,
  password: string | null | undefined,
}

export interface ResetPasswordRequest {
  newPassword: string | null | undefined,
  repeatedPassword: string | null | undefined
}

export interface UserRegisterRequest {
  email: string | null | undefined;
  password: string | null | undefined;
  type: string | null | undefined;
}

export interface UpdatePasswordRequest {
  currentPassword: string | null | undefined;
  newPassword: string | null | undefined;
  repeatedPassword: string | null | undefined;
}

export interface AuthInterface {
  accessToken: string,
  refreshToken: string,
}
