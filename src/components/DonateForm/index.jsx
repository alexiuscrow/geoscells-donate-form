import style from './DonateForm.module.scss';
import {useCallback, useId, useState} from 'react';
import Button from '../Button';
import {usePaymentInputs} from 'react-payment-inputs';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import Cards from 'react-credit-cards';
import './CreditCard.scss';
import CyrillicToTranslit from 'cyrillic-to-translit-js';
import {useTranslation} from 'react-i18next';
import ValidationSchema from './ValidationSchema';
import AnimatedErrorMessage from '../AnimatedErrorMessage';
import classnames from 'classnames';

const cyrillicToTranslit = new CyrillicToTranslit({preset: 'uk'});

const DonateForm = () => {
  const nameInputId = useId();
  const emailInputId = useId();
  const amountInputId = useId();
  const cardNumberInputId = useId();
  const expDateInputId = useId();
  const cvvInputId = useId();

  const [cardFocus, setCardFocus] = useState(null);

  const handleOnFieldFocus = useCallback(
    e => {
      const fieldName = e.target.name;
      if (fieldName === 'name') {
        setCardFocus('name');
      } else if (fieldName === 'cardNumber') {
        setCardFocus('number');
      } else if (fieldName === 'expiryDate') {
        setCardFocus('expiry');
      } else if (fieldName === 'cvc') {
        setCardFocus('cvc');
      } else {
        setCardFocus(null);
      }
    },
    [setCardFocus]
  );

  const handleOnFieldBlur = useCallback(() => {
    setCardFocus(null);
  }, [setCardFocus]);

  const {t} = useTranslation();

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

  const handleSubmit = useCallback(
    async data => {
      console.log(data);
    },
    []
  );

  return (
    <Formik
      initialValues={{
        name: '',
        amount: '',
        cardNumber: '',
        expiryDate: '',
        cvc: ''
      }}
      onSubmit={handleSubmit}
      validationSchema={ValidationSchema}
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
      {({values}) => {
        return (
          <Form className={style.form}>
            <div className={style.cardWrapper}>
              <Cards
                cvc={values.cvc}
                expiry={values.expiryDate.replaceAll(' ', '')}
                focused={cardFocus}
                name={cyrillicToTranslit.transform(values.name)}
                number={values.cardNumber}
              />
            </div>
            <div className={style.fieldsWrapper}>
              <label htmlFor={nameInputId}>{t('creditCardDonation.name.label')}</label>
              <div className={style.fieldWrapper}>
                <Field id={nameInputId} type="text" name="name">
                  {({field}) => {
                    return (
                      <input
                        id={nameInputId}
                        type="text"
                        name="name"
                        placeholder={t('creditCardDonation.name.inputPlaceholder')}
                        onFocus={handleOnFieldFocus}
                        className={style.inputName}
                        {...field}
                      />
                    );
                  }}
                </Field>
                <ErrorMessage name="name">
                  {errorI18Key => (
                    <AnimatedErrorMessage className={style.errorMessage}>
                      {t(`validationMessages.${errorI18Key}`)}
                    </AnimatedErrorMessage>
                  )}
                </ErrorMessage>
              </div>
              <label htmlFor={nameInputId}>{t('creditCardDonation.email.label')}</label>
              <div className={style.fieldWrapper}>
                <Field id={emailInputId} type="text" name="email">
                  {({field}) => {
                    return (
                      <input
                        id={emailInputId}
                        type="email"
                        name="email"
                        placeholder={t('creditCardDonation.email.inputPlaceholder')}
                        onFocus={handleOnFieldFocus}
                        className={style.inputEmail}
                        {...field}
                      />
                    );
                  }}
                </Field>
                <ErrorMessage name="name">
                  {errorI18Key => (
                    <AnimatedErrorMessage className={style.errorMessage}>
                      {t(`validationMessages.${errorI18Key}`)}
                    </AnimatedErrorMessage>
                  )}
                </ErrorMessage>
              </div>
              <label htmlFor={amountInputId}>{t('creditCardDonation.amount.label')}</label>
              <div className={style.fieldWrapper}>
                <Field id={amountInputId} type="number" step={10} name="amount">
                  {({field}) => {
                    return (
                      <input
                        id={amountInputId}
                        type="number"
                        step={10}
                        placeholder={t('creditCardDonation.amount.inputPlaceholder')}
                        onFocus={handleOnFieldFocus}
                        className={style.inputAmount}
                        {...field}
                      />
                    );
                  }}
                </Field>
                <ErrorMessage name="amount">
                  {errorI18Key => (
                    <AnimatedErrorMessage className={style.errorMessage}>
                      {t(`validationMessages.${errorI18Key}`)}
                    </AnimatedErrorMessage>
                  )}
                </ErrorMessage>
              </div>
              <label htmlFor={cardNumberInputId}>{t('creditCardDonation.cardNumber.label')}</label>
              <div className={style.fieldWrapper}>
                <Field
                  id={cardNumberInputId}
                  type="number"
                  name="cardNumber"
                  placeholder={t('creditCardDonation.cardNumber.inputPlaceholder')}>
                  {({field}) => (
                    <input
                      {...getCardNumberProps({
                        onBlur: e => {
                          field.onBlur(e);
                          handleOnFieldBlur();
                        },
                        onChange: field.onChange,
                        onFocus: handleOnFieldFocus,
                        value: field.value
                      })}
                      placeholder={t('creditCardDonation.cardNumber.inputPlaceholder')}
                      className={style.inputCard}
                    />
                  )}
                </Field>
                <ErrorMessage name="cardNumber">
                  {errorI18Key => (
                    <AnimatedErrorMessage className={style.errorMessage}>
                      {t(`validationMessages.${errorI18Key}`)}
                    </AnimatedErrorMessage>
                  )}
                </ErrorMessage>
              </div>
              <label htmlFor={expDateInputId} className={style.leftSideField}>
                {t('creditCardDonation.expiryDate.label')}
              </label>
              <div className={classnames(style.fieldWrapper, style.leftSideField)}>
                <Field
                  id={cardNumberInputId}
                  type="text"
                  name="expiryDate"
                  placeholder={t('creditCardDonation.expiryDate.inputPlaceholder')}>
                  {({field}) => (
                    <input
                      {...field}
                      {...getExpiryDateProps({
                        onBlur: e => {
                          field.onBlur(e);
                          handleOnFieldBlur();
                        },
                        onChange: field.onChange,
                        onFocus: handleOnFieldFocus,
                        value: field.value,
                        className: style.input
                      })}
                      placeholder={t('creditCardDonation.expiryDate.inputPlaceholder')}
                    />
                  )}
                </Field>
                <ErrorMessage name="expiryDate">
                  {errorI18Key => (
                    <AnimatedErrorMessage className={style.errorMessage}>
                      {t(`validationMessages.${errorI18Key}`)}
                    </AnimatedErrorMessage>
                  )}
                </ErrorMessage>
              </div>
              <label htmlFor={cvvInputId} className={style.rightSideField}>
                {t('creditCardDonation.cvc.label')}
              </label>
              <div className={classnames(style.fieldWrapper, style.rightSideField)}>
                <Field id={cvvInputId} type="number" name="cvc">
                  {({field}) => (
                    <input
                      {...field}
                      {...getCVCProps({
                        onBlur: e => {
                          field.onBlur(e);
                          handleOnFieldBlur();
                        },
                        onChange: field.onChange,
                        onFocus: handleOnFieldFocus,
                        value: field.value,
                        className: style.input
                      })}
                      placeholder={t('creditCardDonation.cvc.inputPlaceholder')}
                    />
                  )}
                </Field>
                <ErrorMessage name="cvc">
                  {errorI18Key => (
                    <AnimatedErrorMessage className={style.errorMessage}>
                      {t(`validationMessages.${errorI18Key}`)}
                    </AnimatedErrorMessage>
                  )}
                </ErrorMessage>
              </div>
            </div>
            <div className={style.buttonWrapper}>
              <Button type="submit" className={style.button} color="red">
                {t('creditCardDonation.donateButton')}
              </Button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

DonateForm.propTypes = {};

export default DonateForm;
