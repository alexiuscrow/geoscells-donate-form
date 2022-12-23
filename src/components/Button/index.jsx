import style from './Button.module.scss';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const Button = ({children, className, size, color, ...otherProps}) => {
  const buttonClassName = classnames(style.button, style[`${size}Size`], className, {
    [style.red]: color === 'red'
  });
  return (
    // eslint-disable-next-line react/button-has-type
    <button className={buttonClassName} {...otherProps}>
      {children}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.oneOf(['button', 'reset', 'submit']),
  children: PropTypes.any,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onClick: PropTypes.func,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  color: PropTypes.oneOf(['green', 'red'])
};

Button.defaultProps = {
  type: 'button',
  size: 'md',
  color: 'green'
};

export default Button;
