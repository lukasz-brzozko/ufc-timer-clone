import Countdown, { zeroPad } from 'react-countdown';
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
      {zeroPad(minutes, 1)}
      :
      {zeroPad(seconds, 2)}
    </span>
  );

  return (
    <div className={styles.clock}>
      <UFCLogo className={styles.ufcLogo} />
      <Countdown
        date={Date.now() + 5 * 60 * 1000}
        renderer={renderer}
      />
    </div>
  );
}

export default Clock;
