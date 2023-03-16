import style from './ApplePayButton.module.scss';
import classnames from 'classnames';
import {useCallback, useEffect, useState} from 'react';
import PropTypes from 'prop-types';

const ApplePayButton = ({
                          className,
                          merchantIdentifier,
                          merchantName,
                          isDevMode,
                          onClick,
                          onLoadPaymentData,
                          requestMerchantSessionUrl,
                          donationAmount,
                          ...otherProps
                        }) => {
  const [isApplePayApiAvailable, setIsApplePayApiAvailable] = useState(false);

  const checkMakePaymentAbility = useCallback(async () => {
    if (isDevMode) {
      setIsApplePayApiAvailable(true);
      return;
    }

    const canMakePayments = await window.ApplePaySession.canMakePaymentsWithActiveCard(merchantIdentifier);
    if (canMakePayments) {
      setIsApplePayApiAvailable(true);
    }

    return canMakePayments;
  }, [isDevMode, merchantIdentifier]);

  useEffect(() => {
    if (window.ApplePaySession) {
      checkMakePaymentAbility();
    }
  }, [checkMakePaymentAbility, isDevMode]);

  const onClickHandler = useCallback(e => {
    onClick?.(e);

    if (e.defaultPrevented) {
      return;
    }

    const request = {
      countryCode: 'US',
      currencyCode: 'USD',
      merchantCapabilities: [
        'supports3DS'
      ],
      supportedNetworks: [
        'visa',
        'masterCard',
        'amex',
        'discover'
      ],
      total: {
        label: merchantName,
        type: 'final',
        amount: donationAmount.toString()
      }
    };
    const session = new window.ApplePaySession(3, request);
    // TODO: process Apple Pay session and pass payment data ↙️
    session.onvalidatemerchant = async event => {
      const merchantSession = (await fetch(requestMerchantSessionUrl)).json(); //TODO: change it
      session.completeMerchantValidation(merchantSession);
    };
    session.onpaymentauthorized = event => {
      // TODO: change it
      const result = {
        status: window.ApplePaySession.STATUS_SUCCESS
      };
      session.completePayment(result);
    };
    session.begin();
    onLoadPaymentData?.(/* TODO: Payment data */);
  }, [onClick, merchantName, donationAmount, onLoadPaymentData, requestMerchantSessionUrl])

  return !isApplePayApiAvailable ? null : (
    <div role="button" className={classnames(style.container, className)} tabIndex={0}
         onClick={onClickHandler} {...otherProps} />
  );
};


ApplePayButton.propTypes = {
  isDevMode: PropTypes.bool,
  merchantIdentifier: PropTypes.string,
  merchantName: PropTypes.string,
  onClick: PropTypes.func,
  onLoadPaymentData: PropTypes.func,
  requestMerchantSessionUrl: PropTypes.string,
  donationAmount: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

ApplePayButton.defaultProps = {
  isDevMode: process.env.NODE_ENV === 'development',
  merchantIdentifier: 'https://geoscells.com',
  merchantName: 'Geoscells LLC',
  requestMerchantSessionUrl: 'https://.....', // TODO: change it
  donationAmount: '0'
};

export default ApplePayButton;
