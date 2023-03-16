import PropTypes from 'prop-types';
import style from './PaymentResultNotification.module.scss';
import {ReactComponent as SuccessIcon} from './icons/success.svg';
import {ReactComponent as ErrorIcon} from './icons/error.svg';
import {useTranslation} from 'react-i18next';
import Button from '../../../Button';

const PaymentResultNotification = ({paymentId, paymentStatus, secondaryInfo, onClickOk}) => {
  const {t} = useTranslation();

  let iconJsx;
  let title;
  let secondaryInfoWrapper = null;
  let buttonTitle;

  if (paymentStatus === PaymentResultNotification.paymentStatuses.SUCCESS) {
    title = t('paymentResult.success.title');
    iconJsx = <SuccessIcon className={style.icon} />;
    buttonTitle = t('paymentResult.success.buttonTitle');
  } else {
    title = t('paymentResult.error.title');
    iconJsx = <ErrorIcon className={style.icon} />;
    buttonTitle = t('paymentResult.error.buttonTitle');
  }

  if (secondaryInfo) {
    secondaryInfoWrapper = (
      <div className={style.secondaryInfoWrapper}>
        <span className={style.text}>{secondaryInfo}</span>
      </div>
    );
  }

  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={style.iconWrapper}>{iconJsx}</div>
        <div className={style.titleWrapper}>
          <h1 className={style.title}>{title}</h1>
        </div>
        <div className={style.paymentId}>{`${t('paymentResult.paymentIdTitle')} ${paymentId}`}</div>
        {secondaryInfoWrapper}
        <Button onClick={onClickOk} className={style.button}>
          {buttonTitle}
        </Button>
      </div>
    </div>
  );
};

PaymentResultNotification.paymentStatuses = {
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR'
};

PaymentResultNotification.propTypes = {
  paymentId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  paymentStatus: PropTypes.oneOf([...Object.values(PaymentResultNotification.paymentStatuses)]).isRequired,
  onClickOk: PropTypes.func.isRequired,
  secondaryInfo: PropTypes.string
};

export default PaymentResultNotification;
