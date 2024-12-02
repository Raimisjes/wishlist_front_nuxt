import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { useRuntimeConfig } from 'nuxt/app';
import { useRouter } from 'vue-router';
import { useUIStore } from './ui';

interface UserState {
  user: {
    username: string;
    token: string;
    logged: boolean;
  };
}

function getInitialState(): UserState {
  return {
    user: {
      username: '',
      token: '',
      logged: false,
    },
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
              token: state.user.token,
            },
            timeout: 10000,
          },
        );

        if (response.status) {
          useUIStore().showSnackbar('components.snackbar.logout', 4000);
          clearStore();
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
