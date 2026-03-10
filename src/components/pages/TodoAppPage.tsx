import React, { useState } from 'react';
import { Todo } from '../../types';
import { TodoInput } from '../molecules/TodoInput';
import { TodoList } from '../organisms/TodoList';

export const TodoAppPage: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleAdd = (text: string) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text,
      completed: false
    };
    setTodos([newTodo, ...todos]);
  };

  const handleToggle = (id: string) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const handleDelete = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <main 
      className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4"
      role="main"
      aria-label="Todo Application"
    >
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg border border-gray-100">
        <header className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-800">간단한 투두 앱</h1>
        </header>
        
        <TodoInput onAdd={handleAdd} />
        <TodoList 
          todos={todos} 
          onToggle={handleToggle} 
          onDelete={handleDelete} 
        />
      </div>
    </main>
  );
};