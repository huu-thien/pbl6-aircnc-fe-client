export interface DataSendConfirmType {
  propertyId: number;
  guestId: number;
  checkInDate: Date;
  checkOutDate: Date;
  numberOfAdults: number;
  numberOfChildren: number;
  pricePerNight: number;
  diffInDays: number;
  note?: string;
  cleaningFee: number;
}
export type RequestBookingType = Omit<DataSendConfirmType, 'pricePerNight' | 'diffInDays' | 'cleaningFee'>;

export interface VNPayHookUrlType {
  vnp_Amount: string | null;
  vnp_BankCode: string | null;
  vnp_BankTranNo: string | null;
  vnp_CardType: string | null;
  vnp_OrderInfo: string | null;
  vnp_PayDate: string | null;
  vnp_ResponseCode: string | null;
  vnp_TmnCode: string | null;
  vnp_TransactionNo: string | null;
  vnp_TransactionStatus: string | null;
  vnp_TxnRef: string | null;
  vnp_SecureHash: string | null;
}
export interface GuestCancelType {
  bookingId: number;
  cancellationReason: string;
  reason: string;
  isGuest: boolean;
  attachments: string[];
}
