import { createContext, useContext, useState } from 'react';

const KeyboardContext = createContext();

export function KeyboardProvider({ children }) {
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

  const contextValue = { octave, setOctave, tones, setTones };

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
