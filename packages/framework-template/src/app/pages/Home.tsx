import React, { useState, useEffect, useCallback, useMemo } from "react";

interface HomeProps {
  initialData?: any;
}

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function Home({ initialData }: HomeProps) {
  const [count, setCount] = useState(0);
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: "Learn NodePlus", completed: false },
    { id: 2, text: "Build amazing apps", completed: false },
    { id: 3, text: "Master React hydration", completed: false }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [showSecret, setShowSecret] = useState(false);

  // useEffect - Side effects
  useEffect(() => {
    console.log("🔄 Home component mounted!");
    document.title = `Home - ${initialData?.name || 'NodePlus'}`;
    
    return () => {
      console.log("🧹 Home component will unmount");
    };
  }, [initialData?.name]);

  useEffect(() => {
    console.log(`📊 Count changed to: ${count}`);
  }, [count]);

  // useCallback - Memoized functions
  const handleClick = useCallback(() => {
    setCount(prev => prev + 1);
    console.log("🎯 Button clicked!");
  }, []);

  const addTodo = useCallback(() => {
    if (inputValue.trim()) {
      setTodos(prev => [...prev, {
        id: Date.now(),
        text: inputValue,
        completed: false
      }]);
      setInputValue("");
    }
  }, [inputValue]);

  const toggleTodo = useCallback((id: number) => {
    setTodos(prev => prev.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  }, []);

  const deleteTodo = useCallback((id: number) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }, []);

  // useMemo - Memoized values
  const completedTodos = useMemo(() => 
    todos.filter(todo => todo.completed).length, [todos]
  );

  const totalTodos = useMemo(() => todos.length, [todos]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const toggleSecret = () => {
    setShowSecret(prev => !prev);
  };

  return (
    <div className={`home-page min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50'}`}>
      <div className="container mx-auto p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6 text-gray-800 text-center">
            Welcome to NodePlus {initialData?.name}
          </h1>
          
          {/* Counter Section */}
          <div className="mb-8 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">🎯 Counter Test kkkk</h2>
            <div className="flex items-center gap-4">
              <p className="text-lg text-gray-600">Count: <span className="font-bold text-blue-600">{count}</span></p>
              <button 
                onClick={handleClick}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Increment Counter
              </button>
            </div>
          </div>

          {/* Todo List Section */}
          <div className="mb-8 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">📝 Todo List Test</h2>
            <div className="mb-4 flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Add new todo..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                onKeyPress={(e) => e.key === 'Enter' && addTodo()}
              />
              <button 
                onClick={addTodo}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Add
              </button>
            </div>
            
            <div className="mb-4">
              <span className="text-sm text-gray-600">
                Progress: {completedTodos}/{totalTodos} completed
              </span>
            </div>
            
            <ul className="space-y-2">
              {todos.map(todo => (
                <li key={todo.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-md">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                    className="mr-2 text-blue-600"
                  />
                  <span className={`flex-1 ${todo.completed ? 'line-through text-gray-500' : 'text-gray-700'}`}>
                    {todo.text}
                  </span>
                  <button 
                    onClick={() => deleteTodo(todo.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    🗑️
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Theme Toggle */}
          <div className="mb-8 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">🎨 Theme Test</h2>
            <button 
              onClick={toggleTheme}
              className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
            >
              Toggle Theme ({theme})
            </button>
          </div>

          {/* Secret Section */}
          <div className="mb-8 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">🔐 Conditional Rendering Test</h2>
            <button 
              onClick={toggleSecret}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              {showSecret ? 'Hide' : 'Show'} Secret
            </button>
            {showSecret && (
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-md">
                <h3 className="font-bold text-blue-800 mb-2">🎉 Secret Revealed!</h3>
                <p className="text-blue-700 mb-2">React hydration is working perfectly!</p>
                <p className="text-blue-700 mb-2">All hooks are functioning correctly:</p>
                <ul className="list-disc list-inside mt-2 text-blue-700">
                  <li>✅ useState</li>
                  <li>✅ useEffect</li>
                  <li>✅ useCallback</li>
                  <li>✅ useMemo</li>
                  <li>✅ Event handlers</li>
                  <li>✅ Conditional rendering</li>
                </ul>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">🚀 Get Started</h2>
            <p className="mb-4 text-gray-600">Explore the example pages to see NodePlus in action:</p>
            <div className="flex gap-4">
              <a href="/about" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
                About Page
              </a>
              <a href="/users" className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition-colors">
                Users Page
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
