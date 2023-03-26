import style from './ApplePayButton.module.scss';
import classnames from 'classnames';
import {useEffect, useState} from 'react';
import PropTypes from 'prop-types';

const ApplePayButton = ({className, onClick, ...otherProps}) => {
  const [shouldToShow, setShouldToShow] = useState(false);

  useEffect(() => {
    if (window.ApplePaySession) {
      setShouldToShow(true);
    }
  }, [setShouldToShow]);

  return !shouldToShow ? null : (
    <div
      role="button"
      className={classnames(style.container, className)}
      tabIndex={0}
      onClick={onClick}
      onKeyDown={onClick}
      {...otherProps}
    />
  );
};

ApplePayButton.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func
};

ApplePayButton.defaultProps = {};

export default ApplePayButton;
