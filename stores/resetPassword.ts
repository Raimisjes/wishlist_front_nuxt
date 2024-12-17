import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { useRuntimeConfig } from 'nuxt/app';
import { useRouter } from 'vue-router';
//import { useUIStore } from './ui';

interface ResetPasswordState {
  form: {
    email: string;
    isLoading: boolean;
    error: string;
  };
}

function getInitialState(): ResetPasswordState {
  return {
    form: {
      email: '',
      isLoading: false,
      error: '',
    },
  };
}

export const useResetPasswordStore = defineStore(
  'resetPassword',
  () => {
    //const router = useRouter();
    const config = useRuntimeConfig();

    const state = reactive<ResetPasswordState>(getInitialState());

    async function resetPasswordInit() {
      if (state.form.isLoading) return;

      state.form.isLoading = true;
      state.form.error = '';

      try {
        const response = await $fetch<Promise<any>>(
          `${config.public.API_URL}/resetpassword/init`,
          {
            method: 'post',
            body: {
              email: state.form.email,
            },
            timeout: 10000,
          },
        );

        if (response.status) {
          // useUIStore().showSnackbar('components.snackbar.logout', 4000);
          // router.push('/');
          // return;
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
      resetPasswordInit,
      clearStore,
    };
  },
  {
    persist: false,
  },
);
