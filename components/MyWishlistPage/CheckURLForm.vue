<script lang="ts" setup>
import { useMyWishlistStore } from '@/stores/myWishlist';
import { useTemplateRef } from 'vue';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const myWishlistStore = useMyWishlistStore();
const { state: myWishlistState } = storeToRefs(myWishlistStore);

const checkURLForm = useTemplateRef('checkURLFormEl');

const validationRules = {
  urlRules: [
    (v: string) =>
      /^(?:(?:(?:https?|ftp):\/\/)?(?:www\.)?[a-z0-9-]+(?:\.[a-z0-9-]+)+[^\s]*)?$/i.test(
        v,
      ) || t('errors.validation011'),
  ],
};

async function checkURL() {
  let validateStatus = await checkURLForm.value?.validate();
  if (!validateStatus || !validateStatus.valid) return;
  myWishlistState.value.form.show = false;
  myWishlistState.value.form.show = await myWishlistStore.checkURL();
}
</script>

<template>
  <v-form @submit.prevent="checkURL()" ref="checkURLFormEl">
    <div class="input-holder row">
      <v-text-field
        v-model="myWishlistState.checkURLForm.url"
        :label="$t('pages.myWishlist.enterURL')"
        :rules="validationRules.urlRules"
        placeholder="https://"
        hide-details="auto"
        validate-on="blur"
        variant="underlined"
        color="primary"
        theme="default"
        type="text"
      ></v-text-field>
      <v-btn
        :disabled="myWishlistState.checkURLForm.isLoading"
        :loading="myWishlistState.checkURLForm.isLoading"
        color="primary"
        :title="$t('words.checkURL')"
        type="submit"
        >{{ $t('words.checkURL') }}</v-btn
      >
    </div>
    <div class="form-error-holder" v-if="myWishlistState.checkURLForm.error">
      {{ $t(myWishlistState.checkURLForm.error) }}
    </div>
  </v-form>
</template>

<style lang="scss"></style>
