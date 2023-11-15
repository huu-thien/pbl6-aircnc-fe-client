export interface InfoAccountType {
  address: string | null;
  avatarUrl: string;
  city: string | null;
  id: number;
  introduction: string | null;
  createdAt: string;
  fullName: string;
  email: string | null;
  phoneNumber: string | null;
}
export interface InfoAccountPut {
  fullName: string;
  introduction: string;
  phoneNumber: string;
  email: string;
  city: string;
  address: string;
  avatarUrl: string;
}
