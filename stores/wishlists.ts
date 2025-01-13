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
    selectedId: string;
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
      availabilityStatus: 'private',
      selectedId: '',
      isLoading: false,
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

    async function removeWishlist(wishlistId: string) {
      let removeWishlistSuccess = false;

      try {
        let refreshTokenSuccess: boolean;

        const response = await $fetch<Promise<any>>(
          `${config.public.API_URL}/wishlist/remove`,
          {
            method: 'post',
            timeout: 10000,
            retryStatusCodes: [401],
            retryDelay: 500,
            retry: 0,
            async onRequest({ options }) {
              options.body = {
                wishlistId,
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

        removeWishlistSuccess = response.status;
        const index = state.wishlists.findIndex(
          (item) => item._id === wishlistId,
        );
        if (index !== -1) {
          state.wishlists.splice(index, 1);
        }
        useUIStore().showSnackbar('pages.wishlists.removeWishlistSuccess');
      } catch (error) {
        throw new Error(error);
      }
      return removeWishlistSuccess;
    }

    async function editWishlist() {
      if (state.form.isLoading) return;

      state.form.isLoading = true;
      state.form.error = '';

      let editWishlistSuccess = false;

      try {
        let refreshTokenSuccess: boolean;

        const response = await $fetch<Promise<any>>(
          `${config.public.API_URL}/wishlist/edit`,
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
                _id: state.form.selectedId,
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

        editWishlistSuccess = response.status;

        const index = state.wishlists.findIndex(
          (item) => item._id === state.form.selectedId,
        );
        if (index !== -1) {
          state.wishlists.splice(index, 1);
        }
        state.wishlists.unshift(response.data);
        useUIStore().showSnackbar('pages.wishlists.editWishlistSuccess');
      } catch (error) {
        let errorMessage = '';
        !error.data
          ? (errorMessage = 'errors.internal001')
          : (errorMessage = `errors.${error.data.data}`);

        state.form.error = errorMessage;
      }

      state.form.isLoading = false;
      return editWishlistSuccess;
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
      editWishlist,
      removeWishlist,
      clearStore,
      clearForm,
    };
  },
  {
    persist: true,
  },
);
