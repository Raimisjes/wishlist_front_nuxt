<script lang="ts" setup>
import { onMounted, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';
import { useUserPageStore } from '@/stores/userPage';
import { navigateTo, useRuntimeConfig } from 'nuxt/app';
import 'vue3-carousel/carousel.css';
import { Carousel, Slide, Navigation } from 'vue3-carousel';
import type { Wishlist } from '@/types/wishlist.types';
import { useSeoMeta } from 'nuxt/app';

const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const config = useRuntimeConfig();

useSeoMeta({
  title: `${route.params.username} | ${config.public.PROJECT_NAME}`,
});

const userPageStore = useUserPageStore();
const { state: userPageState } = storeToRefs(userPageStore);

const carouselConfig = {
  itemsToShow: 1,
  gap: 20,
  wrapAround: true,
  breakpoints: {
    750: {
      itemsToShow: 3,
    },
    600: {
      itemsToShow: 2,
      snapAlign: 'start',
    },
  },
};

function viewWishlist(wishlist: Wishlist) {
  router.push({
    path: `/w${wishlist._id}`,
  });
}

onMounted(async () => {
  const userFound = await userPageStore.getUserData(route.params.username);

  if (!userFound) {
    useSeoMeta({
      title: `${t(userPageState.value.page.error)} | ${config.public.PROJECT_NAME}`,
    });
  }
});

onUnmounted(() => {
  userPageStore.clearStore();
});
</script>

<template>
  <main>
    <div class="content-holder user-page">
      <CommonSpinner v-if="userPageState.page?.isLoading" />
      <div v-else>
        <div
          class="page-error"
          v-if="userPageState.page.error != '' || !userPageState.username"
        >
          <v-icon color="primary">mdi-emoticon-cry-outline</v-icon>
          <h2 v-if="userPageState.page.error != ''">
            {{ $t(userPageState.page.error) }}
          </h2>
          <v-btn color="primary" @click="">{{ $t('words.homepage') }}</v-btn>
        </div>
        <div
          class="user-page-holder"
          v-if="!userPageState.page.error && userPageState.username != ''"
        >
          <div class="user-info-block">
            <h1>{{ userPageState.username }}</h1>
            <div class="social-networks">
              <v-icon
                v-for="network of userPageState.socialNetworks"
                v-show="network.active && network.url !== ''"
                :key="network.key"
                @click="navigateTo(network.url, { external: true })"
                :title="t(`socialNetworks.${network.key}`)"
                :class="{ enabled: network.active, disabled: !network.active }"
                >{{ network.icon }}</v-icon
              >
            </div>
            <div class="new-wishes" v-if="userPageState.newListings.length > 0">
              <h3
                id="title"
                v-html="
                  t('phrases.newListingsTitle', {
                    username: `${userPageState.username}`,
                  })
                "
              ></h3>
              <Carousel v-bind="carouselConfig">
                <Slide
                  v-for="listing in userPageState.newListings"
                  :key="listing.title"
                >
                  <div class="wish-item">
                    <img
                      src="@/assets/images/gift-placeholder.png"
                      v-if="!listing?.photo"
                    />
                    <img v-else :src="listing?.photo" />
                    <div class="info">
                      <h5
                        @click="
                          navigateTo(listing.url, {
                            external: true,
                            open: {
                              target: '_blank',
                            },
                          })
                        "
                      >
                        {{ listing?.title }}
                      </h5>
                    </div>
                  </div>
                </Slide>
                <template #addons>
                  <Navigation />
                </template>
              </Carousel>
            </div>
            <div
              class="user-wishlists"
              v-if="userPageState.wishlists.length > 0"
            >
              <h3
                v-html="
                  t('phrases.userWishlists', {
                    username: `${userPageState.username}`,
                  })
                "
              ></h3>
              <div class="wishlists-holder">
                <div
                  class="wishlist-item"
                  v-for="wishlist of userPageState.wishlists"
                >
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
                    <h5 @click="viewWishlist(wishlist)">
                      {{ wishlist.title }}
                    </h5>
                  </div>
                </div>
              </div>
            </div>
            <h4
              class="nothing-to-show"
              v-if="
                userPageState.newListings.length == 0 &&
                userPageState.wishlists.length == 0
              "
            >
              {{ $t('pages.usersPublic.nothingToShow') }}
            </h4>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.user-page {
  .page-error {
    text-align: center;

    .v-icon {
      font-size: 80px;
    }
    h2 {
      margin: 15px 0 30px 0;
    }
  }
  .user-page-holder {
    .user-info-block {
      h1 {
        text-align: center;
        margin: 0 0 15px 0;
      }
      h4.nothing-to-show {
        text-align: center;
      }
      .social-networks {
        margin: 0 0 15px 0;
        text-align: center;

        .fab.fa-tiktok {
          font-size: 18px;
        }
        > .v-icon {
          margin-right: 8px;

          &.enabled {
            color: #000;
          }
          &.disabled {
            color: rgba(0, 0, 0, 0.4);
          }
        }
      }
      .new-wishes {
        column-count: auto;
        grid-template-columns: auto;
        gap: 0;

        ::v-deep(h3) {
          > span {
            color: $primary;
          }
        }
        h3 {
          margin: 0 0 15px 0;
        }
        .wish-item {
          max-width: 260px;
        }
        ::v-deep(.carousel__viewport) {
          padding: 5px 0;
        }
      }
      .user-wishlists {
        ::v-deep(h3) {
          > span {
            color: $primary;
          }
        }
        h3 {
          margin: 0 0 15px 0;
        }
      }
      .new-wishes,
      .user-wishlists {
        h3 {
          @media screen and (max-width: 600px) {
            text-align: center;
          }
        }
      }
    }
  }
}
</style>
