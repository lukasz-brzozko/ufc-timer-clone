import styles from './Round.module.scss';

function Round() {
  return (
    <div className={styles.roundContainer}>
      <div className={styles.roundWrapper}>
        <span className={`${styles.round} ${styles.roundComplete}`} />
      </div>
      <div className={styles.roundWrapper}>
        <span className={`${styles.round} ${styles.roundActive}`} />
      </div>
      <div className={styles.roundWrapper}>
        <span className={`${styles.round}`} />
      </div>
    </div>
  );
}

export default Round;
