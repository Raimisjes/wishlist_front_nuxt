<script lang="ts" setup>
import { useUserSettingsStore } from '@/stores/userSettings';
import { storeToRefs } from 'pinia';
import { useTemplateRef, onUnmounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { createValidationRules } from '@/utils/validationRules';

const { t } = useI18n();

const userSettingsStore = useUserSettingsStore();

const { state: userSettingsState } = storeToRefs(userSettingsStore);
let showChangePassForm = ref(false);

const changePassFormEl = useTemplateRef('changePassFormEl');

const validationRules = createValidationRules(t);

const passwordRepeatRules = [
  (v: string) =>
    v === userSettingsState.value.changePassword.form.newPassword ||
    t('errors.validation034'),
];

async function submitChangePass() {
  let validateStatus = await changePassFormEl.value?.validate();
  if (!validateStatus || !validateStatus.valid) return;
  const result = await userSettingsStore.changePassword();
  result ? (showChangePassForm.value = false) : '';
}

onUnmounted(() => {
  userSettingsStore.clearChangePasswordForm();
});
</script>

<template>
  <v-form @submit.prevent="submitChangePass()" ref="changePassFormEl">
    <h3 @click="showChangePassForm = !showChangePassForm">
      {{ $t('pages.settings.changePassword') }}
      <v-icon :class="{ rotate180: showChangePassForm }"
        >mdi-chevron-down</v-icon
      >
    </h3>
    <Transition name="expand">
      <div v-if="showChangePassForm" class="form-box">
        <div class="input-holder">
          <UIElementsTextField
            :state="userSettingsState.changePassword.form"
            :model-path="'currentPassword'"
            :label="$t('pages.settings.currentPassword')"
            :rules="[validationRules.passwordRules[0]]"
            :field-type="'password'"
          />
        </div>
        <div class="input-holder">
          <UIElementsTextField
            :state="userSettingsState.changePassword.form"
            :model-path="'newPassword'"
            :label="$t('pages.settings.newPassword')"
            :rules="validationRules.passwordRules"
            :field-type="'password'"
          />
        </div>
        <div class="input-holder">
          <UIElementsTextField
            :state="userSettingsState.changePassword.form"
            :model-path="'newRepeated'"
            :label="$t('pages.settings.newRepeatedPassword')"
            :rules="[...validationRules.passwordRules, ...passwordRepeatRules]"
            :field-type="'password'"
          />
        </div>
        <div class="button-holder">
          <UIElementsButton
            :is-disabled="userSettingsState.changePassword.form.isLoading"
            :is-loading="userSettingsState.changePassword.form.isLoading"
            :is-block="true"
            :title="$t('words.change')"
          />
        </div>
        <div
          class="form-error-holder"
          v-if="userSettingsState.changePassword.form.error"
        >
          {{ $t(userSettingsState.changePassword.form.error) }}
        </div>
      </div>
    </Transition>
  </v-form>
</template>

<style lang="scss"></style>
