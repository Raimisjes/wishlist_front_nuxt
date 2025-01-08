<script lang="ts" setup>
import { useMyWishlistStore } from '@/stores/myWishlist';
import { ref, watch, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';

//@ts-ignore
definePageMeta({
  middleware: 'route-guard',
});

const { t } = useI18n();

const myWishlistStore = useMyWishlistStore();

const viewAddWishDialog = ref(false);

watch(viewAddWishDialog, (newValue) => {
  if (!newValue) {
    myWishlistStore.clearForm();
    myWishlistStore.clearCheckURLForm();
  }
});

onUnmounted(() => {
  myWishlistStore.clearStore();
});
</script>

<template>
  <main>
    <div class="content-holder">
      <h1>{{ $t('pages.myWishlist.title') }}</h1>
      <div class="wishlist-holder">
        <div class="wishlist-item add-new" @click="viewAddWishDialog = true">
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
                @closeModal="viewAddWishDialog = false"
              />
            </div>
          </v-card>
        </v-dialog>
        <!-- placeholder for wishlist items -->
        <!-- <div class="wishlist-item">
          <img
            src="https://www.varle.lt/static/uploads/products/572/gru/gruzdintuve-gift-xiaomi-sound-pocket-0df27f1049.png"
          />
          <h5>Nešiojama kolonėlė Xiaomi Sound Pocket 5W IP67</h5>
        </div> -->
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
    .wishlist-holder {
      display: block;
      column-count: 3;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 20px;

      .wishlist-item {
        max-width: 100%;
        margin: 0 0 15px 0;
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        padding: 10px;
        border-radius: 8px;
        box-shadow:
          rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
          rgba(60, 64, 67, 0.1) 0px 2px 6px 2px;
        //border: 1px solid #e2e2e2;
        cursor: pointer;
        transition: all 0.2s ease-in-out;
        background: white;
        -webkit-transform-origin: 50% 51%;

        &.add-new {
          height: 150px;
        }
        img {
          max-width: 100%;
          background-color: #e1e1e1;
          border-radius: 8px;
          margin: 0 0 10px;
        }
        h5 {
          color: $text_color_light;
          font-weight: 500;
          font-size: 12px;
        }
        &:hover {
          // box-shadow:
          //   rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
          //   rgba(60, 64, 67, 0.1) 0px 2px 6px 2px;

          &:nth-child(odd) {
            transform: rotate(-1deg);
          }
          &:nth-child(even) {
            transform: rotate(1deg);
          }
        }
      }
    }
    @media screen and (max-width: 600px) {
      .wishlist-holder {
        column-count: 2;
        gap: 10px;

        .wishlist-item {
          padding: 7px;
        }
      }
    }
    @media screen and (max-width: 450px) {
      padding: 20px;
    }
  }
}

.wishlist-dialog {
  > .v-card {
    padding: 25px;

    h3 {
      margin: 0 0 15px 0;
    }
    .form-box {
      .button-holder {
        button {
          margin: 0 15px 0 0;
        }
      }
    }
  }
}
</style>
