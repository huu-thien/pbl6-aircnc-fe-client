export interface HostPaymentType {
  id: number;
  paymentInfo: PaymentInfoType;
  bookingId: number;
  status: 'Pending' | 'Paid' | 'Cancelled';
  amount: number;
  description: null | string;
}

export interface PaymentInfoType {
  hostId: number;
  bankName: string;
  accountNumber: string;
  accountHolder: string;
}
