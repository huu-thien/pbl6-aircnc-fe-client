export const formatDateTime = (inputDateString: string) => {
  const date = new Date(inputDateString);

  // Get the components of the date
  const day = date.getDate();
  const month = date.getMonth() + 1; // Months are zero-indexed, so add 1
  const year = date.getFullYear(); // Get the last two digits of the year

  // Pad the components with leading zeros if necessary
  const paddedDay = day.toString().padStart(2, '0');
  const paddedMonth = month.toString().padStart(2, '0');
  const paddedYear = year.toString();

  // Create the formatted date string
  const formattedDateString = `${paddedDay}/${paddedMonth}/${paddedYear}`;
  return formattedDateString;
};
