import React, { useState } from 'react';
import { PipelineControlPanel } from '../organisms/PipelineControlPanel';

export const TestDashboardPage: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'running' | 'success' | 'failure'>('idle');
  const [stdinValue, setStdinValue] = useState<string>('');
  const [logs, setLogs] = useState<string[]>([]);

  const handleTrigger = () => {
    setStatus('running');
    setLogs((prev) => [...prev, 'Starting E2E test pipeline...', `Input payload: ${stdinValue}`]);
    
    // Simulate pipeline execution
    setTimeout(() => {
      const isSuccess = Math.random() > 0.3; // Random success/failure for demo
      setStatus(isSuccess ? 'success' : 'failure');
      setLogs((prev) => [
        ...prev,
        isSuccess ? 'Pipeline completed successfully.' : 'Pipeline failed.',
      ]);
    }, 2000);
  };

  const handleStdinChange = (value: string) => {
    setStdinValue(value);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">
          Final E2E Test Pipeline Dashboard
        </h1>
        <PipelineControlPanel
          status={status}
          stdinValue={stdinValue}
          onStdinChange={handleStdinChange}
          onTrigger={handleTrigger}
          logs={logs}
        />
      </div>
    </div>
  );
};
