import React from "react";

export default function About() {
  return (
    <div className="about-page">
      <h1>About NodePlus</h1>
      <p>NodePlus is a powerful MVC framework that combines the best of Express.js with modern React JSX rendering.</p>
      
      <div className="tech-stack">
        <h2>Technology Stack</h2>
        <ul>
          <li><strong>Backend:</strong> Node.js + Express.js</li>
          <li><strong>Frontend:</strong> React + JSX</li>
          <li><strong>Language:</strong> TypeScript</li>
          <li><strong>Architecture:</strong> MVC Pattern</li>
          <li><strong>Routing:</strong> Decorator-based</li>
        </ul>
      </div>
      
      <div className="benefits">
        <h2>Why NodePlus?</h2>
        <ul>
          <li>✅ Full-stack TypeScript development</li>
          <li>✅ Server-side JSX rendering</li>
          <li>✅ Declarative routing with decorators</li>
          <li>✅ Modern development experience</li>
          <li>✅ Easy to learn and use</li>
        </ul>
      </div>
    </div>
  );
} 