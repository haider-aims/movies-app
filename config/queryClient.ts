import { QueryClient } from '@tanstack/react-query';
import NetInfo from '@react-native-community/netinfo';
import { onlineManager } from '@tanstack/react-query';
import { Platform } from 'react-native';

// Configure online status manager for React Native
onlineManager.setEventListener((setOnline: (online: boolean) => void) => {
  return NetInfo.addEventListener(state => {
    setOnline(!!state.isConnected);
  });
});

// Define custom types for better type safety
interface QueryClientConfig {
  defaultOptions: {
    queries: {
      staleTime: number;
      cacheTime: number;
      retry: number | boolean;
      retryDelay: (attemptIndex: number) => number;
      refetchOnWindowFocus: boolean;
      refetchOnReconnect: boolean | 'always';
      keepPreviousData: boolean;
    };
    mutations: {
      retry: number | boolean;
      retryDelay: number | ((attemptIndex: number) => number);
    };
  };
}

// Create and configure the QueryClient instance
const createQueryClient = (): QueryClient => {
  const config: QueryClientConfig = {
    defaultOptions: {
      queries: {
        // Data considered fresh for 30 seconds
        staleTime: 30 * 1000,
        // Cache data for 5 minutes
        cacheTime: 5 * 60 * 1000,
        // Retry failed requests 3 times
        retry: 3,
        // Retry delay exponential backoff
        retryDelay: (attemptIndex: number): number => 
          Math.min(1000 * 2 ** attemptIndex, 30000),
        // Disable refetch on window focus for React Native
        refetchOnWindowFocus: false,
        // Always refetch on reconnect
        refetchOnReconnect: 'always',
        // Keep previous data while fetching new data
        keepPreviousData: true,
      },
      mutations: {
        // Retry failed mutations once
        retry: 1,
        // Retry delay for mutations
        retryDelay: 1000,
      },
    },
  };

  return new QueryClient(config);
};

// Export singleton instance
export const queryClient: QueryClient = createQueryClient();

// Export function for testing or creating new instances
export { createQueryClient };