import React from 'react';
import { HitRecordItem } from '../atoms/HitRecordItem';

export interface HitRecordListProps {
  records: Array<'homerun' | 'triple' | 'double' | 'single' | 'strike'>;
}

export const HitRecordList: React.FC<HitRecordListProps> = ({ records }) => {
  return (
    <div className="flex flex-col items-center gap-2 w-full max-w-md bg-gray-900/50 p-4 rounded-xl">
      <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-2">타격 기록</h3>
      <div className="flex items-center justify-center gap-6 w-full" role="list" aria-label="타격 기록 목록">
        {records.map((record, idx) => (
          <HitRecordItem key={idx} result={record} index={idx + 1} />
        ))}
        {records.length === 0 && <div className="text-gray-500 text-sm py-4">기록이 없습니다.</div>}
      </div>
    </div>
  );
};
