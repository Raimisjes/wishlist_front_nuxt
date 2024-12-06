<script lang="ts" setup>
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();

const { state: userState } = storeToRefs(userStore);
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
</style>
