export const differentTime = (inputDateString: string) => {
    const currentTime = new Date();
    const providedTime = new Date(inputDateString);
    const differenceInMilliseconds = currentTime - providedTime;
    const minutesDifference = Math.floor(differenceInMilliseconds / (1000 * 60));
    const hoursDifference = Math.floor(differenceInMilliseconds / (1000 * 60 * 60));
    const daysDifference = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));

    // Xác định cách hiển thị dựa trên khoảng cách thời gian
    if (minutesDifference < 60) {
        return `${minutesDifference} phút`;
      } else if (hoursDifference < 24) {
        return `${hoursDifference} giờ`;
      } else {
        return `${daysDifference} ngày`;
      }
};
