import React, { useState, useEffect, useRef, useReducer } from "react";

interface FormData {
  name: string;
  email: string;
  message: string;
}

type Action = 
  | { type: 'SET_NAME'; payload: string }
  | { type: 'SET_EMAIL'; payload: string }
  | { type: 'SET_MESSAGE'; payload: string }
  | { type: 'RESET' };

function formReducer(state: FormData, action: Action): FormData {
  switch (action.type) {
    case 'SET_NAME':
      return { ...state, name: action.payload };
    case 'SET_EMAIL':
      return { ...state, email: action.payload };
    case 'SET_MESSAGE':
      return { ...state, message: action.payload };
    case 'RESET':
      return { name: '', email: '', message: '' };
    default:
      return state;
  }
}

export default function About() {
  const [activeTab, setActiveTab] = useState('features');
  const [formData, dispatch] = useReducer(formReducer, { name: '', email: '', message: '' });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [timer, setTimer] = useState(0);
  const [showAnimation, setShowAnimation] = useState(false);
  
  // useRef - DOM manipulation
  const nameInputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // useEffect - Timer effect
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // useEffect - Animation effect
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowAnimation(true);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  // useEffect - Focus effect
  useEffect(() => {
    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('📝 Form submitted:', formData);
    setIsFormSubmitted(true);
    dispatch({ type: 'RESET' });
    
    setTimeout(() => {
      setIsFormSubmitted(false);
    }, 3000);
  };

  const scrollToTop = () => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const tabs = [
    { id: 'features', label: 'Features', icon: '🚀' },
    { id: 'architecture', label: 'Architecture', icon: '🏗️' },
    { id: 'contact', label: 'Contact', icon: '📧' },
    { id: 'demo', label: 'Demo', icon: '🎮' }
  ];

  return (
    <div className="about-page bg-gray-50 min-h-screen">
      <div ref={scrollRef} className="container mx-auto p-6">
        <h1 className="text-4xl font-bold mb-6 text-center">
          About NodePlus Framework
        </h1>

        {/* Timer Display */}
        <div className="mb-6 p-4 bg-blue-100 rounded text-center">
          <p className="text-lg">
            ⏱️ Page loaded for: <span className="font-bold text-blue-600">{timer}</span> seconds
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="flex border-b">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 font-medium ${
                  activeTab === tab.id 
                    ? 'border-b-2 border-blue-500 text-blue-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          {activeTab === 'features' && (
            <div className={`transition-all duration-500 ${showAnimation ? 'opacity-100' : 'opacity-0'}`}>
              <h2 className="text-2xl font-bold mb-4">🚀 Key Features</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-4 border rounded">
                  <h3 className="font-bold mb-2">TypeScript Support</h3>
                  <p>Full TypeScript integration with type safety</p>
                </div>
                <div className="p-4 border rounded">
                  <h3 className="font-bold mb-2">Decorator-based Routing</h3>
                  <p>Clean and intuitive route definitions</p>
                </div>
                <div className="p-4 border rounded">
                  <h3 className="font-bold mb-2">JSX Server-side Rendering</h3>
                  <p>React components rendered on the server</p>
                </div>
                <div className="p-4 border rounded">
                  <h3 className="font-bold mb-2">Modern MVC Architecture</h3>
                  <p>Clean separation of concerns</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'architecture' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">🏗️ Architecture</h2>
              <div className="space-y-4">
                <div className="p-4 bg-gray-100 rounded">
                  <h3 className="font-bold">Controllers</h3>
                  <p>Handle HTTP requests and return JSX views</p>
                </div>
                <div className="p-4 bg-gray-100 rounded">
                  <h3 className="font-bold">Views</h3>
                  <p>React components that render the UI</p>
                </div>
                <div className="p-4 bg-gray-100 rounded">
                  <h3 className="font-bold">Hydration</h3>
                  <p>Automatic client-side hydration for interactivity</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'contact' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">📧 Contact Form Test</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name:</label>
                  <input
                    ref={nameInputRef}
                    type="text"
                    value={formData.name}
                    onChange={(e) => dispatch({ type: 'SET_NAME', payload: e.target.value })}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email:</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => dispatch({ type: 'SET_EMAIL', payload: e.target.value })}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Message:</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => dispatch({ type: 'SET_MESSAGE', payload: e.target.value })}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={4}
                    placeholder="Your message..."
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
                >
                  Send Message
                </button>
              </form>
              
              {isFormSubmitted && (
                <div className="mt-4 p-4 bg-green-100 border border-green-400 rounded">
                  <p className="text-green-700">✅ Message sent successfully!</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'demo' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">🎮 Interactive Demo</h2>
              <div className="space-y-4">
                <div className="p-4 border rounded">
                  <h3 className="font-bold mb-2">React Hooks Test</h3>
                  <p>This page demonstrates various React features:</p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>✅ useState - Form state management</li>
                    <li>✅ useReducer - Complex state logic</li>
                    <li>✅ useEffect - Side effects and timers</li>
                    <li>✅ useRef - DOM manipulation</li>
                    <li>✅ Event handlers - Form submission</li>
                    <li>✅ Conditional rendering - Tab content</li>
                  </ul>
                </div>
                
                <div className="p-4 border rounded">
                  <h3 className="font-bold mb-2">Navigation Test</h3>
                  <button
                    onClick={scrollToTop}
                    className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
                  >
                    Scroll to Top
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="mt-8 text-center">
          <a 
            href="/" 
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          >
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  );
} 