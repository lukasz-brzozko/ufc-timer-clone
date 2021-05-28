import { useAppSelector } from '../../app/hooks';
import { ContestantType, selectContestants } from '../../features/timer/timerSlice';

import styles from './Contestant.module.scss';

type ContestantModifier = {
  isSecond: boolean
};

type ContestantRefs = {
  refContestant: React.RefObject<HTMLDivElement>
  refColor: React.RefObject<HTMLDivElement>
  refColorSign: React.RefObject<HTMLSpanElement>
  refColorText: React.RefObject<HTMLSpanElement>
  refText: React.RefObject<HTMLDivElement>
  refTextBlock: React.RefObject<HTMLDivElement>
};

type ContestantProps = ContestantModifier & ContestantRefs & Pick<ContestantType, 'id'>;

function Contestant({
  id,
  isSecond,
  refContestant,
  refColor,
  refColorSign,
  refColorText,
  refText,
  refTextBlock,
}: ContestantProps): JSX.Element {
  const contestants = useAppSelector(selectContestants);
  const properContestant = contestants.find((contestant) => contestant.id === id);

  const {
    champion, color: { code, name, textColor: text }, lastName, rank,
  } = properContestant as ContestantType;

  const textStyles = { color: text };
  const colorBlockStyles = { backgroundColor: code };

  const modifierClass = isSecond ? ` ${styles.colorSignSecond}` : '';
  const ranking = champion ? 'C' : rank;
  return (
    <div className={styles.contestant} ref={refContestant}>
      <div className={styles.container} ref={refTextBlock}>
        <div className={styles.textWrapper} ref={refText}>
          <span className={styles.rank}>{ranking}</span>
          <span className={styles.name}>{lastName}</span>
        </div>
        <span className={`${styles.colorSign}${modifierClass}`} ref={refColorSign} style={colorBlockStyles} />
      </div>
      <div className={styles.color} ref={refColor} style={colorBlockStyles}>
        <span
          className={styles.colorText}
          ref={refColorText}
          style={textStyles}
        >
          {name}

        </span>
      </div>
    </div>
  );
}

export default Contestant;
