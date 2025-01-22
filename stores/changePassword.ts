import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { useRuntimeConfig } from 'nuxt/app';
import { useRouter, useRoute } from 'vue-router';
import { getInitialState } from '@/stores/state/changePasswordState';
import type { ChangePasswordState } from '@/stores/state/changePasswordState';

export const useChangePasswordStore = defineStore(
  'changePassword',
  () => {
    const route = useRoute();
    const router = useRouter();
    const config = useRuntimeConfig();

    const state = reactive<ChangePasswordState>(getInitialState());

    async function checkToken(token: string) {
      let isTokenValid = false;

      try {
        const response = await $fetch<Promise<any>>(
          `${config.public.API_URL}/user/resetpassword/tokencheck`,
          {
            method: 'post',
            body: {
              token,
            },
            timeout: 10000,
          },
        );

        isTokenValid = response.status;
      } catch (error) {
        console.error(error);
      }

      return isTokenValid;
    }

    async function changePassword() {
      if (state.form.isLoading) return;

      state.form.isLoading = true;
      state.form.error = '';

      try {
        const response = await $fetch<Promise<any>>(
          `${config.public.API_URL}/user/resetpassword/createnew`,
          {
            method: 'post',
            body: {
              newPassword: state.form.newPassword,
              repeatedNewPass: state.form.repeatedNewPass,
              token: route.params.token,
            },
            timeout: 10000,
          },
        );

        if (response.status) {
          router.push('/resetpassword/changesuccess');
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
      checkToken,
      changePassword,
      clearStore,
    };
  },
  {
    persist: false,
  },
);
