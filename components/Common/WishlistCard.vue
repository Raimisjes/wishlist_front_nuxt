<script lang="ts" setup>
import type { Wishlist } from '@/types/wishlist.types';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useUIStore } from '@/stores/ui';
import { useWishlistsStore } from '@/stores/wishlists';

const router = useRouter();
const { t } = useI18n();

const props = defineProps<{
  wishlist: Wishlist;
  editRights: Boolean;
}>();

const emit = defineEmits(['openEditModal']);

function viewWishlist(event: Event, wishlist: Wishlist) {
  const target = event.target as HTMLElement;
  if (target.closest('.v-carousel__controls')) {
    event.stopPropagation();
    return false;
  }

  const wishlistLink = props.editRights
    ? `/mywishlist/${wishlist._id}`
    : `/w${wishlist._id}`;
  router.push({
    path: wishlistLink,
  });
}

function openRemoveDialog(wishlist: Wishlist) {
  useUIStore().openConfirmationDialog(
    t('phrases.removeWishlist', {
      wishlist: `${wishlist.title}`,
    }),
    () => useWishlistsStore().removeWishlist(wishlist._id),
  );
}
</script>

<template>
  <div class="wishlist-card" @click="viewWishlist($event, wishlist)">
    <UIElementsActionButton
      v-if="editRights"
      :class="'edit-button'"
      :icon="'mdi-pencil'"
      :title="$t('words.edit')"
      :color="'primary'"
      @click="emit('openEditModal')"
    />
    <UIElementsActionButton
      v-if="editRights"
      :class="'remove-button'"
      :icon="'mdi-delete'"
      :title="$t('words.remove')"
      :color="'remove'"
      @click="() => openRemoveDialog(wishlist)"
    />
    <img
      src="@/assets/images/gift-placeholder.png"
      v-if="!wishlist.photos?.length"
    />
    <v-carousel
      v-else
      :show-arrows="false"
      height="220"
      hide-delimiter-background
    >
      <template v-for="(photo, index) in wishlist?.photos || []" :key="index">
        <v-carousel-item v-if="photo" :src="photo" cover></v-carousel-item>
      </template>
    </v-carousel>
    <div class="info">
      <span v-if="editRights" class="chip">
        {{ $t(`words.${wishlist.availabilityStatus}`) }}
      </span>
      <h5>{{ wishlist.title }}</h5>
    </div>
  </div>
</template>
