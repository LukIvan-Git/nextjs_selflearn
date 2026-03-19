"use client"
import React from "react";
import PropsExample from "./components/PropsExample";
import Counter from "./components/Counter";
import FormExample from "./components/FormExample";

export default function TutorialPage(): React.JSX.Element {
  return (
    <main className="tutorial" style={{padding: 24, fontFamily: 'Inter, system-ui, -apple-system'}}>
      <h1>Next.js + React (TypeScript) tutorial for Vue/Laravel devs</h1>

      <section style={{marginTop: 20}}>
        <h2>Why React / Next.js?</h2>
        <p>
          Next.js uses React and TypeScript to build fast apps with server and client components.
          Below are small examples that map common Vue concepts (components, props, reactive data) to React.
        </p>
      </section>

      <section style={{marginTop: 20}}>
        <h2>1 — Props (like Vue props)</h2>
        <p>
          In Vue you'd pass props to a component. In React you pass properties (props) to functional components.
        </p>
        <PropsExample title="Hello from parent" count={3} />
      </section>

      <section style={{marginTop: 20}}>
        <h2>2 — Local state (like Vue reactive data)</h2>
        <p>React uses hooks such as <code>useState</code> to manage local state in components.</p>
        <Counter />
      </section>

      <section style={{marginTop: 20}}>
        <h2>3 — Controlled form (like v-model)</h2>
        <p>
          Controlled inputs keep the value in React state and update it on change — similar to Vue's <code>v-model</code>.
        </p>
        <FormExample />
      </section>

      <footer style={{marginTop: 40, color: '#444'}}>
        <small>Run the dev server and open <strong>/tutorial</strong> in your browser.</small>
      </footer>
    </main>
  );
}
