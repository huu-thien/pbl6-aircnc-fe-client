interface Reservation {
  id: number;
  checkInDate: string;
  checkOutDate: string;
  status: string;
}

export const mergeBusyDates = (reservations: Reservation[]): Date[] => {
  const busyDates: Date[] = [];
  const confirmBookingList = reservations.filter(
    (booking: Reservation) => booking.status === 'Confirmed' || booking.status === 'Pending',
  );

  confirmBookingList.forEach((reservation) => {
    const startDate = new Date(reservation.checkInDate);
    const endDate = new Date(reservation.checkOutDate);

    // Lặp qua từ startDate đến endDate và thêm vào mảng busyDates
    while (startDate <= endDate) {
      busyDates.push(new Date(startDate)); // Tạo một đối tượng Date mới để tránh tham chiếu
      startDate.setDate(startDate.getDate() + 1);
    }
  });
  return busyDates;
};
