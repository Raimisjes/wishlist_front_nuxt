<script lang="ts" setup>
import { useMyWishlistStore } from '@/stores/myWishlist';
import { useTemplateRef } from 'vue';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';
import { createValidationRules } from '~/composables/validationRules';

const { t } = useI18n();

const myWishlistStore = useMyWishlistStore();
const { state: myWishlistState } = storeToRefs(myWishlistStore);

const checkURLForm = useTemplateRef('checkURLFormEl');

const validationRules = createValidationRules(t);

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
      <UIElementsTextField
        :state="myWishlistState.checkURLForm"
        :model-path="'url'"
        :label="$t('pages.myWishlist.enterURL')"
        :rules="validationRules.urlRules"
        :placeholder="'https://'"
      />
      <UIElementsButton
        :is-disabled="myWishlistState.checkURLForm.isLoading"
        :is-loading="myWishlistState.checkURLForm.isLoading"
        :title="$t('words.checkURL')"
      />
    </div>
    <div class="form-error-holder" v-if="myWishlistState.checkURLForm.error">
      {{ $t(myWishlistState.checkURLForm.error) }}
    </div>
  </v-form>
</template>

<style lang="scss"></style>
