"use client"
import React from "react";
import TSExample from "../components/TSExample";

export default function TypeScriptTutorialPage(): React.JSX.Element {
  return (
    <main style={{padding: 24, fontFamily: 'Inter, system-ui, -apple-system'}}>
      <h1>TypeScript with React (practical)</h1>

      <section style={{marginTop: 12}}>
        <p>
          This short page demonstrates how to use TypeScript with React in a Next.js app: typed props, state,
          and API responses. It includes a small interactive example and links to authoritative docs.
        </p>
      </section>

      <section style={{marginTop: 16}}>
        <TSExample />
      </section>

      <section style={{marginTop: 20}}>
        <h2>Further reading</h2>
        <ul>
          <li><a href="https://www.typescriptlang.org/docs/" target="_blank" rel="noopener noreferrer">TypeScript official docs</a></li>
          <li><a href="https://react-typescript-cheatsheet.netlify.app/" target="_blank" rel="noopener noreferrer">React + TypeScript Cheatsheet</a></li>
          <li><a href="https://nextjs.org/docs/basic-features/typescript" target="_blank" rel="noopener noreferrer">Next.js TypeScript docs</a></li>
        </ul>
      </section>

      <footer style={{marginTop: 32, color: '#444'}}>
        <small>Examples are intentionally small — adapt and expand for your app's types and APIs.</small>
      </footer>
    </main>
  );
}
