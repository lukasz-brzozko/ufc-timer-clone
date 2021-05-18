import gsap from 'gsap';
import { useEffect, useRef } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectContestants, update } from './timerSlice';
import { setMessage } from '../info/infoSlice';

import Clock from './subcomponents/Clock';
import Contestant from './subcomponents/Contestant';

import styles from './Timer.module.scss';

function Timer(): JSX.Element {
  const contestants = useAppSelector(selectContestants);
  const dispatch = useAppDispatch();
  const timer = useRef<HTMLDivElement>(null);

  const firstContestant = useRef<HTMLDivElement>(null);
  const firstContestantColor = useRef<HTMLDivElement>(null);
  const firstContestantColorSign = useRef<HTMLSpanElement>(null);
  const firstContestantColorText = useRef<HTMLSpanElement>(null);
  const firstContestantText = useRef<HTMLDivElement>(null);
  const firstContestantTextBlock = useRef<HTMLDivElement>(null);

  const secondContestant = useRef<HTMLDivElement>(null);
  const secondContestantColor = useRef<HTMLDivElement>(null);
  const secondContestantColorSign = useRef<HTMLSpanElement>(null);
  const secondContestantColorText = useRef<HTMLSpanElement>(null);
  const secondContestantText = useRef<HTMLDivElement>(null);
  const secondContestantTextBlock = useRef<HTMLDivElement>(null);

  const blink = () => {
    const tl = gsap.timeline({ defaults: { duration: '0.6' } });
    tl
      .addLabel('blinking')
      .to([firstContestantColorSign.current, secondContestantColorSign.current], { autoAlpha: '0', duration: '0.07' }, 'blinking')
      .to([firstContestantColorSign.current, secondContestantColorSign.current], { autoAlpha: '1', duration: '0.07' })
      .to([firstContestantColorSign.current, secondContestantColorSign.current], { autoAlpha: '0', duration: '0.07' })
      .to([firstContestantColorSign.current, secondContestantColorSign.current], { autoAlpha: '1', duration: '0.07' });

    return tl;
  };

  const showContestants = () => {
    const tl = gsap.timeline({ defaults: { duration: '0.6' } })
      // move in contestant names
      .fromTo(firstContestantTextBlock.current, { padding: '0', width: '0' }, { padding: '0 1.5em', width: '250' })
      .fromTo(secondContestantTextBlock.current, { padding: '0', width: '0' }, { padding: '0 1.5em', width: '250' }, '-=0.6')
      // move in color signs
      .fromTo(firstContestantColorSign.current, { width: '8', x: '-250' }, {
        duration: '0.4',
        ease: 'expo.out',
        width: '100%',
        x: '0',
      })
      .to(firstContestantColorSign.current, { duration: '0.4', width: '8' })
      .fromTo(secondContestantColorSign.current, { width: '8', x: '250' }, {
        duration: '0.4',
        ease: 'expo.out',
        width: '100%',
        x: '0',
      }, '-=0.8')
      .to(secondContestantColorSign.current, { duration: '0.4', width: '8' }, '-=0.4')
      // meanwhile, show contestants' names
      .fromTo(firstContestantText.current, { autoAlpha: '0' }, { duration: '0.1', autoAlpha: '1' }, '-=0.4')
      .fromTo(firstContestantText.current, { x: '-5%' }, { ease: 'power1.out', duration: '0.8', x: '0%' }, '-=0.4')
      .fromTo(secondContestantText.current, { autoAlpha: '0' }, { duration: '0.1', autoAlpha: '1' }, '-=0.8')
      .fromTo(secondContestantText.current, { x: '5%' }, { ease: 'power1.out', duration: '0.8', x: '0%' }, '-=0.8');
    return tl;
  };

  const hideTrunkColors = () => {
    const tl = gsap.timeline({ defaults: { duration: '0.4', ease: 'power1.inOut' } });
    tl
      .addLabel('hideColors')
      .to(firstContestantColorText.current, { x: '200%' }, 'hideColors')
      .to(firstContestantColor.current, { x: '100%' }, 'hideColors+=0.2')
      .to(firstContestantColorSign.current, { width: '8', x: '150' }, 'hideColors+=0.2')
      .to(firstContestantColor.current, { width: '0' }, 'hideColors+=0.4')
      .to(firstContestantColorSign.current, { x: '0' }, 'hideColors+=0.4')

      .to(secondContestantColorText.current, { x: '-200%' }, 'hideColors')
      .to(secondContestantColor.current, { x: '-100%' }, 'hideColors+=0.2')
      .to(secondContestantColorSign.current, { width: '8', x: '-150' }, 'hideColors+=0.2')
      .to(secondContestantColor.current, { width: '0' }, 'hideColors+=0.4')
      .to(secondContestantColorSign.current, { x: '0' }, 'hideColors+=0.4');

    return tl;
  };

  const showTrunkColors = () => {
    const tl = gsap.timeline({ defaults: { duration: '0.6' } });
    tl
      .addLabel('showColors')
      .to(firstContestantColorSign.current, { duration: '0.2', width: '158', x: '150' }, 'showColors')
      .fromTo(firstContestantColor.current, { width: '0', x: '100%' }, { duration: '0.4', ease: 'power1.inOut', width: '150' }, 'showColors+=0.4')
      .to(firstContestantColor.current, { duration: '0.4', x: '0' }, 'showColors+=0.8')
      .fromTo(firstContestantColorText.current, { x: '100%' }, { duration: '0.4', ease: 'power1.inOut', x: '0' }, 'showColors+=1')
      .to(secondContestantColorSign.current, { duration: '0.2', width: '158', x: '-150' }, 'showColors')
      .fromTo(secondContestantColor.current, { width: '0', x: '-100%' }, { duration: '0.4', ease: 'power1.inOut', width: '150' }, 'showColors+=0.4')
      .to(secondContestantColor.current, { duration: '0.4', x: '0' }, 'showColors+=0.8')
      .fromTo(secondContestantColorText.current, { x: '-100%' }, { duration: '0.4', ease: 'power1.inOut', x: '0' }, 'showColors+=1');

    return tl;
  };

  useEffect(() => {
    const master = gsap.timeline({
      defaults: { duration: 0.6 },
      id: 'master',
      // paused: true,
    });

    const hideLogoWrapperBackground = gsap.getById('hideLogoWrapperBackground');
    const showBoutInfo = gsap.getById('showBoutInfo');
    const showCountdown = gsap.getById('showCountdown');
    const showClock = gsap.getById('showClock');
    const showCurrentRound = gsap.getById('showCurrentRound');
    const showLogo = gsap.getById('showLogo');
    const showLogoWrapperBackground = gsap.getById('showLogoWrapperBackground');
    const showRounds = gsap.getById('showRounds');
    const showTrunkInfo = gsap.getById('showTrunkInfo');

    master
      .add(showClock)
      .add(showRounds, '<+0.5')
      .add(showCurrentRound, 'showCurrentRound')
      .add(hideLogoWrapperBackground, '<-0.1')
      .add(showLogo, 'showCurrentRound+=1.8')
      .add(showContestants(), '<')
      .add(showLogoWrapperBackground, '<')
      .add(showCountdown, '>-0.5')
      .add(blink(), 'blink+=0.5')
      .add(showTrunkColors(), 'showTrunkColors')
      .add(showTrunkInfo, '<+1')
      .add(hideTrunkColors(), 'hideTrunkColors-=0.4')
      .add(showBoutInfo);
  }, []);

  return (
    <>
      <div className={styles.timer} ref={timer}>
        <Clock />
        {contestants.map(
          ({
            champion, color, id, lastName, rank,
          }, index) => (
            <Contestant
              champion={champion}
              color={color}
              id={id}
              key={id}
              lastName={lastName}
              isSecond={index > 0}
              rank={rank}
              refContestant={index > 0 ? secondContestant : firstContestant}
              refColor={index > 0 ? secondContestantColor : firstContestantColor}
              refColorSign={index > 0 ? secondContestantColorSign : firstContestantColorSign}
              refColorText={index > 0 ? secondContestantColorText : firstContestantColorText}
              refText={index > 0 ? secondContestantText : firstContestantText}
              refTextBlock={index > 0 ? secondContestantTextBlock : firstContestantTextBlock}
            />
          ),
        )}
      </div>
    </>
  );
}

export default Timer;
