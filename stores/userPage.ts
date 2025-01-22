import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { useRuntimeConfig } from 'nuxt/app';
import _ from 'lodash';
import { getInitialState } from '@/stores/state/userPageState';
import type { UserPageState } from '@/stores/state/userPageState';
import { useApiService } from '@/composables/useApiService';

export const useUserPageStore = defineStore(
  'userPage',
  () => {
    const state = reactive<UserPageState>(getInitialState());

    const config = useRuntimeConfig();
    const { apiFetch, formatApiError } = useApiService();

    async function getUserData(username: string) {
      state.page.error = '';

      let getUserDataSuccess = false;

      try {
        const response = await apiFetch<Promise<any>>(
          `${config.public.API_URL}/user/getoneinfo/${username}`,
          {
            method: 'get',
            timeout: 10000,
            retry: 0,
          },
          false,
        );

        getUserDataSuccess = response.status;
        _.merge(state, response.data);
      } catch (error) {
        state.page.error = formatApiError(error);
      } finally {
        state.page.isLoading = false;
        return getUserDataSuccess;
      }
    }

    async function getWishlistData(wishlistId: string) {
      state.page.error = '';

      let getWishlistDataSuccess = false;

      try {
        const response = await apiFetch<Promise<any>>(
          `${config.public.API_URL}/wishlist/getoneinfo/public/${wishlistId}`,
          {
            method: 'get',
            timeout: 10000,
            retry: 0,
          },
          false,
        );

        getWishlistDataSuccess = response.status;
        _.merge(state, response.data);
      } catch (error) {
        state.page.error = formatApiError(error);
      } finally {
        state.page.isLoading = false;
        return getWishlistDataSuccess;
      }
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
