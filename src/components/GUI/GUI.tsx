import { updatedDiff } from 'deep-object-diff';
import { ColorResult } from 'react-color';
import DatGui, {
  DatBoolean, DatFolder, DatNumber, DatSelect, DatString,
} from 'react-dat-gui';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import BOUTS from '../../constants/bouts';
import COLORS from '../../constants/colors';
import { selectClockTime, setClockTime } from '../../features/clock/clockSlice';
import { selectBout, selectMessage, setBout } from '../../features/info/infoSlice';
import {
  selectActiveRound, selectRoundsCount, setRoundCounter,
} from '../../features/roundCounter/roundCounterSlice';
import {
  ContestantType, selectContestants, setContestantsColors, updateContestants,
} from '../../features/timer/timerSlice';
import CustomColorPicker from '../CustomColorPicker';

import 'react-dat-gui/dist/index.css';
import styles from './GUI.module.scss';

function GUI(): JSX.Element {
  const TARGET_INDEX_SELECTOR = '[data-index]';

  const dispatch = useAppDispatch();
  const bouts = Object.values(BOUTS);
  const activeRound = useAppSelector(selectActiveRound);
  const contestants = useAppSelector(selectContestants);
  const currentBout = useAppSelector(selectBout);
  const infoMessage = useAppSelector(selectMessage);
  const roundsCount = useAppSelector(selectRoundsCount);
  const roundTime = useAppSelector(selectClockTime);

  const data: RootState = {
    clock: { minutes: roundTime },
    info: { bout: currentBout, message: infoMessage },
    roundCounter: { activeRound, rounds: roundsCount },
    timer: { contestants },
  };

  const colorEntries = Object.values(COLORS);
  const colors = colorEntries.map((colorElement) => colorElement.code);
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
    const target = colorEntries.find((colorEl) => colorEl.code === targetColor.hex);
    if (target !== undefined) {
      const targetElement = event.target as HTMLDivElement;
      if (targetElement.title !== target.name) targetElement.title = target.name;
    }
  };

  const handleColorChange = (color: ColorResult, event: React.ChangeEvent<HTMLInputElement>) => {
    const parentTarget = event.target.closest(TARGET_INDEX_SELECTOR) as HTMLElement;
    const targetIndex = parentTarget?.dataset.index;
    if (targetIndex !== undefined) {
      const parsedTargetIndex = parseInt(targetIndex, 10);
      const payload = {
        color: color.hex,
        targetIndex: parsedTargetIndex,
      };
      console.log(payload);

      dispatch(setContestantsColors(payload));
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
        title={`Contender ${index + 1}`}
      >
        <DatString label="Name" path={`timer.contestants[${index}].lastName`} />
        <DatBoolean label="Champion" path={`timer.contestants[${index}].champion`} />
        {conditionalRankElement}
        <DatFolder title="Trunk Color" closed>
          <CustomColorPicker
            onSwatchHover={handleSwatchHover}
            colors={colors}
            className={styles.circlePicker}
            circleSpacing={10}
            circleSize={25}
            index={index}
            styles={{
              default: {
                card: cardStyles,
              },
            }}
            width="104%"
            onChange={handleColorChange}
          />
        </DatFolder>
      </DatFolder>
    );
  };

  const handleUpdate = (newData: RootState) => {
    const diffs = updatedDiff(data, newData);
    console.log(diffs);
    const [changedProperty] = Object.keys(diffs);
    switch (changedProperty) {
      case 'timer':
        dispatch(updateContestants(newData.timer.contestants));
        break;
      case 'clock':
        dispatch(setClockTime(newData.clock.minutes));
        break;
      case 'info':
        dispatch(setBout(newData.info.bout));
        break;
      case 'roundCounter':
        dispatch(setRoundCounter(newData.roundCounter));
        break;

      default:
        break;
    }
  };

  return (
    <DatGui className={styles.gui} data={data} labelWidth="40%" onUpdate={handleUpdate} style={{ zIndex: 100 }}>
      {contestants.map(generateContestantsFolders)}

      <DatFolder title="Fight options" closed={false}>
        <DatNumber label="Round time (min)" path="clock.minutes" min={1} max={5} step={1} />
        <DatNumber label="Rounds" path="roundCounter.rounds" min={1} max={5} step={1} />
        <DatNumber label="Actual Round" path="roundCounter.activeRound" min={1} max={roundsCount} step={1} />
        <DatSelect label="Category" path="info.bout" options={bouts} />
      </DatFolder>
    </DatGui>
  );
}

export default GUI;
