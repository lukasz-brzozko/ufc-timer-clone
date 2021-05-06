import gsap from 'gsap';
import { useEffect, useRef } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectContestants, update } from './timerSlice';

import Clock from './subcomponents/Clock';
import Contestant from './subcomponents/Contestant';

import styles from './Timer.module.scss';

function Timer(): JSX.Element {
  const contestants = useAppSelector(selectContestants);
  const timer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timerEl = timer.current?.children;
    if (timerEl) {
      const [clock, firstContestant, secondContestant] = Array.from(timerEl);

      const tl = gsap.timeline({ defaults: { duration: 0.8 } });
      tl
      // .fromTo(firstContestant, { x: '100%' }, { x: '0%' }, 1)
      // .fromTo(secondContestant, { x: '-100%' }, { x: '0%' }, '-=0.8')
        .fromTo(firstContestant.children[0], { width: '0', padding: '0' }, { width: '250', padding: '0 1.5em' }, 1)
        .fromTo(secondContestant.children[0], { width: '0', padding: '0' }, { width: '250', padding: '0 1.5em' }, '-=0.8')
        .fromTo(firstContestant.children[1], { width: '0' }, { width: '150' }, '+=1')
        .fromTo(secondContestant.children[1], { width: '0' }, { width: '150' }, '-=0.8');
    }
  }, [timer]);

  return (
    <div className={styles.timer} ref={timer}>
      <Clock />
      {contestants.map(
        ({
          color, id, lastName, rank,
        }, index) => (
          <Contestant
            color={color}
            id={id}
            key={id}
            lastName={lastName}
            isSecond={index > 0}
            rank={rank}
          />
        ),
      )}
    </div>
  );
}

export default Timer;
