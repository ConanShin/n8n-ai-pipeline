import React from 'react';

export interface LogViewerProps {
  logs: string[];
}

export const LogViewer: React.FC<LogViewerProps> = ({ logs }) => {
  return (
    <div
      className="block bg-gray-900 text-green-400 p-4 rounded h-64 overflow-y-auto font-mono text-xs"
      role="log"
      aria-label="Test execution logs"
    >
      {logs.map((log, index) => (
        <div key={index} className="whitespace-pre-wrap">
          {log}
        </div>
      ))}
    </div>
  );
};
