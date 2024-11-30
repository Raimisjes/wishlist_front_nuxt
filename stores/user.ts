import { defineStore } from 'pinia';
import { reactive } from 'vue';

interface UserState {
  user: {
    username: string;
    token: string;
    logged: boolean;
  };
}

function getInitialState(): UserState {
  return {
    user: {
      username: '',
      token: '',
      logged: false,
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
