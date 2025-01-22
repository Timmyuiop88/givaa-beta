import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export function useCampaigns(filters = {}) {
  return useQuery({
    queryKey: ['campaigns', filters],
    queryFn: async () => {
      const searchParams = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) searchParams.append(key, value);
      });
      const res = await fetch(`/api/campaigns?${searchParams.toString()}`);
      if (!res.ok) throw new Error('Failed to fetch campaigns');
      return res.json();
    },
  });
}

export function useCreateCampaign() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (campaignData) => {
      const res = await fetch('/api/campaigns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(campaignData),
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to create campaign');
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['campaigns']);
    },
  });
}

export function useUpdateCampaign() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }) => {
      const res = await fetch(`/api/campaigns/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to update campaign');
      }
      
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['campaigns']);
    },
  });
}

export function useDeleteCampaign() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      const res = await fetch(`/api/campaigns/${id}`, {
        method: 'DELETE',
      });
      
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to delete campaign');
      }
      
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['campaigns']);
    },
  });
} 