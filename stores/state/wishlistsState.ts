import type { Wishlist } from '@/types/wishlist.types';

export interface WishlistsState {
  form: {
    title: string;
    description: string;
    availabilityStatus: 'private' | 'public';
    selectedId: string;
    isLoading: boolean;
    error: string;
  };
  wishlists: Wishlist[];
  page: {
    isLoading: boolean;
    error: string;
  };
}

export function getInitialState(): WishlistsState {
  return {
    form: {
      title: '',
      description: '',
      availabilityStatus: 'private',
      selectedId: '',
      isLoading: false,
      error: '',
    },
    wishlists: [],
    page: {
      isLoading: true,
      error: '',
    },
  };
}
