import React from "react";

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

export default function Layout({ children, title = "NodePlus" }: LayoutProps) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title}</title>
        <style>{`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f5f5f5;
          }
          
          .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
          }
          
          .header {
            background: #2c3e50;
            color: white;
            padding: 1rem 0;
            margin-bottom: 2rem;
          }
          
          .header .container {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          
          .nav a {
            color: white;
            text-decoration: none;
            margin-left: 1rem;
            padding: 0.5rem 1rem;
            border-radius: 4px;
            transition: background-color 0.3s;
          }
          
          .nav a:hover {
            background-color: #34495e;
          }
          
          .main-content {
            background: white;
            padding: 2rem;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          }
          
          h1 {
            color: #2c3e50;
            margin-bottom: 1rem;
          }
          
          h2 {
            color: #34495e;
            margin-bottom: 0.5rem;
          }
          
          .users-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 1rem;
            margin: 2rem 0;
          }
          
          .user-card {
            border: 1px solid #ddd;
            padding: 1rem;
            border-radius: 8px;
            background: #f9f9f9;
          }
          
          .user-actions {
            margin-top: 1rem;
          }
          
          .user-actions a, .user-actions button {
            display: inline-block;
            padding: 0.5rem 1rem;
            margin-right: 0.5rem;
            text-decoration: none;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 0.9rem;
          }
          
          .user-actions a {
            background: #3498db;
            color: white;
          }
          
          .user-actions button {
            background: #e74c3c;
            color: white;
          }
          
          .add-user {
            margin-top: 2rem;
            padding: 1rem;
            border: 1px solid #ddd;
            border-radius: 8px;
            background: #f9f9f9;
          }
          
          .add-user form {
            display: flex;
            gap: 1rem;
            align-items: end;
          }
          
          .add-user input {
            padding: 0.5rem;
            border: 1px solid #ddd;
            border-radius: 4px;
            flex: 1;
          }
          
          .add-user button {
            padding: 0.5rem 1rem;
            background: #27ae60;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
          }
          
          .user-detail {
            max-width: 600px;
          }
          
          .user-info {
            background: #f9f9f9;
            padding: 1rem;
            border-radius: 8px;
            margin: 1rem 0;
          }
        `}</style>
      </head>
      <body>
        <header className="header">
          <div className="container">
            <h1>NodePlus</h1>
            <nav className="nav">
              <a href="/">Home</a>
              <a href="/about">About</a>
              <a href="/users">Users</a>
            </nav>
          </div>
        </header>
        
        <main className="container">
          <div className="main-content">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
} 