import type { Listing } from '@/types/listing.types';

export interface HomepageState {
  usernameCheck: {
    form: {
      username: string;
      isLoading: boolean;
      error: string;
    };
    usernameExists: null | boolean;
  };
  newListings: Listing[];
  page: {
    isLoading: boolean;
    error: string;
  };
}

export function getInitialState(): HomepageState {
  return {
    usernameCheck: {
      form: {
        username: '',
        isLoading: false,
        error: '',
      },
      usernameExists: null,
    },
    newListings: [],
    page: {
      isLoading: true,
      error: '',
    },
  };
}
