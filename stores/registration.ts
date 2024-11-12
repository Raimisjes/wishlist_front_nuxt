import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

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

export const useRegistrationStore = defineStore('registration', () => {
  const router = useRouter();

  const state = reactive<RegistrationState>({
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
  });

  async function register() {
    if (state.registration.form.isLoading) return;

    state.registration.form.isLoading = true;
    state.registration.form.error = '';

    try {
      const response = await $fetch<RegistrationRes>(
        'http://localhost:5000/user/add',
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

  return {
    state,
    register,
  };
});
