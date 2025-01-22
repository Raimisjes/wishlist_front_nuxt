import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useRuntimeConfig } from 'nuxt/app';
import { getInitialState } from '@/stores/state/registrationState';
import type { RegistrationState } from '@/stores/state/registrationState';
import { useApiService } from '@/composables/useApiService';

export const useRegistrationStore = defineStore(
  'registration',
  () => {
    const router = useRouter();
    const config = useRuntimeConfig();
    const { apiFetch, formatApiError } = useApiService();

    const state = reactive<RegistrationState>(getInitialState());

    async function register() {
      if (state.form.isLoading) return;

      state.form.isLoading = true;
      state.form.error = '';

      try {
        const response = await apiFetch<Promise<any>>(
          `${config.public.API_URL}/user/add`,
          {
            method: 'post',
            body: {
              username: state.form.username,
              password: state.form.password,
              email: state.form.email,
              termsAccepted: state.form.termsAccepted,
            },
            timeout: 10000,
            retry: 0,
          },
          false,
        );

        if (response.status) {
          router.push('/registration/success');
        }
      } catch (error) {
        state.form.error = formatApiError(error);
      } finally {
        state.form.isLoading = false;
      }
    }

    function clearStore() {
      Object.assign(state, getInitialState());
    }

    return {
      state,
      register,
      clearStore,
    };
  },
  {
    persist: false,
  },
);
