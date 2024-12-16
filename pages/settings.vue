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
    background-color: #f8fffd;
    border-radius: 20px;
    padding: 40px;
    box-shadow:
      rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
      rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
    max-width: 800px;
    width: 100%;
    margin: auto;

    > h1 {
      margin: 0 0 20px 0;
    }
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
    @media screen and (max-width: 450px) {
      padding: 20px;
    }
  }
}
.rotate180 {
  transform: rotate(180deg);
}
</style>
