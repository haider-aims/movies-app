import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authService } from "@/services/auth";

// Query Keys for consistent cache management
export const AUTH_QUERY_KEYS = {
  session: () => ['auth', 'session'] as const,
  user: () => ['auth', 'user'] as const,
} as const;

// Query hook for current session
export const useAuthSession = () => {
  return useQuery({
    queryKey: AUTH_QUERY_KEYS.session(),
    queryFn: () => authService.getSession(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
};

// Query hook for current user
export const useAuthUser = () => {
  return useQuery({
    queryKey: AUTH_QUERY_KEYS.user(),
    queryFn: () => authService.getCurrentUser(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
};

// Mutation hook for sign in
export const useSignIn = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      authService.signIn(email, password),
    onSuccess: (data) => {
      // Invalidate and refetch auth-related queries
      queryClient.invalidateQueries({ queryKey: AUTH_QUERY_KEYS.session() });
      queryClient.invalidateQueries({ queryKey: AUTH_QUERY_KEYS.user() });
      console.log("Sign in successful:", data);
    },
    onError: (error) => {
      console.error("Sign in failed:", error);
    },
  });
};

// Mutation hook for sign up
export const useSignUp = () => {
  
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      authService.signUp(email, password),
    onSuccess: (data) => {
      console.log("Sign up successful:", data);
    },
    onError: (error) => {
      console.error("Sign up failed:", error);
    },
  });
};

// Mutation hook for sign out
export const useSignOut = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: () => authService.signOut(),
    onSuccess: () => {
      // Clear all auth-related cache
      queryClient.removeQueries({ queryKey: AUTH_QUERY_KEYS.session() });
      queryClient.removeQueries({ queryKey: AUTH_QUERY_KEYS.user() });
      console.log("Sign out successful");
    },
    onError: (error) => {
      console.error("Sign out failed:", error);
    },
  });
};