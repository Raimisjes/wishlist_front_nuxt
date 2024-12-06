import { defineStore } from 'pinia';
import { reactive } from 'vue';

interface UserState {
  username: string;
  email: string;
  accessToken: string;
  role: string;
  authenticated: boolean;
}

function getInitialState(): UserState {
  return {
    username: '',
    email: '',
    accessToken: '',
    role: '',
    authenticated: false,
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
