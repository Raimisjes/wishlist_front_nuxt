import type { Listing } from '@/types/listing.types';

export interface MyWishlistState {
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

export function getInitialState(): MyWishlistState {
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
