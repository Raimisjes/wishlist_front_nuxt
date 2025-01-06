import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { useRuntimeConfig } from 'nuxt/app';
import { useUserStore } from '@/stores/user';
import { useAuthStore } from '@/stores/auth';

interface MyWishlistState {
  checkURLForm: {
    url: string;
    isLoading: boolean;
    error: string;
  };
  form: {
    title: string;
    description: string;
    image: {};
    isLoading: boolean;
    error: string;
    show: boolean;
  };
  wishlist: WishlistItem[];
}

interface WishlistItem {
  id: string;
  title: string;
  description: string;
  image: {};
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
      image: {},
      isLoading: false,
      error: '',
      show: false,
    },
    wishlist: [],
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
      state.checkURLForm.error = '';

      let fetchSuccess = false;

      try {
        let refreshTokenSuccess: boolean;

        const response = await $fetch<Promise<any>>(
          `${config.public.API_URL}/global/geturlinfo`,
          {
            method: 'post',
            timeout: 10000,
            retryStatusCodes: [401],
            retryDelay: 500,
            retry: 0,
            async onRequest({ options }) {
              options.body = {
                url: state.checkURLForm.url,
                accessToken: useUserStore().state.accessToken,
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
        state.form.image = response.data.image;
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
      clearStore,
      clearForm,
      clearCheckURLForm,
    };
  },
  {
    persist: false,
  },
);
