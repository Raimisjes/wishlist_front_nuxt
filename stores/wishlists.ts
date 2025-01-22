import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { useRuntimeConfig } from 'nuxt/app';
import { useUserStore } from '@/stores/user';
import { useUIStore } from '@/stores/ui';
import { getInitialState } from '@/stores/state/wishlistsState';
import type { WishlistsState } from '@/stores/state/wishlistsState';
import { useApiService } from '@/composables/useApiService';

export const useWishlistsStore = defineStore(
  'wishlists',
  () => {
    const config = useRuntimeConfig();
    const { apiFetch, formatApiError } = useApiService();

    const state = reactive<WishlistsState>(getInitialState());

    async function addWishlist() {
      if (state.form.isLoading) return;

      state.form.isLoading = true;
      state.form.error = '';

      let addWishlistSuccess = false;

      try {
        const response = await apiFetch<Promise<any>>(
          `${config.public.API_URL}/wishlist/add`,
          {
            method: 'post',
            body: {
              title: state.form.title,
              description: state.form.description,
              availabilityStatus: state.form.availabilityStatus,
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
          addWishlistSuccess = response.status;
          state.wishlists.unshift(response.data);
          useUIStore().showSnackbar('pages.wishlists.addWishlistSuccess');
        }
      } catch (error) {
        state.form.error = formatApiError(error);
      } finally {
        state.form.isLoading = false;
        return addWishlistSuccess;
      }
    }

    async function removeWishlist(wishlistId: string) {
      let removeWishlistSuccess = false;

      try {
        const response = await apiFetch<Promise<any>>(
          `${config.public.API_URL}/wishlist/remove`,
          {
            method: 'post',
            body: {
              wishlistId,
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
          removeWishlistSuccess = response.status;
          const index = state.wishlists.findIndex(
            (item) => item._id === wishlistId,
          );
          if (index !== -1) {
            state.wishlists.splice(index, 1);
          }
          useUIStore().showSnackbar('pages.wishlists.removeWishlistSuccess');
        }
      } catch (error) {
        useUIStore().showSnackbar(formatApiError(error), 4000);
      } finally {
        return removeWishlistSuccess;
      }
    }

    async function editWishlist() {
      if (state.form.isLoading) return;

      state.form.isLoading = true;
      state.form.error = '';

      let editWishlistSuccess = false;

      try {
        const response = await apiFetch<Promise<any>>(
          `${config.public.API_URL}/wishlist/edit`,
          {
            method: 'post',
            body: {
              title: state.form.title,
              description: state.form.description,
              availabilityStatus: state.form.availabilityStatus,
              ownerId: useUserStore().state.id,
              _id: state.form.selectedId,
            },
            timeout: 10000,
            retryStatusCodes: [401],
            retryDelay: 500,
            retry: 0,
          },
          true,
        );

        if (response.status) {
          editWishlistSuccess = response.status;

          const index = state.wishlists.findIndex(
            (item) => item._id === state.form.selectedId,
          );
          const editedWLData = {
            ...response.data,
            photos: state.wishlists[index].photos,
          };
          if (index !== -1) {
            state.wishlists.splice(index, 1);
          }
          state.wishlists.unshift(editedWLData);
          useUIStore().showSnackbar('pages.wishlists.editWishlistSuccess');
        }
      } catch (error) {
        state.form.error = formatApiError(error);
      } finally {
        state.form.isLoading = false;
        return editWishlistSuccess;
      }
    }

    async function getWishlists() {
      state.page.error = '';

      let getWishlistsSuccess = false;

      try {
        const response = await apiFetch<Promise<any>>(
          `${config.public.API_URL}/wishlist/getall/${useUserStore().state.id}`,
          {
            method: 'get',
            timeout: 10000,
            retryStatusCodes: [401],
            retryDelay: 500,
            retry: 0,
          },
          true,
        );

        if (response.status) {
          getWishlistsSuccess = response.status;
          state.wishlists = response.data.wishlists;
        }
      } catch (error) {
        useUIStore().showSnackbar(formatApiError(error), 4000);
      } finally {
        state.page.isLoading = false;
        return getWishlistsSuccess;
      }
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
      getWishlists,
      clearStore,
      clearForm,
    };
  },
  {
    persist: true,
  },
);
