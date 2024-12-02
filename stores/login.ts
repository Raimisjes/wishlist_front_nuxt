import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useRuntimeConfig } from 'nuxt/app';
import { useUserStore } from '@/stores/user';

interface LoginState {
  login: {
    form: {
      username: string;
      password: string;
      hidePassword: boolean;
      isLoading: boolean;
      error: string;
    };
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
    login: {
      form: {
        username: '',
        password: '',
        hidePassword: true,
        isLoading: false,
        error: '',
      },
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
      if (state.login.form.isLoading) return;

      state.login.form.isLoading = true;
      state.login.form.error = '';

      try {
        const response = await $fetch<LoginRes>(
          `${config.public.API_URL}/user/login`,
          {
            method: 'post',
            body: {
              username: state.login.form.username,
              password: state.login.form.password,
            },
            timeout: 10000,
          },
        );

        if (response.status) {
          useUserStore().state.user.username = response.data.username;
          useUserStore().state.user.token = response.data.token;
          useUserStore().state.user.logged = true;
          router.push('/');
          return;
        }
      } catch (error) {
        let errorMessage = '';
        !error.data
          ? (errorMessage = 'errors.internal001')
          : (errorMessage = `errors.${error.data.data}`);

        state.login.form.error = errorMessage;
      }
      state.login.form.isLoading = false;
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
