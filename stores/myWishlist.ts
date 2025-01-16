import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { useRuntimeConfig } from 'nuxt/app';
import { useUserStore } from '@/stores/user';
import { useAuthStore } from '@/stores/auth';
import { useUIStore } from '@/stores/ui';
import type { Listing } from '@/types/listing.types';

interface MyWishlistState {
  checkURLForm: {
    url: string;
    isLoading: boolean;
    error: string;
  };
  form: {
    title: string;
    description: string;
    photo: string;
    wishlistId: string;
    isLoading: boolean;
    error: string;
    show: boolean;
    selectedId: string;
  };
  page: {
    isLoading: boolean;
    error: string;
  };
  currentWishlist: {
    listings: Listing[];
  };
}

function getInitialState(): MyWishlistState {
  return {
    checkURLForm: {
      url: '',
      isLoading: false,
      error: '',
    },
    form: {
      title: '',
      description: '',
      photo: '',
      wishlistId: '',
      isLoading: false,
      error: '',
      show: false,
      selectedId: '',
    },
    page: {
      isLoading: true,
      error: '',
    },
    currentWishlist: {
      listings: [],
    },
  };
}

export const useMyWishlistStore = defineStore(
  'myWishlist',
  () => {
    const config = useRuntimeConfig();

    const state = reactive<MyWishlistState>(getInitialState());

    async function checkURL() {
      if (state.checkURLForm.isLoading) return;

      state.checkURLForm.isLoading = true;
      state.form.error = '';
      state.checkURLForm.error = '';

      let fetchSuccess = false;

      try {
        let refreshTokenSuccess: boolean;

        const response = await $fetch<Promise<any>>(
          `${config.public.API_URL}/global/geturlinfo`,
          {
            method: 'post',
            timeout: 20000,
            retryStatusCodes: [401],
            retryDelay: 500,
            retry: 0,
            async onRequest({ options }) {
              options.body = {
                url: state.checkURLForm.url,
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
        fetchSuccess = response.status;
        state.form.title = response.data.title;
        state.form.description = response.data.description;
        if (response.data.photo) {
          state.form.photo = response.data.photo;
        }
      } catch (error) {
        let errorMessage = '';
        !error.data
          ? (errorMessage = 'errors.internal001')
          : (errorMessage = `errors.${error.data.data}`);

        state.checkURLForm.error = errorMessage;
      }

      state.checkURLForm.isLoading = false;
      return fetchSuccess;
    }

    async function addListing(formData: FormData) {
      if (state.form.isLoading) return;

      state.form.isLoading = true;
      state.form.error = '';

      let addWishSuccess = false;

      try {
        let refreshTokenSuccess: boolean;

        const response = await $fetch<Promise<any>>(
          `${config.public.API_URL}/listing/add`,
          {
            method: 'post',
            timeout: 20000,
            retryStatusCodes: [401],
            retryDelay: 500,
            retry: 0,
            async onRequest({ options }) {
              options.body = formData;
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

        addWishSuccess = response.status;
        state.currentWishlist.listings.unshift(response.data as Listing);
        useUIStore().showSnackbar('pages.myWishlist.addWishSuccess');
      } catch (error) {
        let errorMessage = '';
        !error.data
          ? (errorMessage = 'errors.internal001')
          : (errorMessage = `errors.${error.data.data}`);

        state.form.error = errorMessage;
      }

      state.form.isLoading = false;
      return addWishSuccess;
    }

    async function editListing(formData: FormData) {
      if (state.form.isLoading) return;

      state.form.isLoading = true;
      state.form.error = '';

      let editWishSuccess = false;

      try {
        let refreshTokenSuccess: boolean;

        const response = await $fetch<Promise<any>>(
          `${config.public.API_URL}/listing/edit`,
          {
            method: 'post',
            timeout: 20000,
            retryStatusCodes: [401],
            retryDelay: 500,
            retry: 0,
            async onRequest({ options }) {
              options.body = formData;
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

        editWishSuccess = response.status;
        const index = state.currentWishlist.listings.findIndex(
          (item) => item._id === state.form.selectedId,
        );
        if (index !== -1) {
          state.currentWishlist.listings.splice(index, 1);
        }
        state.currentWishlist.listings.unshift(response.data as Listing);
        useUIStore().showSnackbar('pages.myWishlist.editListingSuccess');
      } catch (error) {
        let errorMessage = '';
        !error.data
          ? (errorMessage = 'errors.internal001')
          : (errorMessage = `errors.${error.data.data}`);

        state.form.error = errorMessage;
      }

      state.form.isLoading = false;
      return editWishSuccess;
    }

    async function removeListing(listingId: string) {
      let removeListingSuccess = false;

      try {
        let refreshTokenSuccess: boolean;

        const response = await $fetch<Promise<any>>(
          `${config.public.API_URL}/listing/remove`,
          {
            method: 'post',
            timeout: 10000,
            retryStatusCodes: [401],
            retryDelay: 500,
            retry: 0,
            async onRequest({ options }) {
              options.body = {
                listingId,
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

        removeListingSuccess = response.status;
        const index = state.currentWishlist.listings.findIndex(
          (item) => item._id === listingId,
        );
        if (index !== -1) {
          state.currentWishlist.listings.splice(index, 1);
        }
        useUIStore().showSnackbar('pages.myWishlist.removeListingSuccess');
      } catch (error) {
        throw new Error(error);
      }
      return removeListingSuccess;
    }

    async function getWishlistData(wishlistId: string) {
      state.page.error = '';

      let getWishlistDataSuccess = false;

      try {
        let refreshTokenSuccess: boolean;

        const response = await $fetch<Promise<any>>(
          `${config.public.API_URL}/wishlist/getoneinfo/${useUserStore().state.id}`,
          {
            method: 'get',
            timeout: 10000,
            retryStatusCodes: [401],
            retryDelay: 500,
            retry: 0,
            async onRequest({ options }) {
              options.headers = {
                ...options.headers,
                // @ts-ignore:next-line
                Authorization: `Bearer ${useUserStore().state.accessToken}`,
              };
              options.query = {
                wishlistId,
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

        getWishlistDataSuccess = response.status;
        state.currentWishlist = response.data;
      } catch (error) {
        throw new Error(error);
      }
      state.page.isLoading = false;
      return getWishlistDataSuccess;
    }

    function clearStore() {
      Object.assign(state, getInitialState());
    }

    function clearForm() {
      Object.assign(state.form, getInitialState().form);
    }

    function clearCheckURLForm() {
      Object.assign(state.checkURLForm, getInitialState().checkURLForm);
    }

    return {
      state,
      checkURL,
      addListing,
      editListing,
      removeListing,
      getWishlistData,
      clearStore,
      clearForm,
      clearCheckURLForm,
    };
  },
  {
    persist: true,
  },
);
