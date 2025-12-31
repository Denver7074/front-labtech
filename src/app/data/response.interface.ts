export interface ErrorResponse {
  code: string | undefined;
  message: string | undefined;
}

export interface PagingResults {
  pageNumber: number;
  pageSize: number;
  pageTotal: number;
  totalItemsCount: number;
}

export interface AuthInterface {
  accessToken: string | null;
  refreshToken: string | null;
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
  pagingResults: PagingResults;
}

export interface FormDataInterface<T> {
  mode: 'create' | 'edit' | 'view';
  value?: T;
  guide: Map<string, Map<string, string>>;
}

export interface ResponseType {
  id: string
  value: string;
  icon: string;
}
