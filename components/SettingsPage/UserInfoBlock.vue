<script lang="ts" setup>
import { useUserStore } from '@/stores/user';
import { useUIStore } from '@/stores/ui';
import { storeToRefs } from 'pinia';
import { useRuntimeConfig } from 'nuxt/app';

const config = useRuntimeConfig();

const userStore = useUserStore();

const { state: userState } = storeToRefs(userStore);

function copyLink(value: string): void {
  navigator.clipboard.writeText(value);
  useUIStore().showSnackbar('pages.settings.linkCopied', 2000);
}
</script>

<template>
  <div class="account-info-block">
    <div class="avatar">{{ userState.username[0] }}</div>
    <div class="info">
      <h4 class="username">{{ userState.username }}</h4>
      <h6 class="email" v-if="userState.email !== ''">
        {{ userState.email }}
      </h6>
    </div>
  </div>
  <div class="copy-link">
    <h5>{{ $t('pages.settings.personalPage') }}:</h5>
    <div>
      {{ config.public.PROJECT_NAME }}/@{{ userState.username
      }}<v-icon
        @click="
          copyLink(`${config.public.PROJECT_NAME}/@${userState.username}`)
        "
        >mdi-content-copy</v-icon
      >
    </div>
  </div>
</template>

<style lang="scss" scoped>
.account-info-block {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  margin: 0 0 15px 0;

  .avatar {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background-color: $primary;
    border: 1px solid #d7d6d6;
    color: #fff;
    font-weight: 500;
    font-size: 24px;
    text-transform: capitalize;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
  }
  .info {
    display: flex;
    flex-flow: column nowrap;

    .email {
      font-size: 13px;
    }
  }
}
.copy-link {
  margin: 0 0 15px 0;

  > h5 {
    margin: 0 0 5px 0;
  }
  > div {
    font-size: 13px;
    display: flex;
    align-items: center;
    font-weight: 500;
    color: $text_color_light;
  }
  .v-icon {
    cursor: pointer;
    margin-left: 5px;
    font-size: 16px;
    transition: all 0.2s ease-in-out;

    &:hover {
      color: $primary;
    }
  }
}
</style>
