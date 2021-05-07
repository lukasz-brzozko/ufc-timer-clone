import { useState } from 'react';

import { ContestantType } from '../../timerSlice';

import styles from './Contestant.module.scss';

type ContestantModifier = {
  isSecond: boolean
};

type ContestantRefs = {
  refContestant: React.RefObject<HTMLDivElement>
  refColor: React.RefObject<HTMLDivElement>
  refColorSign: React.RefObject<HTMLDivElement>
  refText: React.RefObject<HTMLDivElement>
  refTextBlock: React.RefObject<HTMLDivElement>
};

type ContestantProps = ContestantModifier & ContestantRefs & ContestantType;

function Contestant({
  color,
  isSecond,
  lastName,
  rank,
  refContestant,
  refColor,
  refColorSign,
  refText,
  refTextBlock,
}: ContestantProps): JSX.Element {
  const [name, setName] = useState(lastName);
  const [ranking, setRanking] = useState(rank);
  const [actualColor, setActualColor] = useState(color);
  const modifierClass = isSecond ? ` ${styles.colorSignSecond}` : '';

  return (
    <div className={styles.contestant} ref={refContestant}>
      <div className={styles.container} ref={refTextBlock}>
        <div className={styles.textWrapper} ref={refText}>
          <span className={styles.rank}>{ranking}</span>
          <span className={styles.name}>{name}</span>
        </div>
        <span className={`${styles.colorSign}${modifierClass}`} ref={refColorSign} />
      </div>
      <div className={styles.color} ref={refColor}>
        <span className={styles.colorText}>{actualColor}</span>
      </div>
    </div>
  );
}

export default Contestant;
