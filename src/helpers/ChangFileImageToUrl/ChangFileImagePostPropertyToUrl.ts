import { postImagePropertyUrl } from '@/services/PropertyService/propertyService';
import { toast } from 'react-toastify';

export const ChangFileImageToUrl = async (listImage: File[]): Promise<{ url: string }[] | undefined> => {
  try {
    const promises = listImage.map((img: File) => ChangeOneFile(img));
    const urls = await Promise.all(promises);
    return urls;
  } catch (err) {
    toast.error('Có gì đó sai sai . Vui lòng thử lại');
  }
};

const ChangeOneFile = async (image: File) => {
  const formData = new FormData();
  formData.append('file', image);
  const response = await postImagePropertyUrl(formData);
  return response.data;
};
