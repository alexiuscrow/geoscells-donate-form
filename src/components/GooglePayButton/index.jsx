import style from './GooglePayButton.module.scss';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const GooglePayButton = ({className, onClick, ...otherProps}) => {
  return (
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

GooglePayButton.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func
};

GooglePayButton.defaultProps = {};

export default GooglePayButton;
