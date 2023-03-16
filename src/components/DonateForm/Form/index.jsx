import PropTypes from 'prop-types';
import style from './Form.module.scss';
import {animated, useTransition} from 'react-spring';
import Cards from 'react-credit-cards';
import {ErrorMessage, Field, Form as FormikForm, useFormikContext} from 'formik';
import AnimatedErrorMessage from '../../AnimatedErrorMessage';
import classnames from 'classnames';
import Button from '../../Button';
import PaymentResultNotification from './PaymentResultNotification';
import {useCallback, useId, useState} from 'react';
import CyrillicToTranslit from 'cyrillic-to-translit-js';
import {useTranslation} from 'react-i18next';
import './CreditCard.scss';
import Loader from '../../Loader';
import ApplePayButton from '../../ApplePayButton';
import GooglePayButton from '../../GooglePayButton';
import FakeService from '../../../FakeService';

const cyrillicToTranslit = new CyrillicToTranslit({preset: 'uk'});

const Form = ({getCardNumberProps, getExpiryDateProps, getCVCProps}) => {
  const {t} = useTranslation();

  const nameInputId = useId();
  const emailInputId = useId();
  const amountInputId = useId();
  const cardNumberInputId = useId();
  const expDateInputId = useId();
  const cvvInputId = useId();

  const {values, isSubmitting, setTouched, dirty, errors, resetForm, isValid, setSubmitting} = useFormikContext();

  const [isSubmittedSuccessfully, setIsSubmittedSuccessfully] = useState(null);
  const [paymentId, setPaymentId] = useState(null);
  const [errorReason, setErrorReason] = useState(null);

  const transition = useTransition(
    {isSubmitting, isSubmittedSuccessfully, paymentId, errorReason},
    {
      from: {
        y: '10%',
        opacity: 0.0
      },
      enter: {
        y: '0%',
        opacity: 1.0
      },
      leave: {
        y: '-10%',
        opacity: 0.0
      },
      keys: item => `${item.isSubmittedSuccessfully}-${item.isSubmitting}`
    }
  );

  const processPayment = useCallback(
    async (paymentMethod, payload) => {
      try {
        let paymentResult;

        setSubmitting(true);

        if (paymentMethod === Form.paymentMethods.GOOGLE_PAY) {
          paymentResult = await FakeService.makeRequest(payload);
        } else if (paymentMethod === Form.paymentMethods.APPLE_PAY) {
          paymentResult = await FakeService.makeRequest(payload);
        } else {
          paymentResult = await FakeService.makeRequest(payload);
        }

        setPaymentId(paymentResult.paymentId);
        setIsSubmittedSuccessfully(true);
      } catch (e) {
        setErrorReason(e.reason);
        setPaymentId(e.paymentId);
        setIsSubmittedSuccessfully(false);
      } finally {
        setSubmitting(false);
      }
    },
    [setSubmitting]
  );

  const onClickPayButton = useCallback(() => {
    if (!dirty || !isValid) {
      setTouched(
        {
          name: true,
          email: true,
          amount: true,
          cardNumber: true,
          expiryDate: true,
          cvc: true
        },
        true
      );
      return;
    }

    const payload = {
      formData: values
    };
    processPayment(Form.paymentMethods.CARD, payload);
  }, [dirty, isValid, processPayment, setTouched, values]);

  const onClickAppleOrGoogleButtonHandler = useCallback(
    event => {
      const isValid = Object.keys(errors).every(errorFieldKey => !['name', 'email', 'amount'].includes(errorFieldKey));
      if (!dirty) {
        event.preventDefault();
        setTouched(
          {
            name: true,
            email: true,
            amount: true,
            cardNumber: false,
            expiryDate: false,
            cvc: false
          },
          true
        );
      } else {
        const isCardDataErrorExist = Object.keys(errors).some(errorFieldKey =>
          ['cardNumber', 'expiryDate', 'cvc'].includes(errorFieldKey)
        );
        if (isCardDataErrorExist) {
          setTouched(
            {
              name: true,
              email: true,
              amount: true,
              cardNumber: false,
              expiryDate: false,
              cvc: false
            },
            false
          );
        }

        if (!isValid) {
          event.preventDefault();
        }
      }
    },
    [setTouched, dirty, errors]
  );

  const onLoadGooglePaymentData = useCallback(
    paymentData => {
      const payload = {
        formData: values,
        paymentData
      };
      processPayment(Form.paymentMethods.GOOGLE_PAY, payload);
    },
    [processPayment, values]
  );

  const onLoadApplePaymentData = useCallback(
    paymentData => {
      const payload = {
        formData: values,
        paymentData
      };
      processPayment(Form.paymentMethods.APPLE_PAY, payload);
    },
    [processPayment, values]
  );

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

  const onBlurFieldHandler = useCallback(() => {
    setCardFocus(null);
  }, [setCardFocus]);

  const backToFormHandler = useCallback(() => {
    resetForm();
    setPaymentId(null);
    setErrorReason(null);
    setIsSubmittedSuccessfully(null);
  }, [resetForm]);

  return (
    <div className={style.container}>
      {transition((springStyle, {isSubmitting: isSubmitting2, isSubmittedSuccessfully, paymentId, errorReason}) => {
        if (isSubmitting2) {
          return (
            <animated.div style={springStyle} className={style.animatedContentWrapper}>
              <Loader />
            </animated.div>
          );
        } else if (isSubmittedSuccessfully === null) {
          return (
            <animated.div style={springStyle} className={style.animatedContentWrapper}>
              <FormikForm className={style.form}>
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
                    <Field type="text" name="name">
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
                  <label htmlFor={emailInputId}>{t('creditCardDonation.email.label')}</label>
                  <div className={style.fieldWrapper}>
                    <Field type="text" name="email">
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
                    <ErrorMessage name="email">
                      {errorI18Key => (
                        <AnimatedErrorMessage className={style.errorMessage}>
                          {t(`validationMessages.${errorI18Key}`)}
                        </AnimatedErrorMessage>
                      )}
                    </ErrorMessage>
                  </div>
                  <label htmlFor={amountInputId}>{t('creditCardDonation.amount.label')}</label>
                  <div className={style.fieldWrapper}>
                    <Field type="number" step={10} name="amount">
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
                      type="number"
                      name="cardNumber"
                      placeholder={t('creditCardDonation.cardNumber.inputPlaceholder')}>
                      {({field}) => (
                        <input
                          {...field}
                          {...getCardNumberProps({
                            onBlur: e => {
                              setTimeout(() => {
                                field.onBlur(e);
                                onBlurFieldHandler();
                              }, 1);
                            },
                            onChange: field.onChange,
                            onFocus: handleOnFieldFocus,
                            value: field.value
                          })}
                          id={cardNumberInputId}
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
                      type="text"
                      name="expiryDate"
                      placeholder={t('creditCardDonation.expiryDate.inputPlaceholder')}>
                      {({field}) => (
                        <input
                          {...field}
                          {...getExpiryDateProps({
                            onBlur: e => {
                              setTimeout(() => {
                                field.onBlur(e);
                                onBlurFieldHandler();
                              }, 1);
                            },
                            onChange: field.onChange,
                            onFocus: handleOnFieldFocus,
                            value: field.value,
                            className: style.input
                          })}
                          id={cardNumberInputId}
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
                    <Field type="number" name="cvc">
                      {({field}) => (
                        <input
                          {...field}
                          {...getCVCProps({
                            onBlur: e => {
                              setTimeout(() => {
                                field.onBlur(e);
                                onBlurFieldHandler();
                              }, 1);
                            },
                            onChange: field.onChange,
                            onFocus: handleOnFieldFocus,
                            value: field.value,
                            className: style.input
                          })}
                          id={cvvInputId}
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
                  <div className={style.applePayAndGooglePayButtonsGroup}>
                    <ApplePayButton
                      donationAmount={values.amount || 0}
                      onClick={onClickAppleOrGoogleButtonHandler}
                      onLoadPaymentData={onLoadApplePaymentData}
                    />
                    <GooglePayButton
                      donationAmount={values.amount || 0}
                      onClick={onClickAppleOrGoogleButtonHandler}
                      onLoadPaymentData={onLoadGooglePaymentData}
                    />
                  </div>
                  <Button
                    className={style.button}
                    color="red"
                    disabled={isSubmitting}
                    tabIndex={0}
                    onClick={onClickPayButton}>
                    {t(isSubmitting ? 'creditCardDonation.loadingButton' : 'creditCardDonation.donateButton')}
                  </Button>
                </div>
              </FormikForm>
            </animated.div>
          );
        } else if (isSubmittedSuccessfully === true) {
          return (
            <animated.div style={springStyle} className={style.animatedContentWrapper}>
              <PaymentResultNotification
                paymentId={paymentId}
                onClickOk={backToFormHandler}
                paymentStatus={PaymentResultNotification.paymentStatuses.SUCCESS}
              />
            </animated.div>
          );
        } else {
          return (
            <animated.div style={springStyle} className={style.animatedContentWrapper}>
              <PaymentResultNotification
                paymentId={paymentId}
                secondaryInfo={errorReason}
                onClickOk={backToFormHandler}
                paymentStatus={PaymentResultNotification.paymentStatuses.ERROR}
              />
            </animated.div>
          );
        }
      })}
    </div>
  );
};

Form.propTypes = {
  getCardNumberProps: PropTypes.func.isRequired,
  getExpiryDateProps: PropTypes.func.isRequired,
  getCVCProps: PropTypes.func.isRequired
};

Form.paymentMethods = {
  CARD: 'CARD',
  APPLE_PAY: 'APPLE_PAY',
  GOOGLE_PAY: 'GOOGLE_PAY'
};

export default Form;
