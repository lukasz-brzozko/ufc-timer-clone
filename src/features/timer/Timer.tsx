import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectContestants, update } from './timerSlice';

import Contestant from './subcomponents/Contestant';

function Timer(): JSX.Element {
  const contestants = useAppSelector(selectContestants);

  return (
    <>
      <div>
        Timer
      </div>
      {contestants.map(
        ({
          color, id, name, rank,
        }) => (
          <Contestant
            color={color}
            contestantName={name}
            key={id}
            rank={rank}
          />
        ),
      )}
    </>
  );
}

export default Timer;
