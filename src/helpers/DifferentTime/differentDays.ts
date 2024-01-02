export const differentDays = (inputDateString: string) => {
  const currentDate = new Date();
  const providedDate = new Date(inputDateString);
  const daysDifference = Math.floor((providedDate - currentDate) / (1000 * 60 * 60 * 24)) + 1;
  return daysDifference;
};
