import styles from './Keyboard.css';
import * as Tone from 'tone';
import { useState } from 'react';

export default function Keyboard() {
  const [octave, setOctave] = useState(4);
  const [tones, setTones] = useState([
    'C4',
    'C#4',
    'D4',
    'D#4',
    'E4',
    'F4',
    'F#4',
    'G4',
    'G#4',
    'A4',
    'A#4',
    'B4',
  ]);

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
            onMouseUp={(e) => handleKeyboardMouseUp(e)}
          >
            {tn}
          </button>
        );
      })}
    </div>
  );
}
