import React, { useState } from "react";

interface HomeProps {
  initialData?: any;
}

export default function Home({ initialData }: HomeProps) {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
    console.log("adicionado + 1");
  };

  return (
    <div className="home-page bg-red-500">
      <h1>Welcome to NodePlus {initialData?.name}</h1>
      <p>This is a modern MVC framework with JSX rendering!</p>
      <p>Count: {count}</p>
      <button onClick={handleClick}>Click me</button>
      <div className="features">
        <h2>Key Features</h2>
        <ul>
          <li>🚀 TypeScript support</li>
          <li>🎯 Decorator-based routing</li>
          <li>⚛️ JSX server-side rendering</li>
          <li>🏗️ Modern MVC architecture</li>
          <li>🔧 Express.js integration</li>
        </ul>
      </div>
      <div className="cta">
        <h2>Get Started</h2>
        <p>Explore the example pages to see NodePlus in action:</p>
        <div className="buttons">
          <a href="/about" className="btn">
            Learn More
          </a>
          <a href="/users" className="btn">
            View Users
          </a>
        </div>
      </div>
    </div>
  );
}
