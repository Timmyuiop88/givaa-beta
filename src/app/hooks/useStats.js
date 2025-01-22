import { useQuery } from '@tanstack/react-query';

export function useStats() {
  return useQuery({
    queryKey: ['userStats'],
    queryFn: async () => {
      const res = await fetch('/api/stats');
      if (!res.ok) {
        throw new Error('Failed to fetch stats');
      }
      return res.json();
    },
    refetchInterval: 30000, // Refetch every 30 seconds
  });
}

export function useCampaignStats(campaignId) {
  return useQuery({
    queryKey: ['campaignStats', campaignId],
    queryFn: async () => {
      const res = await fetch(`/api/campaigns/${campaignId}/stats`);
      if (!res.ok) {
        throw new Error('Failed to fetch campaign stats');
      }
      return res.json();
    },
    enabled: !!campaignId,
  });
} 