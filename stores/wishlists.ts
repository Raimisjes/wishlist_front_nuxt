import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { useRuntimeConfig } from 'nuxt/app';
import { useUserStore } from '@/stores/user';
import { useAuthStore } from '@/stores/auth';
import { useUIStore } from '@/stores/ui';

interface WishlistsState {
  form: {
    title: string;
    description: string;
    availabilityStatus: 'private' | 'public';
    isLoading: boolean;
    error: string;
  };
  wishlists: Wishlist[];
}

interface Wishlist {
  _id: string;
  title: string;
  description: string;
  availabilityStatus: 'private' | 'public';
  owner: string;
}

function getInitialState(): WishlistsState {
  return {
    form: {
      title: '',
      description: '',
      isLoading: false,
      availabilityStatus: 'private',
      error: '',
    },
    wishlists: [],
  };
}

export const useWishlistsStore = defineStore(
  'wishlists',
  () => {
    const config = useRuntimeConfig();

    const state = reactive<WishlistsState>(getInitialState());

    async function addWishlist() {
      if (state.form.isLoading) return;

      state.form.isLoading = true;
      state.form.error = '';

      let addWishlistSuccess = false;

      try {
        let refreshTokenSuccess: boolean;

        const response = await $fetch<Promise<any>>(
          `${config.public.API_URL}/wishlist/add`,
          {
            method: 'post',
            timeout: 10000,
            retryStatusCodes: [401],
            retryDelay: 500,
            retry: 0,
            async onRequest({ options }) {
              options.body = {
                title: state.form.title,
                description: state.form.description,
                availabilityStatus: state.form.availabilityStatus,
                ownerId: useUserStore().state.id,
              };
              options.headers = {
                ...options.headers,
                // @ts-ignore:next-line
                Authorization: `Bearer ${useUserStore().state.accessToken}`,
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

        addWishlistSuccess = response.status;
        state.wishlists.unshift(response.data);
        useUIStore().showSnackbar('pages.wishlists.addWishlistSuccess');
      } catch (error) {
        let errorMessage = '';
        !error.data
          ? (errorMessage = 'errors.internal001')
          : (errorMessage = `errors.${error.data.data}`);

        state.form.error = errorMessage;
      }

      state.form.isLoading = false;
      return addWishlistSuccess;
    }

    function clearStore() {
      Object.assign(state, getInitialState());
    }

    function clearForm() {
      Object.assign(state.form, getInitialState().form);
    }

    return {
      state,
      addWishlist,
      clearStore,
      clearForm,
    };
  },
  {
    persist: true,
  },
);
