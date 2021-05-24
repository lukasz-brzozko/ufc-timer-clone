import { useState } from 'react';
import DatGui, {
  DatBoolean, DatFolder, DatNumber, DatSelect, DatString,
} from 'react-dat-gui';
import { CirclePicker, ColorResult } from 'react-color';
import COLORS from '../../constants/colors';

import 'react-dat-gui/dist/index.css';
import styles from './GUI.module.scss';

function GUI(): JSX.Element {
  const [color, setColor] = useState('#2FA1D6');

  const data = {
    color,
  };

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

  const handleUpdate = ({ color: chosenColor }: { color: string }) => {
    console.log(chosenColor);
    setColor(chosenColor);
  };

  const handleSwatchHover = (targetColor: ColorResult, event: MouseEvent) => {
    const target = COLORS.find((colorEl) => colorEl.code === targetColor.hex);
    if (target !== undefined) {
      const targetElement = event.target as HTMLDivElement;
      if (targetElement.title !== target.name) targetElement.title = target.name;
    }
  };

  return (
    <DatGui data={data} onUpdate={handleUpdate} className={styles.gui} labelWidth="50%">
      <DatFolder title="Contender 1" closed={false}>
        <DatString label="Name" path="name" />
        <DatBoolean label="Champion" path="champion" />
        <DatNumber label="Rank" path="rank" min={15} max={15} step={1} />
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
      <DatFolder title="Fight options" closed={false}>
        <DatSelect label="Round time (minutes)" path="roundTime" options={[1, 2, 3, 4, 5]} />
        <DatSelect label="Rounds" path="rounds" options={[1, 2, 3, 4, 5]} />
        <DatNumber label="Actual Round" path="actualRound" min={1} max={5} step={1} />
        <DatSelect label="Bout" path="bout" options={['Lightweight']} />
      </DatFolder>
    </DatGui>
  );
}

export default GUI;
