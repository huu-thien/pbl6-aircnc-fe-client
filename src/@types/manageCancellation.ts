export interface Cancellationtype {
  id: number;
  bookingId: number;
  issuerId: number;
  theOtherPartyId: number;
  isIssuerGuest: boolean;
  cancellationReason: 'PersonalIssue' | 'NaturalDisaster' | 'PropertyIssue' | 'Pandemic' | 'Sickness' | 'Other';
  cancellationReasonNote: string;
  type:
    | 'Pending'
    | 'Confirmed'
    | 'Rejected'
    | 'CheckedIn'
    | 'Completed'
    | 'CancelledBeforeCheckIn'
    | 'CancelledAfterCheckIn';
  status: 'Pending' | 'Resolved' | 'Rejected';
  resolveNote: null | string;
  refundAmount: number;
  chargeAmount: number;
  attachments: string[];
}

export interface CancellationInfoType {
  resolveNote: string;
  refundAmount: number;
  chargeAmount: number;
}
