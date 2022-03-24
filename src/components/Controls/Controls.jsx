import { useSequence } from '../../context/sequence';
import styles from './Controls.css';

export default function Controls() {
  const {
    playSequencer,
    pauseSequencer,
    recordSequencer,
    stopSequencer,
    saveSequence,
  } = useSequence();

  return (
    <div className={styles.controls}>
      <div className={styles.sequencerControls}>
        <button onClick={playSequencer}>Play</button>
        <button onClick={pauseSequencer}>Pause</button>
        <button onClick={recordSequencer}>Record</button>
        <button onClick={stopSequencer}>Stop</button>
        <button onClick={saveSequence}>Save</button>
      </div>
    </div>
  );
}
