import {usePaymentInputs} from 'react-payment-inputs';
import {Formik} from 'formik';
import ValidationSchema from './ValidationSchema';
import Form from './Form';

const FormWrapper = () => {
  const {meta, getCardNumberProps, getExpiryDateProps, getCVCProps} = usePaymentInputs({
    errorMessages: {
      emptyCardNumber: 'paymentInputs.emptyCardNumber',
      invalidCardNumber: 'paymentInputs.invalidCardNumber',
      emptyExpiryDate: 'paymentInputs.emptyExpiryDate',
      monthOutOfRange: 'paymentInputs.monthOutOfRange',
      yearOutOfRange: 'paymentInputs.yearOutOfRange',
      dateOutOfRange: 'paymentInputs.dateOutOfRange',
      invalidExpiryDate: 'paymentInputs.invalidExpiryDate',
      emptyCVC: 'paymentInputs.emptyCVC',
      invalidCVC: 'paymentInputs.invalidCVC'
    }
  });

  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        amount: '',
        cardNumber: '',
        expiryDate: '',
        cvc: ''
      }}
      validationSchema={ValidationSchema}
      onSubmit={() => undefined}
      validate={() => {
        let errors = {};
        if (meta.erroredInputs.cardNumber) {
          errors.cardNumber = meta.erroredInputs.cardNumber;
        }
        if (meta.erroredInputs.expiryDate) {
          errors.expiryDate = meta.erroredInputs.expiryDate;
        }
        if (meta.erroredInputs.cvc) {
          errors.cvc = meta.erroredInputs.cvc;
        }
        return errors;
      }}>
      {() => (
        <Form
          getCardNumberProps={getCardNumberProps}
          getExpiryDateProps={getExpiryDateProps}
          getCVCProps={getCVCProps}
        />
      )}
    </Formik>
  );
};

FormWrapper.propTypes = {};

FormWrapper.paymentMethods = {
  CARD: 'CARD',
  APPLE_PAY: 'APPLE_PAY',
  GOOGLE_PAY: 'GOOGLE_PAY'
};

export default FormWrapper;
