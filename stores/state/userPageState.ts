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

export function getInitialState(): UserPageState {
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
