import gsap from 'gsap';
import { useCallback, useEffect, useRef } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  InfoType, selectBout, selectMessage, setMessage,
} from './infoSlice';
import BOUTS from '../../constants/bouts';
import INFOTEXT from '../../constants/infoText';
import styles from './Info.module.scss';

interface CustomTimelineParams {
  id: string;
  duration: number;
  text: InfoType
}

function Info(): JSX.Element {
  const dispatch = useAppDispatch();
  const currentBout = useAppSelector(selectBout);
  const infoMessage = useAppSelector(selectMessage);
  const refInfoBox = useRef<HTMLDivElement>(null);
  const refInfoText = useRef<HTMLSpanElement>(null);

  const timelineOptions: gsap.TimelineVars = {
    defaults: {
      duration: '0.4',
      ease: 'power1.inOut',
    },
  };

  const createTl = useCallback(({
    duration, id, text,
  }: CustomTimelineParams) => {
    const tl = gsap.timeline({ id, ...timelineOptions });

    if (Object.values(BOUTS).includes(text as BOUTS)) {
      tl.set(refInfoBox.current, { width: 'fit-content' });
    }

    tl
      .fromTo(refInfoBox.current, { rotateX: '90' }, { rotateX: '0' })
      .fromTo(refInfoText.current, { y: '200%' }, { y: '0' })
      .to(refInfoBox.current, { rotateX: '90' }, `+=${duration}`)
      .to(refInfoText.current, { y: '200%', duration: '0.4' }, '<')
      .eventCallback('onStart', () => {
        if (infoMessage !== text) {
          dispatch(setMessage(text));
        }
      });

    return tl;
  }, [refInfoBox, refInfoText]);

  const showTrunkInfo = useCallback((duration: number) => {
    const tl = createTl({ duration, id: 'showTrunkInfo', text: INFOTEXT.TRUNK_COLOR });

    return tl;
  }, [refInfoBox, refInfoText]);

  const showBoutInfo = useCallback((duration: number) => {
    const tl = createTl({ duration, id: 'showBoutInfo', text: currentBout });

    return tl;
  }, [refInfoBox, refInfoText]);

  useEffect(() => {
    showTrunkInfo(2);
    showBoutInfo(4);
  }, []);

  return (
    <div className={styles.infoBox} ref={refInfoBox}>
      <span className={styles.info} ref={refInfoText}>{infoMessage}</span>
    </div>
  );
}

export default Info;
