import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { useRuntimeConfig } from 'nuxt/app';
import { useUserStore } from '@/stores/user';
import { useUIStore } from '@/stores/ui';
import DOMPurify from 'dompurify';
import { getInitialState } from '@/stores/state/userSettingsState';
import type { UserSettingsState } from '@/stores/state/userSettingsState';
import { useApiService } from '@/composables/useApiService';

export const useUserSettingsStore = defineStore(
  'userSettings',
  () => {
    const state = reactive<UserSettingsState>(getInitialState());

    const config = useRuntimeConfig();
    const { apiFetch, formatApiError } = useApiService();

    async function changePassword() {
      if (state.changePassword.form.isLoading) return;

      state.changePassword.form.isLoading = true;
      state.changePassword.form.error = '';

      let passChangeSuccess = false;

      try {
        const response = await apiFetch<Promise<any>>(
          `${config.public.API_URL}/user/edit/password`,
          {
            method: 'post',
            body: {
              username: useUserStore().state.username,
              password: state.changePassword.form.currentPassword,
              newPassword: state.changePassword.form.newPassword,
              repeatedNewPass: state.changePassword.form.newRepeated,
              ownerId: useUserStore().state.id,
            },
            timeout: 10000,
            retryStatusCodes: [401],
            retryDelay: 500,
            retry: 0,
          },
          true,
        );

        if (response.status) {
          passChangeSuccess = response.status;
          useUIStore().showSnackbar('pages.settings.changePassSuccess', 7000);
          clearChangePasswordForm();
        }
      } catch (error) {
        state.changePassword.form.error = formatApiError(error);
      } finally {
        state.changePassword.form.isLoading = false;
        return passChangeSuccess;
      }
    }

    async function editSocialNetwork(socialNetworkKey: string) {
      if (state.socialNetworks.form.isLoading) return;

      state.socialNetworks.form.isLoading = true;
      state.socialNetworks.form.error = '';

      let editSocialNetworkSuccess = false;

      try {
        let socialNetworkData: any = {};
        socialNetworkData[socialNetworkKey] = {
          url: DOMPurify.sanitize(state.socialNetworks.form.url),
          active: state.socialNetworks.form.active,
        };

        const response = await apiFetch<Promise<any>>(
          `${config.public.API_URL}/user/edit`,
          {
            method: 'post',
            body: {
              username: useUserStore().state.username,
              socialNetworks: socialNetworkData,
              ownerId: useUserStore().state.id,
            },
            timeout: 10000,
            retryStatusCodes: [401],
            retryDelay: 500,
            retry: 0,
          },
          true,
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
        state.socialNetworks.form.error = formatApiError(error);
      } finally {
        state.socialNetworks.form.isLoading = false;
        return editSocialNetworkSuccess;
      }
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
