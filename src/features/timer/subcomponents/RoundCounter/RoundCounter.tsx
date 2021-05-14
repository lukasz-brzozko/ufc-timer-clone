import Round from '../Round';

import styles from './RoundCounter.module.scss';

function RoundCounter(): JSX.Element {
  return (
    <>
      <div className={styles.roundCounterWrapper}>
        <span className={styles.roundNumber}>Round 1</span>
      </div>
      <Round />
    </>
  );
}

export default RoundCounter;
