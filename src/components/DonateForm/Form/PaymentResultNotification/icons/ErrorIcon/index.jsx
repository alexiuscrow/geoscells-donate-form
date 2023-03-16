import style from './ErrorIcon.module.scss';
import {useEffect, useRef, useState} from 'react';
import {animated, useSpring} from 'react-spring';
import PropTypes from 'prop-types';

const ErrorIcon = ({className}) => {
  const line1Ref = useRef();
  const line2Ref = useRef();
  const circleRef = useRef();

  const [pathLengths, setPathLengths] = useState({
    line1: 342.8254699707031,
    line2: 342.8254699707031,
    circle: 1491.114917801562
  });

  useEffect(() => {
    if (line1Ref.current) {
      setPathLengths({
        line1: line1Ref.current.getTotalLength(),
        line2: line2Ref.current.getTotalLength(),
        circle: circleRef.current.getTotalLength()
      });
    }
  }, [setPathLengths, line1Ref, line2Ref, circleRef]);

  const line1AnimatedStyle = useSpring({
    from: {
      strokeDasharray: pathLengths.line1,
      strokeDashoffset: pathLengths.line1
    },
    to: {
      strokeDashoffset: 0
    },
    delay: 400
  });

  const line2AnimatedStyle = useSpring({
    from: {
      strokeDasharray: pathLengths.line2,
      strokeDashoffset: pathLengths.line2
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
      <animated.line
        className={style.line1}
        x1="375.5"
        y1="134.5"
        x2="134.5"
        y2="375.5"
        ref={line1Ref}
        style={line1AnimatedStyle}
      />
      <animated.line
        className={style.line2}
        x1="134.5"
        y1="134.5"
        x2="375.5"
        y2="375.5"
        ref={line2Ref}
        style={line2AnimatedStyle}
      />
      <animated.circle className={style.circle} cx="255" cy="255" r="237" ref={circleRef} style={circleAnimatedStyle} />
    </svg>
  );
};

ErrorIcon.propTypes = {
  className: PropTypes.string
};

export default ErrorIcon;
