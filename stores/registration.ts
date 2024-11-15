import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useRuntimeConfig } from 'nuxt/app';

interface RegistrationState {
  registration: {
    form: {
      username: String;
      email: String;
      password: String;
      hidePassword: Boolean;
      termsAccepted: Boolean;
      isLoading: Boolean;
      error: String;
    };
  };
}

interface RegistrationRes {
  status: Boolean;
}

function getInitialState(): RegistrationState {
  return {
    registration: {
      form: {
        username: '',
        email: '',
        password: '',
        hidePassword: true,
        termsAccepted: false,
        isLoading: false,
        error: '',
      },
    },
  };
}

export const useRegistrationStore = defineStore('registration', () => {
  const router = useRouter();
  const config = useRuntimeConfig();

  const state = reactive<RegistrationState>(getInitialState());

  async function register() {
    if (state.registration.form.isLoading) return;

    state.registration.form.isLoading = true;
    state.registration.form.error = '';

    try {
      const response = await $fetch<RegistrationRes>(
        `${config.public.API_URL}/user/add`,
        {
          method: 'post',
          body: {
            username: state.registration.form.username,
            password: state.registration.form.password,
            email: state.registration.form.email,
            termsAccepted: state.registration.form.termsAccepted,
          },
          timeout: 10000,
        },
      );

      if (response.status) {
        router.push('registration/success');
        return;
      }
    } catch (error) {
      let errorMessage = '';
      !error.data
        ? (errorMessage = 'errors.internal001')
        : (errorMessage = `errors.${error.data.data}`);

      state.registration.form.error = errorMessage;
    }
    state.registration.form.isLoading = false;
  }

  function clearStore() {
    Object.assign(state, getInitialState());
  }

  return {
    state,
    register,
    clearStore,
  };
});
