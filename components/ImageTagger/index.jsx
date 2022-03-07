import { Component } from "react/cjs/react.development";

export default function Home() {
  return (
    <main>
      <h1> hi</h1>

      <style jsx>{`
        .icon {
          margin-right: calc(var(--spacing) * 2);
        }
        .heroContent {
          background-color: var(--paper);
          padding: calc(var(--spacing) * 8) 0 calc(var(--spacing) * 6);
        }
        .heroButtons {
          margin-top: calc(var(--spacing) * 4);
        }
      `}</style>
    </main>
  );
}
