import React, { useEffect } from 'react';
import Controls from '../../components/Controls/Controls';
import Keyboard from '../../components/Keyboard/Keyboard';
import Sequencer from '../../components/Sequencer/Sequencer';

export default function Synth() {
  return (
    <>
      <Controls />
      <Sequencer />
      <Keyboard />
    </>
  );
}
