import React from 'react';
import { Todo } from '../../types';
import { TodoItem } from '../molecules/TodoItem';

export interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TodoList: React.FC<TodoListProps> = ({ todos, onToggle, onDelete }) => {
  if (todos.length === 0) {
    return (
      <div 
        className="flex flex-col w-full gap-2 p-8 text-center text-gray-500 border-2 border-dashed border-gray-200 rounded-lg"
        role="list"
        aria-label="List of todos"
      >
        <p>No todos yet. Add one above!</p>
      </div>
    );
  }

  return (
    <ul 
      className="flex flex-col w-full gap-2"
      role="list"
      aria-label="List of todos"
    >
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
};