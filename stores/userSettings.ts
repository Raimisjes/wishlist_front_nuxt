import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { useRuntimeConfig } from 'nuxt/app';
import { useUserStore } from '@/stores/user';
import { useAuthStore } from '@/stores/auth';
import { useUIStore } from '@/stores/ui';
import DOMPurify from 'dompurify';

interface UserSettingsState {
  changePassword: {
    form: {
      currentPassword: string;
      hideCurrentPassword: boolean;
      newPassword: string;
      hideNewPassword: boolean;
      newRepeated: string;
      hideRepeatedPassword: boolean;
      isLoading: boolean;
      error: string;
    };
  };
  socialNetworks: {
    form: {
      url: string;
      active: boolean;
      isLoading: boolean;
      error: string;
    };
  };
}

function getInitialState(): UserSettingsState {
  return {
    changePassword: {
      form: {
        currentPassword: '',
        hideCurrentPassword: true,
        newPassword: '',
        hideNewPassword: true,
        newRepeated: '',
        hideRepeatedPassword: true,
        isLoading: false,
        error: '',
      },
    },
    socialNetworks: {
      form: {
        url: '',
        active: false,
        isLoading: false,
        error: '',
      },
    },
  };
}

export const useUserSettingsStore = defineStore(
  'userSettings',
  () => {
    const state = reactive<UserSettingsState>(getInitialState());

    const config = useRuntimeConfig();

    async function changePassword() {
      if (state.changePassword.form.isLoading) return;

      state.changePassword.form.isLoading = true;
      state.changePassword.form.error = '';

      let passChangeSuccess = false;

      try {
        let refreshTokenSuccess: boolean;

        const response = await $fetch<Promise<any>>(
          `${config.public.API_URL}/user/edit/password`,
          {
            method: 'post',
            timeout: 10000,
            retryStatusCodes: [401],
            retryDelay: 500,
            retry: 0,
            async onRequest({ options }) {
              options.body = {
                username: useUserStore().state.username,
                accessToken: useUserStore().state.accessToken,
                password: state.changePassword.form.currentPassword,
                newPassword: state.changePassword.form.newPassword,
                repeatedNewPass: state.changePassword.form.newRepeated,
              };
            },
            async onResponseError({ options, response }) {
              refreshTokenSuccess = await useAuthStore().refreshToken({
                options,
                response,
              });
              if (refreshTokenSuccess) {
                options.retry = 1;
              }
            },
          },
        );

        passChangeSuccess = response.status;
        useUIStore().showSnackbar('pages.settings.changePassSuccess', 7000);
        clearChangePasswordForm();
      } catch (error) {
        let errorMessage = '';
        !error.data
          ? (errorMessage = 'errors.internal001')
          : (errorMessage = `errors.${error.data.data}`);

        state.changePassword.form.error = errorMessage;
      }

      state.changePassword.form.isLoading = false;
      return passChangeSuccess;
    }

    async function editSocialNetwork(socialNetworkKey: string) {
      if (state.socialNetworks.form.isLoading) return;

      state.socialNetworks.form.isLoading = true;
      state.socialNetworks.form.error = '';

      let editSocialNetworkSuccess = false;

      try {
        let refreshTokenSuccess: boolean;

        let socialNetworkData: any = {};
        socialNetworkData[socialNetworkKey] = {
          url: DOMPurify.sanitize(state.socialNetworks.form.url),
          active: state.socialNetworks.form.active,
        };

        const response = await $fetch<Promise<any>>(
          `${config.public.API_URL}/user/edit`,
          {
            method: 'post',
            timeout: 10000,
            retryStatusCodes: [401],
            retryDelay: 500,
            retry: 0,
            async onRequest({ options }) {
              options.body = {
                username: useUserStore().state.username,
                accessToken: useUserStore().state.accessToken,
                socialNetworks: socialNetworkData,
              };
            },
            async onResponseError({ options, response }) {
              refreshTokenSuccess = await useAuthStore().refreshToken({
                options,
                response,
              });
              if (refreshTokenSuccess) {
                options.retry = 1;
              }
            },
          },
        );

        editSocialNetworkSuccess = response.status;
        useUIStore().showSnackbar(
          'pages.settings.editSocialNetworkSuccess',
          7000,
        );
        useUserStore().state.socialNetworks[socialNetworkKey].url =
          state.socialNetworks.form.url;
        useUserStore().state.socialNetworks[socialNetworkKey].active =
          state.socialNetworks.form.active;
        clearSocialNetworksForm();
      } catch (error) {
        let errorMessage = '';
        !error.data
          ? (errorMessage = 'errors.internal001')
          : (errorMessage = `errors.${error.data.data}`);

        state.socialNetworks.form.error = errorMessage;
      }

      state.socialNetworks.form.isLoading = false;
      return editSocialNetworkSuccess;
    }

    function clearStore() {
      Object.assign(state, getInitialState());
    }

    function clearChangePasswordForm() {
      Object.assign(state.changePassword, getInitialState().changePassword);
    }

    function clearSocialNetworksForm() {
      Object.assign(state.socialNetworks, getInitialState().socialNetworks);
    }

    return {
      state,
      changePassword,
      clearStore,
      clearChangePasswordForm,
      editSocialNetwork,
      clearSocialNetworksForm,
    };
  },
  {
    persist: true,
  },
);
