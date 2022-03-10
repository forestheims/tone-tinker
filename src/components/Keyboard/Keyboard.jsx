import styles from './Keyboard.css';
import * as Tone from 'tone';
import { useKeyboard } from '../../context/keyboard';
import { useState } from 'react';

export default function Keyboard() {
  const { tones, setTones, octave, setOctave } = useKeyboard();
  const [unlock, setUnlock] = useState(false);

  const synth = new Tone.Synth().toDestination();
  function playTone(toneToPlay) {
    synth.triggerAttack(toneToPlay);
  }

  function handleKeyboardMouseDown(e) {
    playTone(e.target.value);
  }

  function handleKeyboardMouseUp(e) {
    synth.triggerRelease();
  }

  function octaveUp() {
    setOctave(octave + 1);
    setTones(
      tones.map((tn) => {
        let string = tn.split('');
        string.pop();
        string.push(octave + 1);
        console.log('string', string.join(''));
        return string.join('');
      })
    );
  }

  function octaveDown() {
    setOctave(octave - 1);
    setTones(
      tones.map((tn) => {
        let string = tn.split('');
        string.pop();
        string.push(octave - 1);
        console.log('string', string.join(''));
        return string.join('');
      })
    );
  }

  return (
    <div className={styles.keyboard}>
      <div className={styles.octaves}>
        <button className={styles.octaveUp} onClick={octaveUp}>
          ^^^
        </button>
        <button className={styles.octaveUp} onClick={() => setUnlock(!unlock)}>
          ???
        </button>
        <button className={styles.octaveDown} onClick={octaveDown}>
          vvv
        </button>
      </div>
      {tones.map((tn) => {
        return (
          <button
            className={tn.length === 2 ? styles.key : styles.sharpKey}
            key={tn}
            value={tn}
            onMouseDown={(e) => handleKeyboardMouseDown(e)}
            onMouseOver={(e) => unlock && handleKeyboardMouseDown(e)}
            onMouseUp={(e) => handleKeyboardMouseUp(e)}
            onMouseLeave={(e) => handleKeyboardMouseUp(e)}
          >
            {tn}
          </button>
        );
      })}
    </div>
  );
}
