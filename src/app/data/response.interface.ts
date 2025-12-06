export interface ErrorResponse {
  code: string | undefined;
  message: string | undefined;
}

export interface AuthInterface {
  accessToken: string;
  refreshToken: string;
}

export interface JwtPayload {
  sub: string;
  userId: string;
  token: string;
  type: string[] | string;
  iat: number;
  exp: number;
  [key: string]: any;
}

export interface ApiResponse<T> {
  error: ErrorResponse;
  value: T
}


