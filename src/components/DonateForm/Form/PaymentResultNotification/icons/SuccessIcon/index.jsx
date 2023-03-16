import style from './SuccessIcon.module.scss';
import {useEffect, useRef, useState} from 'react';
import {animated, useSpring} from 'react-spring';
import PropTypes from 'prop-types';

const SuccessIcon = ({className}) => {
  const path1Ref = useRef();
  const circleRef = useRef();

  const [pathLengths, setPathLengths] = useState({
    path1: 357.8266906738281,
    circle: 1491.114917801562
  });

  useEffect(() => {
    if (path1Ref.current) {
      setPathLengths({
        path1: path1Ref.current.getTotalLength(),
        circle: circleRef.current.getTotalLength()
      });
    }
  }, [setPathLengths, path1Ref, circleRef]);

  const path1AnimatedStyle = useSpring({
    from: {
      strokeDasharray: pathLengths.path1,
      strokeDashoffset: pathLengths.path1
    },
    to: {
      strokeDashoffset: 0
    },
    delay: 400
  });

  const circleAnimatedStyle = useSpring({
    from: {
      strokeDasharray: pathLengths.circle,
      strokeDashoffset: pathLengths.circle
    },
    to: {
      strokeDashoffset: 0
    },
    delay: 1000
  });

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 510 510" className={className}>
      <animated.path
        className={style.path1}
        d="M123,272l97,63,181.22-157.6"
        strokeLinecap="round"
        ref={path1Ref}
        style={path1AnimatedStyle}
      />
      <animated.circle className={style.circle} cx="255" cy="255" r="237" ref={circleRef} style={circleAnimatedStyle} />
    </svg>
  );
};

SuccessIcon.propTypes = {
  className: PropTypes.string
};

export default SuccessIcon;
