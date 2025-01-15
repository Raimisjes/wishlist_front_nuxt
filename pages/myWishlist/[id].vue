<script lang="ts" setup>
import { useMyWishlistStore } from '@/stores/myWishlist';
import { ref, watch, onUnmounted, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';

//@ts-ignore
definePageMeta({
  middleware: 'route-guard',
});

const { t } = useI18n();
const route = useRoute();

const myWishlistStore = useMyWishlistStore();
const { state: myWishlistState } = storeToRefs(myWishlistStore);

const viewAddWishDialog = ref(false);

watch(viewAddWishDialog, (newValue) => {
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
        <div class="wish-item add-new" @click="viewAddWishDialog = true">
          <v-icon color="primary" :size="50">mdi-plus-circle</v-icon>
          <h5>{{ $t('pages.myWishlist.addNewWish') }}</h5>
        </div>
        <v-dialog
          max-width="500"
          v-model="viewAddWishDialog"
          content-class="wishlist-dialog"
        >
          <v-card>
            <h3>
              {{ $t('pages.myWishlist.addNewWish') }}
            </h3>
            <div class="form-box">
              <MyWishlistPageCheckURLForm />
              <MyWishlistPageAddWishForm
                :wishlistId="route.params.id"
                @closeModal="viewAddWishDialog = false"
              />
            </div>
          </v-card>
        </v-dialog>
        <div
          class="wishlist-item"
          v-if="myWishlistState.currentWishlist.listings?.length > 0"
          v-for="listing of myWishlistState.currentWishlist.listings"
        >
          <img
            src="@/assets/images/gift-placeholder.png"
            v-if="!listing['photo']"
          />
          <img v-else :src="listing['photo']" />
          <div class="info">
            <h5>{{ listing['title'] }}</h5>
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
