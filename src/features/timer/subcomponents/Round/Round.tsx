import gsap from 'gsap';
import { useCallback, useEffect, useRef } from 'react';

import { selectActiveRound, selectRoundsCounter } from '../../../roundCounter/roundCounterSlice';
import { useAppSelector } from '../../../../app/hooks';

import styles from './Round.module.scss';

function Round(): JSX.Element {
  const { rounds } = useAppSelector(selectRoundsCounter);
  const activeRound = useAppSelector(selectActiveRound);
  const roundsArr: JSX.Element[] = [];
  const refRoundContainer = useRef<HTMLDivElement>(null);

  const showRounds = useCallback(() => {
    const roundsWrapperEl = refRoundContainer.current?.getElementsByClassName(styles.roundWrapper);
    const roundsEl = refRoundContainer.current?.getElementsByClassName(styles.round);

    const tl = gsap.timeline({
      defaults: {
        duration: '0.4',
        ease: 'power1.out',
      },
      id: 'showRounds',
    });

    if (roundsWrapperEl !== undefined && roundsEl !== undefined) {
      tl
        .set(refRoundContainer.current, {
          bottom: '100%', y: '100%', height: '120%', rotateX: '90deg', transformOrigin: 'center 0',
        })
        .fromTo(refRoundContainer.current, { backgroundImage: 'inherit', filter: 'blur(0px)' }, { backgroundImage: 'none', filter: 'blur(0px)' })
        .fromTo(roundsEl, { backgroundColor: 'transparent', backgroundImage: 'inherit' }, { backgroundImage: 'linear-gradient(180deg, #363636 0%, #2b2b2b 100%)' }, '<')
        .to(refRoundContainer.current, { rotateX: '0deg' }, '<')
        .fromTo(refRoundContainer.current, { autoAlpha: 0 }, { autoAlpha: 1 }, '<')
        .to(refRoundContainer.current, { bottom: '-20%', y: '0%' }, '<')
        .to(refRoundContainer.current, { height: '5' }, '-=0.2')
        .fromTo(roundsWrapperEl, { height: '100%' }, { height: '5' }, '<')
        .to(`.${styles.roundComplete}`, { backgroundColor: '#fff', backgroundImage: 'linear-gradient(transparent 0%, transparent 100%)' });
    }
  }, []);

  useEffect(() => {
    showRounds();
  }, [refRoundContainer]);

  for (let i = 1; i < rounds + 1; i += 1) {
    const isRoundCompletedModifier = i < activeRound ? ` ${styles.roundComplete}` : '';
    const roundModifier = activeRound === i ? ` ${styles.roundActive}` : isRoundCompletedModifier;
    const roundJSX = (
      <div className={styles.roundWrapper} key={i}>
        <span className={`${styles.round}${roundModifier}`} />
      </div>
    );
    roundsArr.push(roundJSX);
  }

  return (
    <div className={styles.roundContainer} ref={refRoundContainer}>
      {roundsArr}
    </div>
  );
}

export default Round;
