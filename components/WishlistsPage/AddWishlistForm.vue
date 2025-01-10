<script lang="ts" setup>
import { useWishlistsStore } from '@/stores/wishlists';
import { useTemplateRef } from 'vue';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const wishlistsStore = useWishlistsStore();
const { state: wishlistsState } = storeToRefs(wishlistsStore);

const addWishlistFormEl = useTemplateRef('addWishlistFormEl');

const validationRules = {
  titleRules: [
    (v: string) => !!v || t('errors.validation013'),
    (v: string) => v.length <= 160 || t('errors.validation014'),
  ],
  descriptionRules: [
    (v: string) => v.length <= 500 || t('errors.validation015'),
  ],
};

async function addWishlist() {
  let validateStatus = await addWishlistFormEl.value?.validate();
  if (!validateStatus || !validateStatus.valid) return;

  const result = await wishlistsStore.addWishlist();
  if (result) {
    closeModal();
  }
}

const emit = defineEmits(['closeModal']);

const closeModal = () => {
  emit('closeModal');
};
</script>

<template>
  <v-form @submit.prevent="addWishlist()" ref="addWishlistFormEl">
    <div class="input-holder">
      <v-text-field
        v-model="wishlistsState.form.title"
        :label="$t('pages.wishlists.wishlistTitle')"
        :rules="validationRules.titleRules"
        hide-details="auto"
        validate-on="blur"
        variant="underlined"
        color="primary"
        theme="default"
        type="text"
        maxlength="160"
      ></v-text-field>
    </div>
    <div class="input-holder">
      <v-textarea
        v-model="wishlistsState.form.description"
        :label="$t('pages.wishlists.wishlistDescription')"
        :rules="validationRules.descriptionRules"
        hide-details="auto"
        validate-on="blur"
        variant="underlined"
        color="primary"
        theme="default"
        type="text"
        no-resize
        rows="2"
        auto-grow
        maxlength="500"
      ></v-textarea>
    </div>
    <div class="input-holder">
      <v-switch
        v-model="wishlistsState.form.availabilityStatus"
        color="primary"
        hide-details
        true-value="public"
        false-value="private"
        :label="
          wishlistsState.form.availabilityStatus === 'public'
            ? $t('words.public')
            : $t('words.private')
        "
      ></v-switch>
    </div>
    <div class="button-holder">
      <v-btn
        :disabled="wishlistsState.form.isLoading"
        :loading="wishlistsState.form.isLoading"
        color="primary"
        :title="$t('words.save')"
        type="submit"
        >{{ $t('words.save') }}</v-btn
      >
      <v-btn text="Close" @click="closeModal()"></v-btn>
    </div>
    <div class="form-error-holder" v-if="wishlistsState.form.error">
      {{ $t(wishlistsState.form.error) }}
    </div>
  </v-form>
</template>

<style lang="scss">
.wishlist-dialog {
  > .v-card {
    padding: 25px;

    h3 {
      margin: 0 0 15px 0;
    }
    .form-box {
      .button-holder {
        button {
          margin: 0 15px 0 0;
        }
      }
    }
  }
}
</style>
