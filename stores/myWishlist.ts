import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { useRuntimeConfig } from 'nuxt/app';
import { useUserStore } from '@/stores/user';
import { useAuthStore } from '@/stores/auth';
import { useUIStore } from '@/stores/ui';
import type { Listing } from '@/types/listing.types';
import { getInitialState } from '@/stores/state/myWishlistState';
import type { MyWishlistState } from '@/stores/state/myWishlistState';
import { useApiService } from '@/composables/useApiService';

export const useMyWishlistStore = defineStore(
  'myWishlist',
  () => {
    const config = useRuntimeConfig();
    const { apiFetch, formatApiError } = useApiService();

    const state = reactive<MyWishlistState>(getInitialState());

    async function checkURL() {
      if (state.checkURLForm.isLoading) return;

      state.checkURLForm.isLoading = true;
      state.form.error = '';
      state.checkURLForm.error = '';

      let fetchSuccess = false;

      try {
        const response = await apiFetch<Promise<any>>(
          `${config.public.API_URL}/global/geturlinfo`,
          {
            method: 'post',
            body: {
              url: state.checkURLForm.url,
            },
            timeout: 15000,
            retryStatusCodes: [401],
            retryDelay: 500,
            retry: 0,
          },
          true,
        );

        if (response.status) {
          fetchSuccess = response.status;
          state.form.title = response.data.title;
          state.form.description = response.data.description;
          if (response.data.photo) {
            state.form.photo = response.data.photo;
          }
        }
      } catch (error) {
        state.checkURLForm.error = formatApiError(error);
      } finally {
        state.checkURLForm.isLoading = false;
        return fetchSuccess;
      }
    }

    async function addListing(formData: FormData) {
      if (state.form.isLoading) return;

      state.form.isLoading = true;
      state.form.error = '';

      let addWishSuccess = false;

      try {
        const response = await apiFetch<Promise<any>>(
          `${config.public.API_URL}/listing/add`,
          {
            method: 'post',
            body: formData,
            timeout: 10000,
            retryStatusCodes: [401],
            retryDelay: 500,
            retry: 0,
          },
          true,
        );

        if (response.status) {
          addWishSuccess = response.status;
          state.currentWishlist.listings.unshift(response.data as Listing);
          useUIStore().showSnackbar('pages.myWishlist.addWishSuccess');
        }
      } catch (error) {
        state.form.error = formatApiError(error);
      } finally {
        state.form.isLoading = false;
        return addWishSuccess;
      }
    }

    async function editListing(formData: FormData) {
      if (state.form.isLoading) return;

      state.form.isLoading = true;
      state.form.error = '';

      let editWishSuccess = false;

      try {
        const response = await apiFetch<Promise<any>>(
          `${config.public.API_URL}/listing/edit`,
          {
            method: 'post',
            body: formData,
            timeout: 10000,
            retryStatusCodes: [401],
            retryDelay: 500,
            retry: 0,
          },
          true,
        );

        if (response.status) {
          editWishSuccess = response.status;
          const index = state.currentWishlist.listings.findIndex(
            (item) => item._id === state.form.selectedId,
          );
          if (index !== -1) {
            state.currentWishlist.listings.splice(index, 1);
          }
          state.currentWishlist.listings.unshift(response.data as Listing);
          useUIStore().showSnackbar('pages.myWishlist.editListingSuccess');
        }
      } catch (error) {
        state.form.error = formatApiError(error);
      } finally {
        state.form.isLoading = false;
        return editWishSuccess;
      }
    }

    async function removeListing(listingId: string) {
      let removeListingSuccess = false;

      try {
        const response = await apiFetch<Promise<any>>(
          `${config.public.API_URL}/listing/remove`,
          {
            method: 'post',
            body: {
              listingId,
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
          removeListingSuccess = response.status;
          const index = state.currentWishlist.listings.findIndex(
            (item) => item._id === listingId,
          );
          if (index !== -1) {
            state.currentWishlist.listings.splice(index, 1);
          }
          useUIStore().showSnackbar('pages.myWishlist.removeListingSuccess');
        }
      } catch (error) {
        useUIStore().showSnackbar(formatApiError(error), 4000);
      } finally {
        return removeListingSuccess;
      }
    }

    async function claimListing(listingId: string) {
      let claimListingSuccess = false;

      try {
        const response = await apiFetch<Promise<any>>(
          `${config.public.API_URL}/listing/claim`,
          {
            method: 'post',
            body: {
              listingId,
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
          claimListingSuccess = response.status;
          const index = state.currentWishlist.listings.findIndex(
            (item) => item._id === listingId,
          );
          if (index !== -1) {
            state.currentWishlist.listings[index].status = 'claimed';
          }
          useUIStore().showSnackbar('pages.myWishlist.claimListingSuccess');
        }
      } catch (error) {
        useUIStore().showSnackbar(formatApiError(error), 4000);
      } finally {
        return claimListingSuccess;
      }
    }

    async function getWishlistData(wishlistId: string) {
      state.page.error = '';

      let getWishlistDataSuccess = false;

      try {
        const response = await apiFetch<Promise<any>>(
          `${config.public.API_URL}/wishlist/getoneinfo/${useUserStore().state.id}`,
          {
            method: 'get',
            query: {
              wishlistId,
            },
            timeout: 10000,
            retryStatusCodes: [401],
            retryDelay: 500,
            retry: 0,
          },
          true,
        );

        if (response.status) {
          getWishlistDataSuccess = response.status;
          state.currentWishlist = response.data;
        }
      } catch (error) {
        useUIStore().showSnackbar(formatApiError(error), 4000);
      } finally {
        state.page.isLoading = false;
        return getWishlistDataSuccess;
      }
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
      claimListing,
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
