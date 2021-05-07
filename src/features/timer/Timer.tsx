import gsap from 'gsap';
import { useEffect, useRef } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectContestants, update } from './timerSlice';

import Clock from './subcomponents/Clock';
import Contestant from './subcomponents/Contestant';

import clockStyles from './subcomponents/Clock/Clock.module.scss';
import contestantStyles from './subcomponents/Contestant/Contestant.module.scss';
import styles from './Timer.module.scss';

function Timer(): JSX.Element {
  const contestants = useAppSelector(selectContestants);
  const timer = useRef<HTMLDivElement>(null);

  const firstContestant = useRef<HTMLDivElement>(null);
  const firstContestantColor = useRef<HTMLDivElement>(null);
  const firstContestantColorSign = useRef<HTMLDivElement>(null);
  const firstContestantText = useRef<HTMLDivElement>(null);
  const firstContestantTextBlock = useRef<HTMLDivElement>(null);

  const secondContestant = useRef<HTMLDivElement>(null);
  const secondContestantColor = useRef<HTMLDivElement>(null);
  const secondContestantColorSign = useRef<HTMLDivElement>(null);
  const secondContestantText = useRef<HTMLDivElement>(null);
  const secondContestantTextBlock = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const defaultDuration = 0.6;
    const tl = gsap.timeline({ defaults: { duration: defaultDuration } });

    tl
      // move in contestant names
      .fromTo(firstContestantTextBlock.current, { padding: '0', width: '0' }, { padding: '0 1.5em', width: '250' }, '1')
      .fromTo(secondContestantTextBlock.current, { padding: '0', width: '0' }, { padding: '0 1.5em', width: '250' }, `-=${defaultDuration}`)
      // move in color signs
      .fromTo(firstContestantColorSign.current, { width: '8', x: '-250' }, {
        duration: '0.4',
        ease: 'expo.out',
        width: '100%',
        x: '0',
      }, '+=1')
      .to(firstContestantColorSign.current, { duration: '0.4', width: '8' })
      .fromTo(secondContestantColorSign.current, { width: '8', x: '250' }, {
        duration: '0.4',
        ease: 'expo.out',
        width: '100%',
        x: '0',
      }, '-=0.8')
      .to(secondContestantColorSign.current, { duration: '0.4', width: '8' }, '-=0.4')

      // show trunk colors
      .fromTo(firstContestantColor.current, { width: '0' }, { width: '150' }, '+=1')
      .fromTo(secondContestantColor.current, { width: '0' }, { width: '150' }, `-=${defaultDuration}`)
      .to(firstContestantColor.current, { width: '0' }, '+=1')
      .to(secondContestantColor.current, { width: '0' }, `-=${defaultDuration}`);
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
            refContestant={index > 0 ? secondContestant : firstContestant}
            refColor={index > 0 ? secondContestantColor : firstContestantColor}
            refColorSign={index > 0 ? secondContestantColorSign : firstContestantColorSign}
            refText={index > 0 ? secondContestantText : firstContestantText}
            refTextBlock={index > 0 ? secondContestantTextBlock : firstContestantTextBlock}
          />
        ),
      )}
    </div>
  );
}

export default Timer;
