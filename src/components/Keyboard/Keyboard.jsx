import styles from './Keyboard.css';
import * as Tone from 'tone';
// import { useKeyboard } from '../../context/keyboard';
import { useEffect, useState } from 'react';

export default function Keyboard() {
  const [octave, setOctave] = useState(4);

  const [tones, setTones] = useState({
    KeyA: new Tone.Synth().toDestination(),
    KeyW: new Tone.Synth().toDestination(),
    KeyS: new Tone.Synth().toDestination(),
    KeyE: new Tone.Synth().toDestination(),
    KeyD: new Tone.Synth().toDestination(),
    KeyF: new Tone.Synth().toDestination(),
    KeyT: new Tone.Synth().toDestination(),
    KeyG: new Tone.Synth().toDestination(),
    KeyY: new Tone.Synth().toDestination(),
    KeyH: new Tone.Synth().toDestination(),
    KeyU: new Tone.Synth().toDestination(),
    KeyJ: new Tone.Synth().toDestination(),
  });

  const [unlock, setUnlock] = useState(false);

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

  useEffect(() => {
    const start = () => {
      const cFour = document.getElementById('KeyA');
      const event = new Event('click', cFour);
      window.dispatchEvent(event);
    };
    start();
  }, []);

  function playTone(i, toneToPlay) {
    tones[i].triggerAttack(toneToPlay);
  }

  async function handleKeyboardMouseDown(e) {
    console.log(e);
    if (e.code !== undefined) {
      for (let i = 0; i < keys.length; i++) {
        if (keys[i] === e.code && !e.repeat) {
          playTone(e.code, currentKeys[i]);
          console.log(e.target);
        }
      }
      const playedNote = document.getElementById(e.code);
      playedNote.classList.add(styles.active);
    } else {
      playTone(e.target.id, e.target.value);
      e.target.classList.add(styles.active);
    }
  }

  function handleKeyboardMouseUp(e) {
    if (e.code !== undefined) {
      for (let i = 0; i < keys.length; i++) {
        if (keys[i] === e.code) {
          tones[e.code].triggerRelease();
        }
      }
      const playedNote = document.getElementById(e.code);
      playedNote.classList.remove(styles.active);
    } else {
      tones[e.target.id].triggerRelease();
      e.target.classList.remove(styles.active);
    }
  }

  function octaveUp() {
    const newKeys = currentKeys.map((tn) => {
      const string = tn.split('');
      string.pop();
      string.push(octave + 1);
      return string.join('');
    });
    setOctave(octave + 1);
    setCurrentKeys(newKeys);
  }

  function octaveDown() {
    const newKeys = currentKeys.map((tn) => {
      const string = tn.split('');
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
      {currentKeys.map((currentKey, index) => {
        return (
          <button
            className={currentKey.length === 2 ? styles.key : styles.sharpKey}
            key={currentKey}
            value={currentKey}
            id={keys[index]}
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
