import { postImageCancelBooking } from '@/services/BookingService/bookingService';
import { toast } from 'react-toastify';


export const ChangFileImageCancelBookingToUrl = async (listImage: File[]) => {
  try {
    const promises = listImage.map((img: File) => ChangeOneFileCancelBooking(img));
    const urls = await Promise.all(promises);
    return urls;
  } catch (err) {
    toast.error("Vui lòng thử lại")
  }
};

const ChangeOneFileCancelBooking = async (image: File) => {
  const formData = new FormData();
  formData.append('file', image);
  const response = await postImageCancelBooking(formData);
  return response.data;
};
