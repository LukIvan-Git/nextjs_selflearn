"use client"
import React, { useState } from "react";

export default function Counter(): React.JSX.Element {
  const [count, setCount] = useState<number>(0);

  return (
    <div style={{border: '1px solid #eee', padding: 12, borderRadius: 6}}>
      <p>Count: <strong>{count}</strong></p>
      <div style={{display: 'flex', gap: 8}}>
        <button onClick={() => setCount((c) => c + 1)}>Increment</button>
        <button onClick={() => setCount(0)}>Reset</button>
      </div>
      <div style={{marginTop: 8, fontSize: 13, color: '#444'}}>
        <p>Vue equivalent uses local data and methods; React uses <code>useState</code> and event handlers.</p>
      </div>
    </div>
  );
}
