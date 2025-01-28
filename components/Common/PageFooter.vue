<script lang="ts" setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<template>
  <footer>
    <div class="left">
      <a aria-label="Instagram" href="#"><v-icon>mdi-instagram</v-icon></a>
      <a aria-label="Facebook" href="#"><v-icon>mdi-facebook</v-icon></a>
    </div>
    <div class="right">
      <NuxtLink
        :aria-label="$t('components.footer.termsOfUse')"
        to="/termsofuse"
        >{{ $t('components.footer.termsOfUse') }}</NuxtLink
      >
      <NuxtLink
        :aria-label="$t('components.footer.privacyPolicy')"
        to="/privacypolicy"
        >{{ $t('components.footer.privacyPolicy') }}</NuxtLink
      >
    </div>
  </footer>
</template>

<style lang="scss" scoped>
footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  margin-top: 20px;
  padding: 0 0 10px 0;

  .left {
    display: flex;
    flex-flow: row nowrap;
  }
  .right {
    flex-flow: column nowrap;
    display: flex;
    text-align: right;

    a {
      font-size: 14px;
    }
  }
  a {
    margin: 0 2px;
    color: #454545;
    transition: color 0.2s ease-in-out;

    &:hover {
      color: #00b565;
    }
  }
  @media screen and (max-width: 450px) {
    justify-content: center;
    flex-flow: column wrap;
  }
}
</style>
