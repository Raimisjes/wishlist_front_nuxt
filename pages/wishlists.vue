<script lang="ts" setup>
import { useWishlistsStore } from '@/stores/wishlists';
import { ref, watch, onUnmounted, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import type { Wishlist } from '@/types/wishlist.types';

//@ts-ignore
definePageMeta({
  middleware: 'route-guard',
});

const router = useRouter();
const { t } = useI18n();

const wishlistsStore = useWishlistsStore();
const { state: wishlistsState } = storeToRefs(wishlistsStore);

const viewSaveWishlistDialog = ref(false);
const saveModalAction = ref<null | string>(null);

function openWishlistModal(action: string, selectedWishlist?: Wishlist): void {
  if (action == 'edit' && selectedWishlist) {
    formFill(selectedWishlist);
  }
  viewSaveWishlistDialog.value = true;
  saveModalAction.value = action;
}

function formFill(wishlist: Wishlist): void {
  wishlistsState.value.form.title = wishlist.title;
  wishlistsState.value.form.description = wishlist.description;
  wishlistsState.value.form.availabilityStatus = wishlist.availabilityStatus;
  wishlistsState.value.form.selectedId = wishlist._id;
}

watch(viewSaveWishlistDialog, (newValue) => {
  if (!newValue) {
    wishlistsStore.clearForm();
    saveModalAction.value = null;
  }
});

onMounted(async () => {
  await wishlistsStore.getWishlists();
});

onUnmounted(() => {
  wishlistsStore.clearForm();
  saveModalAction.value = null;
});
</script>

<template>
  <main>
    <div class="content-holder">
      <h1>{{ $t('pages.wishlists.title') }}</h1>
      <CommonSpinner v-if="wishlistsState.page?.isLoading" />
      <div class="wishlists-holder" v-else>
        <div class="wishlist-card add-new" @click="openWishlistModal('add')">
          <v-icon color="primary" :size="50">mdi-plus-circle</v-icon>
          <h5>{{ $t('pages.wishlists.addNewWishlist') }}</h5>
        </div>
        <v-dialog
          max-width="500"
          v-model="viewSaveWishlistDialog"
          content-class="wishlist-dialog"
        >
          <v-card>
            <h3>
              {{
                saveModalAction == 'add'
                  ? $t('pages.wishlists.addNewWishlist')
                  : $t('pages.wishlists.editWishlist')
              }}
            </h3>
            <div class="form-box">
              <WishlistsPageSaveWishlistForm
                :saveModalAction="saveModalAction"
                @closeModal="viewSaveWishlistDialog = false"
              />
            </div>
          </v-card>
        </v-dialog>
        <CommonWishlistCard
          :wishlist="wishlist"
          :edit-rights="true"
          v-for="wishlist of wishlistsState.wishlists"
          @openEditModal="openWishlistModal('edit', wishlist)"
        />
      </div>
    </div>
  </main>
</template>

<style lang="scss"></style>
