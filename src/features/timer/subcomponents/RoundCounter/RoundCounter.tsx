import { useCallback, useEffect, useRef } from 'react';
import gsap from 'gsap';
import Round from '../Round';

import styles from './RoundCounter.module.scss';

function RoundCounter(): JSX.Element {
  const refRoundNumber = useRef<HTMLSpanElement>(null);

  const showCurrentRound = useCallback(
    () => {
      const tl = gsap.timeline({
        defaults: {
          duration: '0.15',
        },
        id: 'showCurrentRound',
      });

      tl
        .to(refRoundNumber.current, { duration: '0.3', ease: 'power1.inOut', y: '0%' })
        .to(refRoundNumber.current, { autoAlpha: 0 }, '+=0.3')
        .to(refRoundNumber.current, { autoAlpha: 1 })
        .to(refRoundNumber.current, { autoAlpha: 0 })
        .to(refRoundNumber.current, { autoAlpha: 1 })
        .to(refRoundNumber.current, { duration: '0.3', ease: 'power2.inOut', y: '100%' }, '+=0.4');
    },
    [refRoundNumber],
  );

  useEffect(() => {
    showCurrentRound();
  }, []);

  return (
    <>
      <div className={styles.roundCounterWrapper}>
        <span className={styles.roundNumber} ref={refRoundNumber}>Round 1</span>
      </div>
      <Round />
    </>
  );
}

export default RoundCounter;
