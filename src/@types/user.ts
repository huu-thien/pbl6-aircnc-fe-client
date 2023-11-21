export interface LoginType {
  identifier: string;
  password: string;
}
export interface LogoutType {
  refreshToken: string;
}
export interface LoginResponse {
  user: UserType | null;
  accessToken: string | null;
  refreshToken: string | null;
  role: string | null;
}

export interface UserType {
  id: number;
  fullName: string;
  email: string;
  userName: string;
  avatarUrl: null | string;
  isHost: boolean;
}
