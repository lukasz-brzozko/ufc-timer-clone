import { selectActiveRound, selectRoundsCounter } from '../../../roundCounter/roundCounterSlice';
import { useAppSelector } from '../../../../app/hooks';

import styles from './Round.module.scss';

function Round(): JSX.Element {
  const { rounds } = useAppSelector(selectRoundsCounter);
  const activeRound = useAppSelector(selectActiveRound);
  const roundsArr: JSX.Element[] = [];

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
    <div className={styles.roundContainer}>
      {roundsArr}
    </div>
  );
}

export default Round;
