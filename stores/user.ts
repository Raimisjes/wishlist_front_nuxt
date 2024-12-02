import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { useRuntimeConfig } from 'nuxt/app';
import { useRouter } from 'vue-router';
import { useUIStore } from './ui';

interface UserState {
  username: string;
  token: string;
  logged: boolean;
}

function getInitialState(): UserState {
  return {
    username: '',
    token: '',
    logged: false,
  };
}

export const useUserStore = defineStore(
  'user',
  () => {
    const state = reactive<UserState>(getInitialState());

    const router = useRouter();
    const config = useRuntimeConfig();

    function clearStore() {
      Object.assign(state, getInitialState());
    }

    async function logout() {
      try {
        const response = await $fetch<any>(
          `${config.public.API_URL}/user/logout`,
          {
            method: 'get',
            params: {
              token: state.token,
            },
            timeout: 10000,
          },
        );

        if (response.status) {
          clearStore();
          useUIStore().showSnackbar('components.snackbar.logout', 4000);
          router.push('/');
        }
      } catch (error) {
        let errorMessage = '';
        !error.data
          ? (errorMessage = 'errors.internal001')
          : (errorMessage = `errors.${error.data.data}`);
      }
    }

    return {
      state,
      clearStore,
      logout,
    };
  },
  {
    persist: true,
  },
);
