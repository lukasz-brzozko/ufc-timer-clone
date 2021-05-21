import React, { useState } from 'react';
import DatGui, {
  DatBoolean, DatColor, DatFolder, DatNumber, DatSelect, DatString,
} from 'react-dat-gui';
import { CirclePicker, CirclePickerProps } from 'react-color';

import 'react-dat-gui/dist/index.css';
import styles from './GUI.module.scss';

function GUI(): JSX.Element {
  const [color, setColor] = useState('#2FA1D6');

  const data = {
    color,
  };

  const handleUpdate = ({ color: chosenColor }: { color: string }) => {
    console.log(chosenColor);
    setColor(chosenColor);
  };
  return (
    <DatGui data={data} onUpdate={handleUpdate} className={styles.gui} labelWidth="50%">
      <DatFolder title="Contender 1" closed={false}>
        <DatString label="Name" path="name" />
        <DatBoolean label="Champion" path="champion" />
        <DatNumber label="Rank" path="rank" min={15} max={15} step={1} />
        <DatFolder title="Trunk Color" closed>
          <CirclePicker
            className={styles.circlePicker}
            circleSpacing={10}
            circleSize={25}
            styles={{
              default: {
                card: {
                  justifyContent: 'space-evenly', padding: '10px', paddingLeft: 'auto', paddingRight: 'auto', margin: 0, marginLeft: '-4px', backgroundColor: '#fff2',
                },
              },
            }}
            colors={['#131416',
              '#294790',
              '#b5a772',
              '#207744',
              '#8f020e',
              '#f8f6f9',
              '#e6d450']}
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
