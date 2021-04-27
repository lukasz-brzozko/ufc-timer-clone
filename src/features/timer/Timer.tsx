import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectContestants, update } from './timerSlice';

import Contestant from './subcomponents/Contestant';

function Timer(): JSX.Element {
  const contestants = useAppSelector(selectContestants);

  return (
    <div className="timer">
      <div className="clock">
        Timer
      </div>
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
