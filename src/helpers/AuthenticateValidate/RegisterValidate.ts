import * as yup from 'yup';
const passwordRegex = /^(?=.*[A-Z])(?=.*[\W_])(?=.*\d).+$/;
const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const initialValues = {
  fullName: '',
  email: '',
  username: '',
  password: '',
  confirmPassword: '',
};
const RegisterSchema = yup.object().shape({
  fullName: yup.string().min(3, 'Tối thiểu 3 kí tự').max(50, 'Tối đa 50 kí tự').required('Tên đầy đủ là bắt buộc'),
  email: yup.string().matches(emailRegex, 'Email không hợp lệ').required('Email là bắt buộc'),
  username: yup.string().min(3, 'Tối thiểu 3 kí tự').max(50, 'Tối đa 50 kí tự').required('Tên đăng nhập là bắt buộc'),
  password: yup
    .string()
    .matches(passwordRegex, 'Mật khẩu phải có ít nhất 1 chữ số, 1 chữ hoa và 1 kí tự đặc biệt')
    .required('Mật khẩu là bắt buộc'),
  confirmPassword: yup
    .string()
    .test('Mật khẩu trùng khớp', 'Mật khẩu xác nhận không trùng khớp', function (value) {
      return this.parent.password === value;
    })
    .required('Xác nhận mật khẩu là bắt buộc'),
});

export { initialValues, RegisterSchema };
