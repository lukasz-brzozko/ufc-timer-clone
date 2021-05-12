import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectMessage, setMessage } from './infoSlice';

import styles from './Info.module.scss';

function Info(): JSX.Element {
  const infoMessage = useAppSelector(selectMessage);

  return (
    <div className={styles.infoBox}>
      <span className={styles.info}>{infoMessage}</span>
    </div>
  );
}

export default Info;
