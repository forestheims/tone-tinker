import { useState } from 'react';
import styles from './Sequencer.css';
import { useSequence } from '../../context/sequence';

export default function Sequencer() {
  const [pads, setPads] = useState(Array.from(Array(32).keys()));
  const { currentSequenece } = useSequence();
  console.log(pads);
  return (
    <div className={styles.sequencer}>
      {pads.map((pd) => (
        <button key={pd} className={styles.pad}></button>
      ))}
    </div>
  );
}
