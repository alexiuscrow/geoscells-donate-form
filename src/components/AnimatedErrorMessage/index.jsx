import PropTypes from 'prop-types';
import {animated, config, useSpring} from 'react-spring';
import style from './AnimatedErrorMessage.module.scss';
import classnames from 'classnames';

const AnimatedErrorMessage = ({children, className}) => {
  const springFadeInStyle = useSpring({
    from: {
      opacity: 0
    },
    to: {
      opacity: 1
    },
    config: config.slow
  });

  return (
    <animated.div className={classnames(style.errorMessage, className)} style={springFadeInStyle}>
      {children}
    </animated.div>
  );
};

AnimatedErrorMessage.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string
};

export default AnimatedErrorMessage;
