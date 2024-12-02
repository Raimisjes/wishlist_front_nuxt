import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useRuntimeConfig } from 'nuxt/app';
import { useUserStore } from '@/stores/user';

interface LoginState {
  form: {
    username: string;
    password: string;
    hidePassword: boolean;
    isLoading: boolean;
    error: string;
  };
}

interface LoginRes {
  status: boolean;
  data: {
    token: string;
    username: string;
  };
}

function getInitialState(): LoginState {
  return {
    form: {
      username: '',
      password: '',
      hidePassword: true,
      isLoading: false,
      error: '',
    },
  };
}

export const useLoginStore = defineStore(
  'login',
  () => {
    const router = useRouter();
    const config = useRuntimeConfig();

    const state = reactive<LoginState>(getInitialState());

    async function login() {
      if (state.form.isLoading) return;

      state.form.isLoading = true;
      state.form.error = '';

      try {
        const response = await $fetch<LoginRes>(
          `${config.public.API_URL}/user/login`,
          {
            method: 'post',
            body: {
              username: state.form.username,
              password: state.form.password,
            },
            timeout: 10000,
          },
        );

        if (response.status) {
          useUserStore().state.username = response.data.username;
          useUserStore().state.token = response.data.token;
          useUserStore().state.logged = true;
          router.push('/');
          return;
        }
      } catch (error) {
        let errorMessage = '';
        !error.data
          ? (errorMessage = 'errors.internal001')
          : (errorMessage = `errors.${error.data.data}`);

        state.form.error = errorMessage;
      }
      state.form.isLoading = false;
    }

    function clearStore() {
      Object.assign(state, getInitialState());
    }

    return {
      state,
      login,
      clearStore,
    };
  },
  {
    persist: false,
  },
);
