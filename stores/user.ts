import { defineStore } from 'pinia';
import { reactive } from 'vue';
import type { SocialNetwork } from '@/types/socialNetwork.types';

interface UserState {
  id: string;
  username: string;
  email: string;
  accessToken: string;
  role: string;
  authenticated: boolean;
  socialNetworks: {
    facebook: SocialNetwork;
    instagram: SocialNetwork;
    youtube: SocialNetwork;
    tiktok: SocialNetwork;
  };
}

function getInitialState(): UserState {
  return {
    id: '',
    username: '',
    email: '',
    accessToken: '',
    role: '',
    authenticated: false,
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
  };
}

export const useUserStore = defineStore(
  'user',
  () => {
    const state = reactive<UserState>(getInitialState());

    function clearStore() {
      Object.assign(state, getInitialState());
    }

    return {
      state,
      clearStore,
    };
  },
  {
    persist: true,
  },
);
