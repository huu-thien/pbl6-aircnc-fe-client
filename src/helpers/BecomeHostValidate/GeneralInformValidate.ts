import * as yup from 'yup';

const regexCardNumber = /^\d{16}$/;

const generalInformation = {
  roomName: '',
  description: '',
  address: '',
  quantityOld: '',
  quantityChild: '',
  quantityBedRooms: '',
  quantityBed: '',
  quantityBathRooms: '',
  utilities: [] as string[],
  pricePerNight: '',
  policy: 'flexible',
  listImage: [
    {
      name: '',
      type: '',
      size: '',
    },
  ],
  feeCleaning: '',
  typeRoom: '',
  bankName: '',
  accountNumber: '',
  accountHolder: '',
};
const GeneralSchema = yup.object().shape({
  roomName: yup.string().required('Tên phòng là bắt buộc'),
  description: yup.string().min(100, 'Mô tả phải có ít nhất 100 kí tự').required('Mô tả phòng là bắt buộc'),
  address: yup.string().required('Địa chỉ là bắt buộc'),
  quantityOld: yup.number().min(0, 'Số lượng người phải lớn hơn 0').required('Số lượng người lớn tối đa là bắt buộc'),
  quantityChild: yup.number().min(0, 'Số lượng người phải lớn hơn 0').required('Số lượng trẻ em tối đa là bắt buộc'),
  quantityBedRooms: yup
    .number()
    .min(0, 'Số lượng phòng phải lớn hơn hoặc bằng 0')
    .required('Số lượng phòng ngủ là bắt buộc'),
  quantityBed: yup.number().min(0, 'Số lượng giường phải lớn hơn hoặc bằng 0').required('Số lượng giường là bắt buộc'),
  quantityBathRooms: yup
    .number()
    .min(0, 'Số lượng phòng phải lớn hơn hoặc bằng 0')
    .required('Số lượng phòng tắm là bắt buộc'),
  utilities: yup.array().min(2, 'Tiện ích phải nhiều hơn 2').required('Tiện ích là bắt buộc'),
  pricePerNight: yup.number().min(0, 'Giá tiền phải lớn hơn hoặc bằng 0').required('Giá tiền là bắt buộc'),
  listImage: yup.array().min(8, 'Ảnh phải nhiều hơn 8').required('Ảnh là bắt buộc'),
  feeCleaning: yup.number().min(0, 'Giá tiền phải lớn hơn hoặc bằng 0').required('Giá tiền là bắt buộc'),
  // policy: yup.string().required('Vui lòng chọn chính sách')
  typeRoom: yup.string().required('Vui lòng chọn loại phòng'),
  bankName: yup.string(),
  accountNumber: yup.string().matches(regexCardNumber, 'Số thẻ phải đúng định dạng 16 chữ số'),
  accountHolder: yup.string().min(5, 'Tên chủ thẻ phải có ít nhất 5 kí tự'),
});

export { generalInformation, GeneralSchema };
