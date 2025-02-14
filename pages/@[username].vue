<script lang="ts" setup>
import { onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';
import { useUserPageStore } from '@/stores/userPage';
import { navigateTo, useRuntimeConfig } from 'nuxt/app';

import { useSeoMeta } from 'nuxt/app';
import { register } from 'swiper/element/bundle';
import 'swiper/scss/navigation';
import 'swiper/css';

register();

const { t } = useI18n();
const route = useRoute();
const config = useRuntimeConfig();

useSeoMeta({
  title: `${route.params.username} | ${config.public.PROJECT_NAME}`,
});

const userPageStore = useUserPageStore();
const { state: userPageState } = storeToRefs(userPageStore);

const swiperOptions = {
  slidesPerView: 1,
  loop: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
    },
    480: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    750: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
  },
};

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
              <div
                class="wishes-carousel"
                v-if="userPageState.newListings.length > 0"
              >
                <div class="swiper-button-prev"></div>
                <div class="swiper-button-next"></div>
                <swiper-container v-bind="swiperOptions">
                  <swiper-slide
                    v-for="listing in userPageState.newListings"
                    :key="listing.title"
                  >
                    <div
                      class="wish-item"
                      @click="
                        navigateTo(listing.url, {
                          external: true,
                          open: {
                            target: '_blank',
                          },
                        })
                      "
                    >
                      <img
                        src="@/assets/images/gift-placeholder.png"
                        v-if="!listing?.photo"
                      />
                      <img v-else :src="listing?.photo" />
                      <div class="info">
                        <h5>
                          {{ listing?.title }}
                        </h5>
                      </div>
                    </div>
                  </swiper-slide>
                </swiper-container>
              </div>
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
                <CommonWishlistCard
                  :wishlist="wishlist"
                  :edit-rights="false"
                  v-for="wishlist of userPageState.wishlists"
                />
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
        margin: 0 0 15px 0;

        ::v-deep(h3) {
          margin: 0 0 15px 0;

          > span {
            color: $primary;
          }
        }
        .wishes-carousel {
          max-width: 100%;
          position: relative;

          swiper-slide {
            padding: 5px 0;
            margin: auto;

            .wish-item {
              max-width: 230px;
              margin: 0 auto;
            }
          }
          .swiper-button-prev,
          .swiper-button-next {
            color: $primary;
            opacity: 0;
            transition: all 0.3s ease-in-out;

            &:after {
              font-size: 30px;
            }
          }
          .swiper-button-prev {
            left: -18px;
          }
          .swiper-button-next {
            right: -18px;
          }
          &:hover {
            .swiper-button-prev,
            .swiper-button-next {
              opacity: 1;
            }
          }
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
