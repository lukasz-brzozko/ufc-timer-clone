import { useState } from 'react';

import { ContestantType } from '../timerSlice';

import styles from './Contestant.module.scss';

type ContestantProps = ContestantType;

function Contestant({ color, lastName, rank }: ContestantProps): JSX.Element {
  const [name, setName] = useState(lastName);
  const [ranking, setRanking] = useState(rank);
  const [actualColor, setActualColor] = useState(color);

  return (
    <div className={styles.contestant}>
      <div className={styles.textContainer}>
        <span className={styles.rank}>{ranking}</span>
        <span className={styles.name}>{name}</span>
      </div>
      <div className={styles.color}>
        <span className={styles.colorText}>{actualColor}</span>
      </div>
    </div>
  );
}

export default Contestant;
