import { createContext, useContext, useEffect, useState } from 'react';
import * as Tone from 'tone';

const KeyboardContext = createContext();

export function KeyboardProvider({ children }) {
  // let tones = {
  //   C4: new Tone.Synth().toDestination(),
  //   'C#4': new Tone.Synth().toDestination(),
  //   D4: new Tone.Synth().toDestination(),
  //   'D#4': new Tone.Synth().toDestination(),
  //   E4: new Tone.Synth().toDestination(),
  //   F4: new Tone.Synth().toDestination(),
  //   'F#4': new Tone.Synth().toDestination(),
  //   G4: new Tone.Synth().toDestination(),
  //   'G#4': new Tone.Synth().toDestination(),
  //   A4: new Tone.Synth().toDestination(),
  //   'A#4': new Tone.Synth().toDestination(),
  //   B4: new Tone.Synth().toDestination(),
  // };

  useEffect(() => {
    // const oldKeys = Object.keys(tones);
    // console.log(oldKeys);
    // console.log(newKeys);
    // const newObject = {};
    // for (let i = 0; i < oldKeys.length; i++) {
    //   const newKey = newKeys[i];
    //   const oldKey = oldKeys[i];
    //   newObject[newKey] = tones[oldKey];
    //   console.log(newKey);
    //   // delete tones[oldKey];
    //   tones = newObject;
    // }
  }, []);

  const contextValue = {};

  return (
    <KeyboardContext.Provider value={contextValue}>
      {children}
    </KeyboardContext.Provider>
  );
}

export function useKeyboard() {
  const context = useContext(KeyboardContext);
  if (context === undefined) {
    throw new Error(
      'Error: useKeyboard needs to be called within a KeyboardProvider'
    );
  }
  return context;
}
