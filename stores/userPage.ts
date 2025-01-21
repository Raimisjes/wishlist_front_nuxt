import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { useRuntimeConfig } from 'nuxt/app';
import _ from 'lodash';
import type { SocialNetwork } from '@/types/socialNetwork.types';
import type { Wishlist } from '@/types/wishlist.types';

export interface UserPageState {
  username: string;
  socialNetworks: {
    facebook: SocialNetwork;
    instagram: SocialNetwork;
    youtube: SocialNetwork;
    tiktok: SocialNetwork;
  };
  wishlists: [];
  newListings: [];
  currentWishlist: Wishlist;
  page: {
    isLoading: boolean;
    error: string;
  };
}

function getInitialState(): UserPageState {
  return {
    username: '',
    socialNetworks: {
      facebook: {
        url: '',
        active: false,
        key: 'facebook',
        icon: 'mdi-facebook',
      },
      instagram: {
        url: '',
        active: false,
        key: 'instagram',
        icon: 'mdi-instagram',
      },
      youtube: {
        url: '',
        active: false,
        key: 'youtube',
        icon: 'mdi-youtube',
      },
      tiktok: {
        url: '',
        active: false,
        key: 'tiktok',
        icon: 'fa:fab fa-tiktok',
      },
    },
    wishlists: [],
    newListings: [],
    currentWishlist: {
      _id: '',
      title: '',
      description: '',
      availabilityStatus: 'private',
      ownerId: '',
      photos: [],
    },
    page: {
      isLoading: true,
      error: '',
    },
  };
}

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
