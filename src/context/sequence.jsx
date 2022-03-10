import { createContext, useContext, useReducer } from 'react';

const SequenceContext = createContext();

export function SequenceProvider({ children }) {
  // start

  const sequenceReducer = (sequence, { type, payload }) => {
    switch (type) {
      case 'add':
        return [];
      case 'delete':
        return [];
      case 'edit':
        return [];
      case 'stop':
        return [];
      case 'save':
        return [];
      default:
        throw new Error('reducer does not have a type case for that action');
    }
  };

  const [currentSequence, dispatch] = useReducer(
    sequenceReducer,
    Array(32).fill(0)
  );

  const playSequencer = () => {
    dispatch({
      type: 'play',
    });
  };

  const pauseSequencer = () => {
    dispatch({
      type: 'pause',
    });
  };

  const recordSequencer = () => {
    dispatch({
      type: 'record',
    });
  };

  const stopSequencer = () => {
    dispatch({
      type: 'stop',
    });
  };

  const saveSequence = () => {
    dispatch({
      type: 'save',
    });
  };

  // end
  const contextValue = {
    playSequencer,
    pauseSequencer,
    recordSequencer,
    stopSequencer,
    saveSequence,
    currentSequence,
  };

  return (
    <SequenceContext.Provider value={contextValue}>
      {children}
    </SequenceContext.Provider>
  );
}

export function useSequence() {
  const context = useContext(SequenceContext);
  if (context === undefined) {
    throw new Error(
      'Error: useSequence needs to be called within a SequenceProvider'
    );
  }
  return context;
}
