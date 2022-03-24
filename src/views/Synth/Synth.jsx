import React, { useEffect } from 'react';
import Controls from '../../components/Controls/Controls';
import Keyboard from '../../components/Keyboard/Keyboard';
import Sequencer from '../../components/Sequencer/Sequencer';
import { KeyboardProvider } from '../../context/keyboard';
import { SequenceProvider } from '../../context/sequence';

export default function Synth() {
  return (
    <KeyboardProvider>
      <SequenceProvider>
        <Controls />
        <Sequencer />
        <Keyboard />
      </SequenceProvider>
    </KeyboardProvider>
  );
}
