<script lang="ts" setup>
import { useWishlistsStore } from '@/stores/wishlists';
import { ref, watch, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { storeToRefs } from 'pinia';

//@ts-ignore
definePageMeta({
  middleware: 'route-guard',
});

const { t } = useI18n();

const wishlistsStore = useWishlistsStore();
const { state: wishlistsState } = storeToRefs(wishlistsStore);

const viewAddWishlistDialog = ref(false);

watch(viewAddWishlistDialog, (newValue) => {
  if (!newValue) {
    wishlistsStore.clearForm();
  }
});

onUnmounted(() => {
  wishlistsStore.clearForm();
});
</script>

<template>
  <main>
    <div class="content-holder">
      <h1>{{ $t('pages.wishlists.title') }}</h1>
      <div class="wishlists-holder">
        <div
          class="wishlist-item add-new"
          @click="viewAddWishlistDialog = true"
        >
          <v-icon color="primary" :size="50">mdi-plus-circle</v-icon>
          <h5>{{ $t('pages.wishlists.addNewWishlist') }}</h5>
        </div>
        <v-dialog
          max-width="500"
          v-model="viewAddWishlistDialog"
          content-class="wishlist-dialog"
        >
          <v-card>
            <h3>
              {{ $t('pages.wishlists.addNewWishlist') }}
            </h3>
            <div class="form-box">
              <WishlistsPageAddWishlistForm
                @closeModal="viewAddWishlistDialog = false"
              />
            </div>
          </v-card>
        </v-dialog>
        <div
          class="wishlist-item"
          v-for="wishlist of wishlistsState.wishlists"
          @click=""
        >
          <v-btn
            density="comfortable"
            class="remove-button"
            icon="mdi-delete"
            small
            :aria-label="$t('words.remove')"
            color="remove"
            @click=""
          ></v-btn>
          <v-btn
            density="comfortable"
            class="edit-button"
            icon="mdi-pencil"
            small
            :aria-label="$t('words.edit')"
            color="primary"
            @click=""
          ></v-btn>
          <img
            src="@/assets/images/gift-placeholder.png"
            v-if="!wishlist.photos"
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
            <h5>{{ wishlist.title }}</h5>
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
