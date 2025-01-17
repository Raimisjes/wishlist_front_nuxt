<script lang="ts" setup>
import { useWishlistsStore } from '@/stores/wishlists';
import { useUIStore } from '@/stores/ui';
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

function openModal(action: string, selectedWishlist?: Wishlist): void {
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

function viewWishlist(wishlist: Wishlist) {
  router.push({
    path: `/mywishlist/${wishlist._id}`,
  });
}

function openConfirmationDialog(wishlist: Wishlist) {
  useUIStore().openConfirmationDialog(
    t('phrases.removeWishlist', {
      wishlist: `${wishlist.title}`,
    }),
    () => useWishlistsStore().removeWishlist(wishlist._id),
  );
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
      <div class="spinner-holder" v-if="wishlistsState.page?.isLoading">
        <v-progress-circular
          :size="35"
          :width="2"
          color="primary"
          indeterminate
        ></v-progress-circular>
      </div>
      <div class="wishlists-holder" v-else>
        <div class="wishlist-item add-new" @click="openModal('add')">
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
        <div class="wishlist-item" v-for="wishlist of wishlistsState.wishlists">
          <UIElementsActionButton
            :class="'edit-button'"
            :icon="'mdi-pencil'"
            :title="$t('words.edit')"
            :color="'primary'"
            @click="() => openModal('edit', wishlist)"
          />
          <UIElementsActionButton
            :class="'remove-button'"
            :icon="'mdi-delete'"
            :title="$t('words.remove')"
            :color="'remove'"
            @click="() => openConfirmationDialog(wishlist)"
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
            <v-carousel-item
              v-for="photo of wishlist.photos"
              :src="photo"
              cover
            ></v-carousel-item>
          </v-carousel>
          <div class="info">
            <span class="chip">
              {{ $t(`words.${wishlist.availabilityStatus}`) }}
            </span>
            <h5 @click="viewWishlist(wishlist)">{{ wishlist.title }}</h5>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style lang="scss">
main {
  .content-holder {
    background-color: #f8fffd;
    border-radius: 20px;
    padding: 40px;
    box-shadow:
      rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
      rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
    max-width: 800px;
    width: 100%;
    margin: auto;

    > h1 {
      margin: 0 0 20px 0;
    }
    @media screen and (max-width: 600px) {
      padding: 20px;
    }
  }
}
</style>
