<script lang="ts" setup></script>

<template>
  <div class="container">
    <CommonSnackbar />
    <CommonConfirmationDialog />
    <CommonPageHeader />
    <NuxtPage />
    <CommonPageFooter />
  </div>
</template>

<style lang="scss">
.container {
  max-width: 1200px;
  padding: 0 15px;
  margin: 0 auto;
  display: grid;
  grid-template-rows: 70px auto 55px;
  min-height: 100vh;

  main {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
  }
}
</style>
