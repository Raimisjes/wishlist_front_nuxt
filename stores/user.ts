import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { getInitialState } from '@/stores/state/userState';
import type { UserState } from '@/stores/state/userState';

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
