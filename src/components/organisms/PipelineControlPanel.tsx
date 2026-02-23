import React from 'react';
import { StatusBadge, StatusBadgeProps } from '../atoms/StatusBadge';
import { StdinInput, StdinInputProps } from '../atoms/StdinInput';
import { TriggerButton, TriggerButtonProps } from '../atoms/TriggerButton';
import { LogViewer, LogViewerProps } from '../molecules/LogViewer';

export interface PipelineControlPanelProps {
  status: StatusBadgeProps['status'];
  stdinValue: StdinInputProps['value'];
  onStdinChange: StdinInputProps['onChange'];
  onTrigger: TriggerButtonProps['onClick'];
  logs: LogViewerProps['logs'];
}

export const PipelineControlPanel: React.FC<PipelineControlPanelProps> = ({
  status,
  stdinValue,
  onStdinChange,
  onTrigger,
  logs,
}) => {
  const isRunning = status === 'running';

  return (
    <div className="flex flex-col gap-4 p-6 bg-white shadow-md rounded-lg max-w-2xl mx-auto">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Pipeline Control</h2>
        <StatusBadge status={status} />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Standard Input
        </label>
        <StdinInput value={stdinValue} onChange={onStdinChange} />
      </div>

      <div>
        <TriggerButton disabled={isRunning} onClick={onTrigger} />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Execution Logs
        </label>
        <LogViewer logs={logs} />
      </div>
    </div>
  );
};
