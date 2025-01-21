<script lang="ts" setup>
//@ts-ignore
definePageMeta({
  middleware: 'route-guard',
});
</script>

<template>
  <main>
    <div class="content-holder">
      <h1>{{ $t('pages.settings.title') }}</h1>
      <SettingsPageUserInfoBlock />
      <SettingsPageSocialNetworksForm />
      <SettingsPageChangePasswordForm />
    </div>
  </main>
</template>

<style lang="scss">
main {
  .content-holder {
    form {
      max-width: 250px;

      h3 {
        margin: 0 0 15px 0;
        cursor: pointer;

        .v-icon {
          transition: all 0.2s ease-in-out;
        }
      }
      .form-box {
        overflow: hidden;
        margin: 0 0 30px 0;
      }
      .button-holder {
        margin: 15px 0 0 0;
      }
    }
  }
}
.rotate180 {
  transform: rotate(180deg);
}
</style>
