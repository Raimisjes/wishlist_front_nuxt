<script lang="ts" setup>
import { useMyWishlistStore } from '@/stores/myWishlist';
import { useUIStore } from '@/stores/ui';
import { ref, watch, onUnmounted, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import type { Listing } from '@/types/listing.types';

//@ts-ignore
definePageMeta({
  middleware: 'route-guard',
});

const { t } = useI18n();
const route = useRoute();

const myWishlistStore = useMyWishlistStore();
const { state: myWishlistState } = storeToRefs(myWishlistStore);

const viewSaveWishDialog = ref(false);
const saveModalAction = ref<null | string>(null);

function openModal(action: string, selectedListing?: Listing): void {
  if (action == 'edit' && selectedListing) {
    formFill(selectedListing);
  }
  viewSaveWishDialog.value = true;
  saveModalAction.value = action;
}

function formFill(listing: Listing): void {
  myWishlistState.value.form.show = true;
  myWishlistState.value.checkURLForm.url = listing.url;
  myWishlistState.value.form.title = listing.title;
  myWishlistState.value.form.description = listing.description;
  myWishlistState.value.form.selectedId = listing._id;
  myWishlistState.value.form.photo = listing.photo;
}

watch(viewSaveWishDialog, (newValue) => {
  if (!newValue) {
    myWishlistStore.clearForm();
    myWishlistStore.clearCheckURLForm();
  }
});

onMounted(async () => {
  await myWishlistStore.getWishlistData(route.params.id);
});

onUnmounted(() => {
  myWishlistStore.clearStore();
  saveModalAction.value = null;
});
</script>

<template>
  <main>
    <div class="content-holder">
      <h1
        class="title-with-back-button"
        v-if="
          myWishlistState.currentWishlist.title != '' &&
          !myWishlistState.page?.isLoading
        "
      >
        {{ myWishlistState.currentWishlist.title }}
        <NuxtLink
          to="/wishlists"
          :aria-label="$t('words.back')"
          class="back-link"
          ><v-icon color="primary" size="15">mdi-arrow-left</v-icon
          >{{ $t('words.back') }}</NuxtLink
        >
      </h1>
      <p
        class="wishlist-description"
        v-if="
          myWishlistState.currentWishlist.description != '' &&
          !myWishlistState.page?.isLoading
        "
      >
        {{ myWishlistState.currentWishlist.description }}
      </p>
      <CommonSpinner v-if="myWishlistState.page?.isLoading" />
      <div class="wish-holder" v-else>
        <div class="wish-card add-new" @click="openModal('add')">
          <v-icon color="primary" :size="50">mdi-plus-circle</v-icon>
          <h5>{{ $t('pages.myWishlist.addNewWish') }}</h5>
        </div>
        <v-dialog
          max-width="500"
          v-model="viewSaveWishDialog"
          content-class="wishlist-dialog"
        >
          <v-card>
            <h3>
              {{ $t('pages.myWishlist.addNewWish') }}
            </h3>
            <div class="form-box">
              <MyWishlistPageCheckURLForm />
              <MyWishlistPageSaveWishForm
                :saveModalAction="saveModalAction"
                :wishlistId="route.params.id"
                @closeModal="viewSaveWishDialog = false"
              />
            </div>
          </v-card>
        </v-dialog>
        <CommonWishCard
          v-for="listing of myWishlistState.currentWishlist.listings"
          :key="listing.id"
          :listing="listing"
          :edit-rights="true"
          @openEditModal="openModal('edit', listing)"
        />
      </div>
    </div>
  </main>
</template>

<style lang="scss"></style>
