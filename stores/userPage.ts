import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { useRuntimeConfig } from 'nuxt/app';
import _ from 'lodash';
import { getInitialState } from '@/stores/state/userPageState';
import type { UserPageState } from '@/stores/state/userPageState';

export const useUserPageStore = defineStore(
  'userPage',
  () => {
    const state = reactive<UserPageState>(getInitialState());

    const config = useRuntimeConfig();

    async function getUserData(username: string) {
      state.page.error = '';

      let getUserDataSuccess = false;

      try {
        const response = await $fetch<Promise<any>>(
          `${config.public.API_URL}/user/getoneinfo/${username}`,
          {
            method: 'get',
            timeout: 10000,
            retryStatusCodes: [401],
            retryDelay: 500,
            retry: 0,
            async onRequest({ options }) {
              options.headers = {
                ...options.headers,
              };
            },
          },
        );

        getUserDataSuccess = response.status;
        _.merge(state, response.data);
      } catch (error) {
        let errorMessage = '';
        !error.data
          ? (errorMessage = 'errors.internal001')
          : (errorMessage = `errors.${error.data.data}`);

        state.page.error = errorMessage;
      }

      state.page.isLoading = false;
      return getUserDataSuccess;
    }

    async function getWishlistData(wishlistId: string) {
      state.page.error = '';

      let getWishlistDataSuccess = false;

      try {
        const response = await $fetch<Promise<any>>(
          `${config.public.API_URL}/wishlist/getoneinfo/public/${wishlistId}`,
          {
            method: 'get',
            timeout: 10000,
            retryStatusCodes: [401],
            retryDelay: 500,
            retry: 0,
            async onRequest({ options }) {
              options.headers = {
                ...options.headers,
              };
            },
          },
        );

        getWishlistDataSuccess = response.status;
        _.merge(state, response.data);
      } catch (error) {
        let errorMessage = '';
        !error.data
          ? (errorMessage = 'errors.internal001')
          : (errorMessage = `errors.${error.data.data}`);

        state.page.error = errorMessage;
      }

      state.page.isLoading = false;
      return getWishlistDataSuccess;
    }

    function clearStore() {
      Object.assign(state, getInitialState());
    }

    return {
      state,
      getUserData,
      getWishlistData,
      clearStore,
    };
  },
  {
    persist: false,
  },
);
