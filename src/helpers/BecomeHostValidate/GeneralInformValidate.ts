import * as yup from 'yup';

const generalInformation = {
  roomName: '',
  description: '',
  address: '',
  quantityOld: '',
  quantityChild: '',
  quantityBedRooms: '',
  quantityBed: '',
  quantityBathRooms: '',
  utilities: '',
  pricePerNight: '',
  policy: '',
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
  // utilities: yup.array().min(0, 'Tiện ích phải nhiều hơn 2').required('Tiện ích là bắt buộc'),
  pricePerNight: yup.number().min(0, 'Giá tiền phải lớn hơn hoặc bằng 0').required('Giá tiền là bắt buộc'),
  // policy: yup.string().required('')
});

export { generalInformation, GeneralSchema };
