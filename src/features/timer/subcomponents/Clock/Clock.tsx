import Countdown, { zeroPad } from 'react-countdown';

import Info from '../../../info/Info';
import RoundCounter from '../RoundCounter';
import { ReactComponent as UFCLogo } from '../../../../assets/ufc-logo.svg';

import styles from './Clock.module.scss';

interface RendererProps {
  hours: number;
  minutes: number;
  seconds: number;
}

function Clock(): JSX.Element {
  const renderer = ({ minutes, seconds }: RendererProps) => (
    <span className={styles.time}>
      <span className={styles.minutes}>{zeroPad(minutes, 1)}</span>
      <span className={styles.separator}>:</span>
      <span className={styles.seconds}>{zeroPad(seconds, 2)}</span>
    </span>
  );

  return (
    <div className={styles.clock}>
      <Info />
      <UFCLogo className={styles.ufcLogo} />
      <Countdown
        date={Date.now() + 5 * 60 * 1000}
        renderer={renderer}
      />
      <RoundCounter />
    </div>
  );
}

export default Clock;
