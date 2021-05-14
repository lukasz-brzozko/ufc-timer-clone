import {
  RefObject, useCallback, useEffect, useRef,
} from 'react';
import gsap from 'gsap';
import Countdown, { zeroPad } from 'react-countdown';

import Info from '../../../info/Info';
import Logo from '../Logo';
import RoundCounter from '../RoundCounter';

import styles from './Clock.module.scss';

interface RendererProps {
  minutes: number;
  seconds: number;
}

function Clock(): JSX.Element {
  const refClock = useRef(null);

  const showClock = useCallback(
    () => {
      const tl = gsap.timeline({
        defaults: {
          duration: '0.4',
          ease: 'power1.inOut',
        },
        id: 'showClock',
      });
      tl
        .set(refClock.current, { height: '200%' })
        .fromTo(refClock.current, { rotateX: '90deg', y: '200%' }, { ease: 'power2.in', rotateX: '0deg', y: '25%' })
        .to(refClock.current, { height: '100%', y: '0%' }, '>');
    },
    [refClock],
  );

  const renderer = useCallback(
    (props: RendererProps) => (
      <>
        <span className={styles.time}>
          <span className={styles.minutes}>{zeroPad(props.minutes, 1)}</span>
          <span className={styles.separator}>:</span>
          <span className={styles.seconds}>{zeroPad(props.seconds, 2)}</span>
        </span>
      </>
    ),
    [],
  );

  useEffect(() => {
    showClock();
  }, [refClock]);

  return (
    <div className={styles.clock} ref={refClock}>
      <Info />
      <Logo />
      {/* <Countdown
        date={Date.now() + 5 * 60 * 1000}
        renderer={renderer}
      /> */}
      <RoundCounter />
    </div>
  );
}

export default Clock;
