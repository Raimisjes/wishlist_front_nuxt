<script lang="ts" setup>
import { onMounted, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';
import { useUserPageStore } from '@/stores/userPage';
import { navigateTo } from 'nuxt/app';

const { t } = useI18n();
const route = useRoute();
const router = useRouter();

const userPageStore = useUserPageStore();
const { state: userPageState } = storeToRefs(userPageStore);

function openUrl(url: string) {
  window.open(url, '_blank', 'noopener,noreferrer');
}

onMounted(async () => {
  await userPageStore.getWishlistData(route.params.wishlistId);
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
            <h1>
              <span @click="router.push(`/@${userPageState.username}`)">{{
                userPageState.username
              }}</span>
            </h1>
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
            <div
              class="user-wishes"
              v-if="userPageState.currentWishlist.listings?.length > 0"
            >
              <h3>{{ userPageState.currentWishlist.title }}</h3>
              <div class="wish-holder">
                <div
                  class="wish-item"
                  v-for="listing of userPageState.currentWishlist.listings"
                  @click="openUrl(listing.url)"
                >
                  <img
                    src="@/assets/images/gift-placeholder.png"
                    v-if="!listing?.photo"
                  />
                  <img v-else :src="listing?.photo" />
                  <div class="info">
                    <h5>
                      {{ listing.title }}
                    </h5>
                  </div>
                </div>
              </div>
            </div>
            <h4
              class="nothing-to-show"
              v-if="
                !userPageState.currentWishlist ||
                userPageState.currentWishlist.listings == 0
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
        cursor: pointer;
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
      .user-wishes {
        ::v-deep(h3) {
          > span {
            color: $primary;
          }
        }
        h3 {
          margin: 0 0 15px 0;

          @media screen and (max-width: 600px) {
            text-align: center;
          }
        }
      }
    }
  }
}
</style>
