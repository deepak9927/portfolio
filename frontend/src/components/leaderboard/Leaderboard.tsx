'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { getLeaderboard } from '../../lib/api';
import { LeaderboardEntry } from '../../lib/types';
import { RefreshCw } from 'lucide-react';
import { Button } from '../ui/button';

const Leaderboard: React.FC = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLeaderboardData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getLeaderboard();
      setLeaderboard(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch leaderboard.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboardData();

    const handleQuizSubmission = () => {
      fetchLeaderboardData();
    };

    window.addEventListener('quizSubmitted', handleQuizSubmission);

    return () => {
      window.removeEventListener('quizSubmitted', handleQuizSubmission);
    };
  }, []);

  if (loading) {
    return (
      <Card className="w-full max-w-md mx-auto bg-codedex-900/90 border-codedex-500/50 backdrop-blur-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-codedex-400 to-codedex-200 bg-clip-text text-transparent">
            Loading Leaderboard...
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-xl text-white">Please wait while we fetch the scores.</p>
          <div className="w-8 h-8 border-4 border-codedex-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full max-w-md mx-auto bg-codedex-900/90 border-codedex-500/50 backdrop-blur-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-codedex-400 to-codedex-200 bg-clip-text text-transparent">
            Error
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-xl text-red-400">{error}</p>
          <Button onClick={fetchLeaderboardData} className="w-full bg-gradient-to-r from-codedex-500 to-codedex-300 hover:from-codedex-600 hover:to-codedex-400 text-white font-semibold">
            <RefreshCw className="mr-2 h-4 w-4" /> Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto bg-codedex-900/90 border-codedex-500/50 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-3xl font-bold bg-gradient-to-r from-codedex-400 to-codedex-200 bg-clip-text text-transparent">
          Leaderboard
        </CardTitle>
        <Button variant="ghost" size="icon" onClick={fetchLeaderboardData} disabled={loading}>
          <RefreshCw className="h-4 w-4 text-codedex-400" />
        </Button>
      </CardHeader>
      <CardContent>
        {leaderboard.length === 0 ? (
          <p className="text-center text-codedex-300">No scores yet. Be the first to play!</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="border-codedex-700">
                <TableHead className="text-codedex-300">Rank</TableHead>
                <TableHead className="text-codedex-300">User</TableHead>
                <TableHead className="text-right text-codedex-300">Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaderboard.map((entry, index) => (
                <TableRow key={entry.userId} className="border-codedex-800 hover:bg-codedex-800/50">
                  <TableCell className="font-medium text-white">{index + 1}</TableCell>
                  <TableCell className="text-codedex-200">{entry.username}</TableCell>
                  <TableCell className="text-right text-white">{entry.score}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default Leaderboard;
