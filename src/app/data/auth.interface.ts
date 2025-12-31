export interface AccountRequest {
  email: string | null | undefined;
  password: string | null | undefined;
}

export interface UserLoginRequest {
  email: string | null | undefined;
  password: string | null | undefined;
}

export interface ResetPasswordRequest {
  newPassword: string | null | undefined;
  repeatedPassword: string | null | undefined;
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

export interface Session {
  id: string;
  ipAddress: string;
  os: string;
  browser: string;
  deviceType: string;
  refreshToken: string;
}
