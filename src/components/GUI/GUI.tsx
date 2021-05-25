import { useState } from 'react';
import { CirclePicker, ColorResult } from 'react-color';
import DatGui, {
  DatBoolean, DatFolder, DatNumber, DatSelect, DatString,
} from 'react-dat-gui';
import {
  diff, updatedDiff,
} from 'deep-object-diff';
import { constants } from 'node:os';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import COLORS from '../../constants/colors';
import { selectClockTime } from '../../features/clock/clockSlice';
import { selectMessage } from '../../features/info/infoSlice';
import { selectActiveRound, selectRoundsCount } from '../../features/roundCounter/roundCounterSlice';
import { ContestantType, selectContestants } from '../../features/timer/timerSlice';

import 'react-dat-gui/dist/index.css';
import styles from './GUI.module.scss';

function GUI(): JSX.Element {
  const dispatch = useAppDispatch();
  const roundTime = useAppSelector(selectClockTime);
  const infoMessage = useAppSelector(selectMessage);
  const activeRound = useAppSelector(selectActiveRound);
  const roundsCount = useAppSelector(selectRoundsCount);
  const contestants = useAppSelector(selectContestants);

  const data: RootState = {
    clock: { minutes: roundTime },
    info: { message: infoMessage },
    roundCounter: { activeRound, rounds: roundsCount },
    timer: { contestants },
  };

  const [color, setColor] = useState('#2FA1D6');

  const colors = COLORS.map((colorElement) => colorElement.code);
  const cardStyles: React.CSSProperties = {
    backgroundColor: '#fff2',
    justifyContent: 'space-evenly',
    margin: 0,
    marginLeft: '-4px',
    padding: '10px',
    paddingLeft: 'auto',
    paddingRight: 'auto',
  };

  const handleSwatchHover = (targetColor: ColorResult, event: MouseEvent) => {
    const target = COLORS.find((colorEl) => colorEl.code === targetColor.hex);
    if (target !== undefined) {
      const targetElement = event.target as HTMLDivElement;
      if (targetElement.title !== target.name) targetElement.title = target.name;
    }
  };

  const generateContestantsFolders = ({ id }: ContestantType, index: number) => {
    const conditionalRankElement = data.timer.contestants[index].champion === false
      ? <DatNumber label="Rank" path={`timer.contestants[${index}].rank`} min={1} max={15} step={1} />
      : <></>;

    return (

      <DatFolder
        closed={false}
        key={id}
        title={`Contender ${id}`}
      >
        <DatString label="Name" path={`timer.contestants[${index}].lastName`} />
        <DatBoolean label="Champion" path={`timer.contestants[${index}].champion`} />
        {conditionalRankElement}
        <DatFolder title="Trunk Color" closed>
          <CirclePicker
            onSwatchHover={handleSwatchHover}
            colors={colors}
            className={styles.circlePicker}
            circleSpacing={10}
            circleSize={25}
            styles={{
              default: {
                card: cardStyles,
              },
            }}
            width="104%"
          />
        </DatFolder>
      </DatFolder>
    );
  };

  const handleUpdate = (newData: RootState) => {
    const diffs = updatedDiff(data, newData);
    console.log(newData);
    console.log(diffs);
  };

  return (
    <DatGui className={styles.gui} data={data} labelWidth="50%" liveUpdate={false} onUpdate={handleUpdate}>
      {contestants.map(generateContestantsFolders)}

      <DatFolder title="Fight options" closed={false}>
        <DatNumber label="Round time (minutes)" path="clock.minutes" min={1} max={5} step={1} />
        <DatNumber label="Rounds" path="roundCounter.rounds" min={1} max={5} step={1} />
        <DatNumber label="Actual Round" path="roundCounter.activeRound" min={1} max={5} step={1} />
        <DatSelect label="Bout" path="info.message" options={['Lightweight', 'Bantamweight']} />
      </DatFolder>
    </DatGui>
  );
}

export default GUI;
