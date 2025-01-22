import { useAuthStore } from '@/stores/auth';
import { useUserStore } from '@/stores/user';

export function useApiService() {
  async function apiFetch<T>(
    url: string,
    options: any,
    authorization: boolean,
  ) {
    const authStore = useAuthStore();
    const userStore = useUserStore();
    let refreshTokenSuccess = false;

    try {
      const response = await $fetch<T>(url, {
        ...options,
        async onRequest({ options }) {
          const headers = new Headers(options.headers);
          if (authorization) {
            headers.set(
              'Authorization',
              `Bearer ${userStore.state.accessToken}`,
            );
          }
          options.headers = headers;
        },
        async onResponseError({ options, response }) {
          refreshTokenSuccess = await authStore.refreshToken({
            options,
            response,
          });
          if (refreshTokenSuccess) options.retry = 1;
        },
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  function formatApiError(error: any): string {
    let errorMessage = '';
    !error.data
      ? (errorMessage = 'errors.internal001')
      : (errorMessage = `errors.${error.data.data}`);
    return errorMessage;
  }

  return { apiFetch, formatApiError };
}
