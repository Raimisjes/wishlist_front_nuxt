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
      <div class="spinner-holder" v-if="myWishlistState.page?.isLoading">
        <v-progress-circular
          :size="35"
          :width="2"
          color="primary"
          indeterminate
        ></v-progress-circular>
      </div>
      <div class="wish-holder" v-else>
        <div class="wish-item add-new" @click="openModal('add')">
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
        <div
          class="wishlist-item"
          v-if="myWishlistState.currentWishlist.listings?.length > 0"
          v-for="listing of myWishlistState.currentWishlist.listings"
        >
          <v-btn
            density="comfortable"
            class="remove-button"
            icon="mdi-delete"
            small
            :aria-label="$t('words.remove')"
            color="remove"
            @click="
              useUIStore().openConfirmationDialog(
                $t('phrases.removeListing', {
                  listing: `${listing.title}`,
                }),
                () => myWishlistStore.removeListing(listing._id),
              )
            "
          ></v-btn>
          <v-btn
            density="comfortable"
            class="edit-button"
            icon="mdi-pencil"
            small
            :aria-label="$t('words.edit')"
            color="primary"
            @click="openModal('edit', listing)"
          ></v-btn>
          <img
            src="@/assets/images/gift-placeholder.png"
            v-if="!listing?.photo"
          />
          <img v-else :src="listing?.photo" />
          <div class="info">
            <h5>{{ listing?.title }}</h5>
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
      position: relative;

      a {
        position: absolute;
        right: 0;
        top: 15px;
        font-size: 14px;

        .v-icon {
          margin-right: 5px;
          bottom: 1px;
          transition: all 0.2s ease-in-out;
        }
        &:hover {
          .v-icon {
            transform: translateX(-3px);
          }
        }
      }
    }
    @media screen and (max-width: 600px) {
      padding: 20px;
    }
  }
}
</style>
