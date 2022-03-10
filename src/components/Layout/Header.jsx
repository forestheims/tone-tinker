import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header>
      <Link to="/synth">Synth</Link>
      <Link to="/">Home</Link>
    </header>
  );
}
