<script lang="ts" setup>
import { useUserStore } from '@/stores/user';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();
const { state: userState } = storeToRefs(userStore);

const logout = async function (e: Event): Promise<void> {
  e.preventDefault();
  useAuthStore().logout();
};
</script>

<template>
  <header>
    <NuxtLink
      to="/"
      :aria-label="$t('components.header.homepage')"
      class="homepage-link"
      ><CommonLogo
    /></NuxtLink>
    <div class="buttons-holder" v-if="!userState.authenticated">
      <v-btn
        color="primary"
        prepend-icon="mdi-account"
        size="small"
        :title="$t('words.login')"
        :to="'/login'"
        >{{ $t('words.login') }}</v-btn
      >
    </div>
    <div
      class="menu-holder"
      v-if="userState.authenticated && userState.username !== ''"
    >
      <v-menu>
        <template v-slot:activator="{ props }">
          <b class="username" v-bind="props">@{{ userState.username }}</b>
        </template>
        <v-list class="header-menu">
          <v-list-item>
            <NuxtLink
              to="/wishlists"
              :aria-label="$t('components.header.wishlists')"
            >
              <v-icon>mdi-heart</v-icon>
              {{ $t('components.header.wishlists') }}
            </NuxtLink>
          </v-list-item>
          <v-list-item>
            <NuxtLink
              to="/settings"
              :aria-label="$t('components.header.settings')"
            >
              <v-icon>mdi-cog</v-icon>
              {{ $t('components.header.settings') }}
            </NuxtLink>
          </v-list-item>
          <v-list-item>
            <a
              @click="logout($event)"
              :aria-label="$t('components.header.logout')"
            >
              <v-icon>mdi-logout</v-icon>
              {{ $t('components.header.logout') }}
            </a>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
  </header>
</template>

<style lang="scss" scoped>
header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  height: 70px;

  .homepage-link {
    display: flex;

    svg {
      max-height: 32px;
    }
  }

  .buttons-holder {
    button {
      margin-left: 15px;
      font-size: 14px;
      text-transform: lowercase;
      height: auto;
      min-height: 35px;

      &:deep(.v-icon) {
        font-size: 22px;
      }
    }
  }

  .menu-holder {
    .username {
      cursor: pointer;
    }
  }

  @media screen and (max-width: 600px) {
    .homepage-link {
      svg {
        max-height: 24px;
      }
    }
  }
}
.header-menu {
  padding: 0;

  .v-list-item {
    min-height: 40px;
  }
  a {
    color: #000;
    text-decoration: none;
    cursor: pointer;
    display: flex;
    align-items: center;

    .v-icon {
      margin-right: 8px;
    }
    &:hover {
      color: $primary;
    }
  }
}
</style>
