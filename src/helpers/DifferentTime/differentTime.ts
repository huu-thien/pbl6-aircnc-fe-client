export const differentTime = (inputDateString: string) => {
    const currentTime = new Date();
    const providedTime = new Date(inputDateString);
    const differenceInMilliseconds = currentTime - providedTime;
    const minutesDifference = Math.floor(differenceInMilliseconds / (1000 * 60));
    const hoursDifference = Math.floor(differenceInMilliseconds / (1000 * 60 * 60));
    const daysDifference = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
    // console.log('current:',currentTime, ' time:',inputDateString);
    
    if (minutesDifference>0)
    {
      if (minutesDifference < 60 ) {
        return `${minutesDifference} phút`;
      } else if (hoursDifference < 24) {
        return `${hoursDifference} giờ`;
      } else {
        return `${daysDifference} ngày`;
      }
    }
    else
    {
      return `0 phút`
    }
    
};
