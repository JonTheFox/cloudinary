import { Component } from "react/cjs/react.development";

export default function Home() {
  return (
    <main>
      <h1>Image Tagger</h1>
      <div className="image-tagger-page">tagger</div>

      <style jsx>{`
        .image-tagger-page {
          height: 100vh;
          overflow: auto;
        }
      `}</style>
    </main>
  );
}
