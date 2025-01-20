import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useRuntimeConfig } from 'nuxt/app';

interface RegistrationState {
  form: {
    username: string;
    email: string;
    password: string;
    termsAccepted: Boolean;
    isLoading: boolean;
    error: string;
  };
}

interface RegistrationRes {
  status: boolean;
}

function getInitialState(): RegistrationState {
  return {
    form: {
      username: '',
      email: '',
      password: '',
      termsAccepted: false,
      isLoading: false,
      error: '',
    },
  };
}

export const useRegistrationStore = defineStore(
  'registration',
  () => {
    const router = useRouter();
    const config = useRuntimeConfig();

    const state = reactive<RegistrationState>(getInitialState());

    async function register() {
      if (state.form.isLoading) return;

      state.form.isLoading = true;
      state.form.error = '';

      try {
        const response = await $fetch<RegistrationRes>(
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
          },
        );

        if (response.status) {
          router.push('/registration/success');
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
      register,
      clearStore,
    };
  },
  {
    persist: false,
  },
);
