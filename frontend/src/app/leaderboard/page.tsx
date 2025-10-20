'use client';

import React from 'react';
import Leaderboard from '../../components/leaderboard/Leaderboard';

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-codedex-950 via-codedex-900 to-codedex-950 p-4">
      <Leaderboard />
    </div>
  );
}
