import styles from './Keyboard.css';
import * as Tone from 'tone';
import { useKeyboard } from '../../context/keyboard';
import { useEffect, useState } from 'react';

export default function Keyboard() {
  const [octave, setOctave] = useState(4);
  const [tones, setTones] = useState(
    Array(12).fill(new Tone.Synth().toDestination())
  );
  const [unlock, setUnlock] = useState(false);
  const [fired, setFired] = useState(Array(12).fill(false));
  const [currentKeys, setCurrentKeys] = useState([
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

  useEffect(() => {}, [setOctave]);

  // const synth ;
  function playTone(i, toneToPlay) {
    tones[i].triggerAttack(toneToPlay);
  }

  const keys = [
    'KeyA',
    'KeyW',
    'KeyS',
    'KeyE',
    'KeyD',
    'KeyF',
    'KeyT',
    'KeyG',
    'KeyY',
    'KeyH',
    'KeyU',
    'KeyJ',
  ];

  function handleKeyboardMouseDown(e) {
    if (e.code !== undefined) {
      const newFired = [];
      for (let i = 0; i < keys.length; i++) {
        if (keys[i] === e.code && !fired[i]) {
          newFired.push(true);
          playTone(i, currentKeys[i]);
        } else {
          if (fired[i] === false) {
            newFired.push(false);
          } else {
            newFired.push(true);
          }
        }
      }
      setFired(newFired);
    } else {
      let newI = 0;
      const newer = currentKeys.map((key) => {
        if (key !== e.target.value) {
          newI = newI + 1;
        } else {
          return newI;
        }
      });
      playTone(newI, e.target.value);
    }
  }

  function handleKeyboardMouseUp(e) {
    if (e.code !== undefined) {
      const newFired = [];
      for (let i = 0; i < keys.length; i++) {
        if (keys[i] === e.code && fired[i]) {
          newFired.push(false);
          tones[i].triggerRelease();
        } else {
          if (fired[i] === false) {
            newFired.push(false);
          } else {
            newFired.push(true);
          }
        }
      }
      setFired(newFired);
    } else {
      let newI = 0;
      const newer = currentKeys.map((key) => {
        if (key !== e.target.value) {
          newI = newI + 1;
        } else {
          return newI;
        }
      });
      tones[newI].triggerRelease();
    }
  }

  function octaveUp() {
    const newKeys = currentKeys.map((tn) => {
      let string = tn.split('');
      string.pop();
      string.push(octave + 1);
      return string.join('');
    });
    setOctave(octave + 1);
    setCurrentKeys(newKeys);
  }

  function octaveDown() {
    const newKeys = currentKeys.map((tn) => {
      let string = tn.split('');
      string.pop();
      string.push(octave - 1);
      return string.join('');
    });
    setOctave(octave - 1);
    setCurrentKeys(newKeys);
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
      {currentKeys.map((currentKey) => {
        return (
          <button
            className={currentKey.length === 2 ? styles.key : styles.sharpKey}
            key={currentKey}
            value={currentKey}
            onMouseDown={(e) => handleKeyboardMouseDown(e)}
            onMouseOver={(e) => unlock && handleKeyboardMouseDown(e)}
            onMouseUp={(e) => handleKeyboardMouseUp(e)}
            onMouseLeave={(e) => handleKeyboardMouseUp(e)}
            onKeyDown={(e) => handleKeyboardMouseDown(e)}
            onKeyUp={(e) => handleKeyboardMouseUp(e)}
          >
            {currentKey}
          </button>
        );
      })}
    </div>
  );
}
