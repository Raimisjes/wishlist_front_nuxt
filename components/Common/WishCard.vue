<script lang="ts" setup>
import type { Listing } from '@/types/listing.types';
import { useMyWishlistStore } from '@/stores/myWishlist';
import { useUIStore } from '@/stores/ui';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const myWishlistStore = useMyWishlistStore();

const props = defineProps<{
  listing: Listing;
  editRights: Boolean;
}>();

const emit = defineEmits(['openEditModal']);

function openUrl(url: string) {
  window.open(url, '_blank', 'noopener,noreferrer');
}

function openConfirmationDialog(listing: Listing, action: 'remove' | 'claim') {
  if (action === 'remove') {
    useUIStore().openConfirmationDialog(
      t('phrases.removeListing', {
        listing: `${listing.title}`,
      }),
      () => myWishlistStore.removeListing(listing._id),
    );
  }
  if (action === 'claim') {
    useUIStore().openConfirmationDialog(
      t('phrases.claimListing', {
        listing: `${listing.title}`,
      }),
      () => myWishlistStore.claimListing(listing._id),
    );
  }
}
</script>

<template>
  <div
    class="wish-card"
    @click="openUrl(listing.url)"
    :class="{ claimed: listing.status === 'claimed' }"
  >
    <UIElementsActionButton
      v-if="listing.status !== 'claimed' && editRights"
      :class="'claim-button'"
      :icon="'mdi-check'"
      :title="$t('words.claim')"
      :color="'claim'"
      @click="() => openConfirmationDialog(listing, 'claim')"
    />
    <UIElementsActionButton
      v-if="listing.status !== 'claimed' && editRights"
      :class="'edit-button'"
      :icon="'mdi-pencil'"
      :title="$t('words.edit')"
      :color="'primary'"
      @click="emit('openEditModal')"
    />
    <UIElementsActionButton
      v-if="listing.status !== 'claimed' && editRights"
      :class="'remove-button'"
      :icon="'mdi-delete'"
      :title="$t('words.remove')"
      :color="'remove'"
      @click="() => openConfirmationDialog(listing, 'remove')"
    />
    <img v-if="!listing?.photo" src="@/assets/images/gift-placeholder.png" />
    <img v-else :src="listing?.photo" :alt="listing.title" />
    <div class="info">
      <h5>
        {{ listing.title }}
      </h5>
    </div>
  </div>
</template>
