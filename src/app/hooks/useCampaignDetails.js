'use client'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export function useCampaignDetails(id) {
  return useQuery({
    queryKey: ['campaign', id],
    queryFn: async () => {
      if (!id) throw new Error('Campaign ID is required');
      const { data } = await axios.get(`/api/campaigns/${id}?include_donors=true`);
      return data;
    },
    enabled: !!id,
  });
} 