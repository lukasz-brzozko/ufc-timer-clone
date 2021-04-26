import { useState } from 'react';

interface ContestantProps {
  color: string;
  contestantName: string;
  rank: number | 'C' | null;
}

function Contestant({ color, contestantName, rank }: ContestantProps): JSX.Element {
  const [name, setName] = useState(contestantName);
  const [ranking, setRanking] = useState(rank);
  const [actualColor, setActualColor] = useState(color);

  return (
    <div>
      <span>{ranking}</span>
      <span>{name}</span>
      <span>{actualColor}</span>
    </div>
  );
}

export default Contestant;
