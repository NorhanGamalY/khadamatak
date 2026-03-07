import { useQuery } from '@tanstack/react-query';
import {
  getDashboardStats,
  getRecentActivities,
} from './api';

export function useDashboardStats() {
  return useQuery({
    queryKey: ['dashboard', 'stats'],
    queryFn: getDashboardStats,
    staleTime: 1000 * 60,
  });
}

export function useRecentActivites(){
    return useQuery({
        queryKey: ['dashboard', 'activities'],
        queryFn: getRecentActivities,
        staleTime: 1000 * 60,
    })
}

export function useCraftsmen(){
  return useQuery({
    queryKey: ['dashboard', 'craftsmen'],
    queryFn: getRecentActivities,
  })
}

