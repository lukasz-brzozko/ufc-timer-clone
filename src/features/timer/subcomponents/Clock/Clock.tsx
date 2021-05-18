import {
  useCallback, useEffect, useRef,
} from 'react';
import gsap from 'gsap';
import Countdown, { zeroPad } from 'react-countdown';

import Info from '../../../info/Info';
import Logo from '../Logo';
import RoundCounter from '../../../roundCounter';

import styles from './Clock.module.scss';

interface RendererProps {
  minutes: number;
  seconds: number;
}

function Clock(): JSX.Element {
  const refClock = useRef<HTMLDivElement>(null);
  const refCountdown = useRef<HTMLSpanElement>(null);

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

  const showCountdown = useCallback(
    () => {
      const tl = gsap.timeline({
        defaults: {
          duration: '0.4',
          ease: 'power1.inOut',
        },
        id: 'showCountdown',
      });
      tl
        .fromTo(refCountdown.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: '0.1' })
        .fromTo(refCountdown.current, { x: '-65%' }, { x: '0' });
    },
    [refCountdown],
  );

  const renderer = useCallback(
    (props: RendererProps) => (
      <>
        <span className={styles.time} ref={refCountdown}>
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
    showCountdown();
  }, [refClock]);

  return (
    <div className={styles.clock} ref={refClock}>
      <Info />
      <div className={styles.clockWrapper}>
        <Logo />
        <Countdown
          date={Date.now() + 5 * 60 * 1000}
          renderer={renderer}
        />
      </div>
      <RoundCounter />
    </div>
  );
}

export default Clock;
