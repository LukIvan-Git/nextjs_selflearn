"use client"
import React from "react";

type Props = {
  title: string;
  count?: number;
};

export default function PropsExample({ title, count = 0 }: Props) {
  return (
    <div style={{border: '1px solid var(--muted)', padding: 12, borderRadius: 6, color: 'var(--foreground)', background: 'var(--background)'}}>
      <h3 style={{margin: 0}}>{title}</h3>
      <p style={{marginTop: 8}}>Received prop <strong>count</strong>: {count}</p>
      <div style={{fontSize: 13, color: 'var(--foreground)'}}>
        <p>
          Vue example: <code style={{background: 'var(--code-bg)', padding: '2px 6px', color: 'var(--foreground)'}}>&lt;MyComp :count="n" /&gt;</code>
        </p>
        <p>
          React example: <code style={{background: 'var(--code-bg)', padding: '2px 6px', color: 'var(--foreground)'}}>{'<MyComp count={n} />'}</code>
        </p>
      </div>
    </div>
  );
}
