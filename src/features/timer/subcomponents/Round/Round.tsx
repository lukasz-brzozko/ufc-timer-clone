import gsap from 'gsap';
import { useCallback, useEffect, useRef } from 'react';

import { readFile } from 'node:fs';
import { selectActiveRound, selectRoundsCounter } from '../../../roundCounter/roundCounterSlice';
import { useAppSelector } from '../../../../app/hooks';

import styles from './Round.module.scss';

function Round(): JSX.Element {
  const { rounds } = useAppSelector(selectRoundsCounter);
  const activeRound = useAppSelector(selectActiveRound);
  const roundsArr: JSX.Element[] = [];
  const refRoundContainer = useRef<HTMLDivElement>(null);

  const showRounds = useCallback(() => {
    const { current: roundContainerEl } = refRoundContainer;
    const roundsWrapperEl = roundContainerEl?.getElementsByClassName(styles.roundWrapper);
    const roundsEl = roundContainerEl?.getElementsByClassName(styles.round);
    const activeRoundEl = roundContainerEl?.getElementsByClassName(styles.roundActive);
    const completedRounds = roundContainerEl?.getElementsByClassName(styles.roundComplete) ?? [];

    const tl = gsap.timeline({
      defaults: {
        duration: '0.4',
        ease: 'power1.out',
      },
      id: 'showRounds',
    });

    if (roundsWrapperEl !== undefined && roundsEl !== undefined && activeRoundEl !== undefined) {
      tl
        .set(roundContainerEl, {
          bottom: '100%', y: '100%', height: '120%', rotateX: '90deg', transformOrigin: 'center 0',
        })
        .fromTo(roundContainerEl, { filter: 'blur(0px)' }, { filter: 'blur(0px)' })
        .to(roundContainerEl, { rotateX: '0deg' }, '<')
        .fromTo(roundContainerEl, { autoAlpha: 0 }, { autoAlpha: 1 }, '<')
        .to(roundContainerEl, { bottom: '-20%', y: '0%' }, '<')
        .to(roundContainerEl, { height: '5' }, '-=0.2')
        .fromTo(roundsWrapperEl, { height: '100%' }, { height: '5' }, '<')
        .fromTo(completedRounds, { backgroundColor: 'transparent' }, { backgroundColor: '#fff', backgroundImage: 'linear-gradient(transparent 0%, transparent 100%)' })
        .to(activeRoundEl, { backgroundImage: 'linear-gradient(to right, #fff 50%, #2b2b2b 50%, #2b2b2b 100%)' }, '<')
        .set(activeRoundEl, { duration: 0.15, ease: 'none' })
        .to(activeRoundEl, { autoAlpha: 0, duration: 0.15 }, '<')
        .to(activeRoundEl, { autoAlpha: 1, duration: 0.15 })
        .to(activeRoundEl, { autoAlpha: 0, duration: 0.15 })
        .to(activeRoundEl, { autoAlpha: 1, duration: 0.15 });
    }
  }, [refRoundContainer]);

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
