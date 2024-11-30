<script lang="ts" setup>
import { useUserStore } from '@/stores/user';

const userState = useUserStore().state.user;
</script>

<template>
  <header>
    <NuxtLink
      to="/"
      :aria-label="$t('components.header.homepage')"
      class="homepage-link"
      ><img src="@/assets/images/site-logo.png" alt="Logo"
    /></NuxtLink>
    <div class="buttons-holder" v-if="!userState.logged">
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
      v-if="userState.logged && userState.username !== ''"
    >
      <v-menu>
        <template v-slot:activator="{ props }">
          <b class="username" v-bind="props">@{{ userState.username }}</b>
        </template>
        <v-list class="header-menu">
          <v-list-item>
            <NuxtLink to="/logout" :aria-label="$t('components.header.logout')">
              <v-icon>mdi-logout</v-icon>
              {{ $t('components.header.logout') }}
            </NuxtLink>
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

    img {
      max-height: 50px;
      width: 100%;
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
      img {
        max-height: 35px;
      }
    }
  }
}
.header-menu {
  padding: 0;
  
  a {
    color: #000;
    text-decoration: none;

    .v-icon {
      margin-right: 8px;
    }
    &:hover {
      color: $primary;
    }
  }
}
</style>
