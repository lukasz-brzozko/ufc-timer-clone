import { useState } from 'react';

import { ContestantType } from '../../timerSlice';

import styles from './Contestant.module.scss';

type ContestantModifier = {
  isSecond: boolean
};
type ContestantProps = ContestantType & ContestantModifier;

function Contestant({
  color, isSecond, lastName, rank,
}: ContestantProps): JSX.Element {
  const [name, setName] = useState(lastName);
  const [ranking, setRanking] = useState(rank);
  const [actualColor, setActualColor] = useState(color);
  const modifierClass = isSecond ? ` ${styles.colorSignSecond}` : '';

  return (
    <div className={styles.contestant}>
      <div className={styles.container}>
        <span className={styles.rank}>{ranking}</span>
        <span className={styles.name}>{name}</span>
        <span className={`${styles.colorSign}${modifierClass}`} />
      </div>
      <div className={styles.color}>
        <span className={styles.colorText}>{actualColor}</span>
      </div>
    </div>
  );
}

export default Contestant;
