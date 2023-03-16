import PropTypes from 'prop-types';
import GGooglePayButton from '@google-pay/button-react';
import {useTranslation} from 'react-i18next';
import style from './GooglePayButton.module.scss';

const GooglePayButton = ({isDevMode, merchantIdentifier, merchantName, donationAmount, onLoadPaymentData, onClick}) => {
  const {t} = useTranslation();
  return (
    <GGooglePayButton
      environment={isDevMode ? 'TEST' : 'PRODUCTION'}
      buttonSizeMode="fill"
      buttonColor="white"
      buttonType="plain"
      className={style.container}
      onClick={onClick}
      existingPaymentMethodRequired={false}
      paymentRequest={{
        apiVersion: 2,
        apiVersionMinor: 0,
        allowedPaymentMethods: [
          {
            type: 'CARD',
            parameters: {
              allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
              allowedCardNetworks: ['MASTERCARD', 'VISA']
            },
            tokenizationSpecification: {
              type: 'PAYMENT_GATEWAY',
              parameters: {
                gateway: 'example',
                gatewayMerchantId: 'exampleGatewayMerchantId'
              }
            }
          }
        ],
        merchantInfo: {
          merchantId: merchantIdentifier,
          merchantName: merchantName
        },
        transactionInfo: {
          totalPriceStatus: 'FINAL',
          totalPriceLabel: t('googlePay.totalPriceLabel'),
          totalPrice: donationAmount.toString(),
          currencyCode: 'USD',
          countryCode: 'US'
        }
      }}
      onLoadPaymentData={paymentRequest => {
        onLoadPaymentData?.(paymentRequest);
      }}
    />
  );
};

GooglePayButton.propTypes = {
  isDevMode: PropTypes.bool,
  merchantIdentifier: PropTypes.string,
  merchantName: PropTypes.string,
  donationAmount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onLoadPaymentData: PropTypes.func,
  onClick: PropTypes.func
};

GooglePayButton.defaultProps = {
  isDevMode: process.env.NODE_ENV === 'development',
  merchantIdentifier: 'https://geoscells.com',
  merchantName: 'Geoscells LLC',
  donationAmount: '0'
};

export default GooglePayButton;
