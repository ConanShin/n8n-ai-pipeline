import React, { useState, useEffect } from 'react';
import { ScoreboardTemplate } from '../templates';
import { ScoreboardHeader, ScoreboardTable, ScoreboardFooter, ScoreboardTeamData } from '../organisms';

export interface ScoreboardPageProps {
  gameId: string;
}

type PageState = 'loading' | 'scheduled' | 'live' | 'final' | 'error';

export const ScoreboardPage: React.FC<ScoreboardPageProps> = ({ gameId }) => {
  const [pageState, setPageState] = useState<PageState>('loading');
  const [gameData, setGameData] = useState<any>(null);

  const fetchGameData = () => {
    setPageState('loading');
    // Mock API Call
    setTimeout(() => {
      // Mock Data
      const mockData = {
        gameStatus: 'live',
        currentInning: 6,
        inningHalf: 'bottom',
        gameDate: '2026.03.12',
        venue: '잠실야구장',
        broadcastChannel: 'MBC Sports',
        lastUpdated: '14:35 기준',
        homeTeam: {
          name: 'LG 트윈스',
          shortName: 'LG',
          initials: 'LG',
          teamColor: '#C70039',
          scores: [0, 1, 0, 2, 0, null, null, null, null],
          totalRuns: 3,
          hits: 5,
          errors: 0,
          walks: 2,
        },
        awayTeam: {
          name: '키움 히어로즈',
          shortName: '키움',
          initials: 'KW',
          teamColor: '#800000',
          scores: [0, 0, 0, 0, 1, 0, null, null, null],
          totalRuns: 1,
          hits: 3,
          errors: 1,
          walks: 1,
        },
      };
      setGameData(mockData);
      setPageState(mockData.gameStatus as PageState);
    }, 1000);
  };

  useEffect(() => {
    fetchGameData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameId]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (pageState === 'live') {
      interval = setInterval(() => {
        // Mock polling
        console.log('Polling for updates...');
      }, 30000);
    }
    return () => clearInterval(interval);
  }, [pageState]);

  if (pageState === 'error') {
    return (
      <div className="flex-col items-center min-h-screen bg-gray-950 px-4 sm:px-6 py-6 sm:py-10 flex">
        <div className="w-full max-w-3xl mb-4 flex items-center justify-between">
          <button
            role="button"
            aria-label="경기 목록으로 돌아가기"
            className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-200 transition-colors"
          >
            ← 경기 목록
          </button>
          <span className="text-xs text-gray-600">KBO 리그</span>
        </div>
        <div className="w-full max-w-3xl flex flex-col items-center justify-center gap-4 py-20">
          <span className="text-5xl">⚾</span>
          <p className="text-gray-400 text-center">경기 정보를 불러올 수 없습니다.</p>
          <button
            role="button"
            aria-label="경기 데이터 다시 불러오기"
            onClick={fetchGameData}
            className="px-6 py-2 rounded-xl bg-gray-700 hover:bg-gray-600 text-gray-200 text-sm font-semibold transition-colors"
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  const isLoading = pageState === 'loading';

  return (
    <div
      role="main"
      aria-label="야구 경기 스코어보드 페이지"
      lang="ko"
      className="flex flex-col items-center min-h-screen bg-gray-950 px-4 sm:px-6 py-6 sm:py-10"
    >
      <div className="w-full max-w-3xl mb-4 flex items-center justify-between">
        <button
          role="button"
          aria-label="경기 목록으로 돌아가기"
          className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-200 transition-colors"
        >
          ← 경기 목록
        </button>
        <span className="text-xs text-gray-600">KBO 리그</span>
      </div>

      <ScoreboardTemplate
        isLoading={isLoading}
        header={
          gameData ? (
            <ScoreboardHeader
              homeTeam={gameData.homeTeam}
              awayTeam={gameData.awayTeam}
              gameStatus={gameData.gameStatus}
              currentInning={gameData.currentInning}
              inningHalf={gameData.inningHalf}
              venue={gameData.venue}
              gameDate={gameData.gameDate}
            />
          ) : (
            <div className="h-[140px] bg-gray-900 border-b border-gray-800" />
          )
        }
        table={
          gameData ? (
            <ScoreboardTable
              homeTeam={gameData.homeTeam}
              awayTeam={gameData.awayTeam}
              currentInning={gameData.currentInning}
              gameStatus={gameData.gameStatus}
              totalInnings={9}
            />
          ) : (
            <div className="h-[120px] bg-gray-900" />
          )
        }
        footer={
          gameData ? (
            <ScoreboardFooter
              lastUpdated={gameData.lastUpdated}
              broadcastChannel={gameData.broadcastChannel}
            />
          ) : (
            <div className="h-[48px] bg-gray-900 rounded-b-2xl" />
          )
        }
      />
    </div>
  );
};
