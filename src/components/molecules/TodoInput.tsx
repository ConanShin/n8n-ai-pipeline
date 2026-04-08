import React, { useState } from 'react';

export interface TodoInputProps {
  onAdd: (text: string) => void;
}

export const TodoInput: React.FC<TodoInputProps> = ({ onAdd }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text.trim());
      setText('');
    }
  };

  const isEmpty = text.trim().length === 0;

  return (
    <form 
      onSubmit={handleSubmit} 
      className="flex gap-2 w-full mb-6" 
      role="form" 
      aria-label="Add new todo form"
    >
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new todo..."
        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
      />
      <button
        type="submit"
        disabled={isEmpty}
        className={`px-4 py-2 text-white font-medium rounded-lg transition-colors ${
          isEmpty ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
        }`}
      >
        Add
      </button>
    </form>
  );
};