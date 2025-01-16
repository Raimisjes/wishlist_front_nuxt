export interface Wishlist {
  _id: string;
  title: string;
  description: string;
  availabilityStatus: 'public' | 'private';
  ownerId: string;
  photos: string[];
}
