<script lang="ts" setup></script>

<template>
  <header>
    <NuxtLink
      to="/"
      :aria-label="$t('components.header.homepage')"
      class="homepage-link"
      ><img src="@/assets/site-logo.png" alt="Logo"
    /></NuxtLink>
    <div class="buttons-holder">
      <v-btn
        color="primary"
        prepend-icon="mdi-account"
        size="small"
        :title="$t('words.login')"
        class="bubu"
        >{{ $t('words.login') }}</v-btn
      >
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

  @media screen and (max-width: 600px) {
    .homepage-link {
      img {
        max-height: 35px;
      }
    }
  }
}
</style>
