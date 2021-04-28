import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectContestants, update } from './timerSlice';

import Clock from './subcomponents/Clock';
import Contestant from './subcomponents/Contestant';

import styles from './Timer.module.scss';

function Timer(): JSX.Element {
  const contestants = useAppSelector(selectContestants);

  return (
    <div className={styles.timer}>
      <Clock />
      {contestants.map(
        ({
          color, id, lastName, rank,
        }) => (
          <Contestant
            color={color}
            id={id}
            key={id}
            lastName={lastName}
            rank={rank}
          />
        ),
      )}
    </div>
  );
}

export default Timer;
