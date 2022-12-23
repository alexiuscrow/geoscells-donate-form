import * as Yup from 'yup';

const FormSchema = Yup.object().shape({
  name: Yup.string().min(2, 'tooShort').max(60, 'tooLong').required('required'),
  amount: Yup.number().required('required').positive('positive').integer()
});

export default FormSchema;
