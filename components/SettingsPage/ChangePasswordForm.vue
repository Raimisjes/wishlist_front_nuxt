<script lang="ts" setup>
import { useUserSettingsStore } from '@/stores/userSettings';
import { storeToRefs } from 'pinia';
import { useTemplateRef, onUnmounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const userSettingsStore = useUserSettingsStore();

const { state: userSettingsState } = storeToRefs(userSettingsStore);
let showChangePassForm = ref(false);

const changePassFormEl = useTemplateRef('changePassFormEl');

const validationRules = {
  passwordRules: [
    (v: string) => !!v || t('errors.validation033'),
    (v: string) =>
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).\S{6,15}$/.test(v) ||
      t('errors.validation008'),
  ],
  passwordRepeatRules: [
    (v: string) =>
      v === useUserSettingsStore().state.changePassword.form.newPassword ||
      t('errors.validation034'),
  ],
};

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
          <v-text-field
            v-model="userSettingsState.changePassword.form.currentPassword"
            :label="$t('pages.settings.currentPassword')"
            :rules="[validationRules.passwordRules[0]]"
            :append-icon="
              userSettingsState.changePassword.form.hideCurrentPassword
                ? 'mdi-eye'
                : 'mdi-eye-off'
            "
            hide-details="auto"
            validate-on="blur"
            variant="underlined"
            color="primary"
            theme="default"
            :type="
              userSettingsState.changePassword.form.hideCurrentPassword
                ? 'password'
                : 'text'
            "
            @click:append="
              () =>
                (userSettingsState.changePassword.form.hideCurrentPassword =
                  !userSettingsState.changePassword.form.hideCurrentPassword)
            "
          ></v-text-field>
        </div>
        <div class="input-holder">
          <v-text-field
            v-model="userSettingsState.changePassword.form.newPassword"
            :label="$t('pages.settings.newPassword')"
            :rules="validationRules.passwordRules"
            :append-icon="
              userSettingsState.changePassword.form.hideNewPassword
                ? 'mdi-eye'
                : 'mdi-eye-off'
            "
            hide-details="auto"
            validate-on="blur"
            variant="underlined"
            color="primary"
            theme="default"
            :type="
              userSettingsState.changePassword.form.hideNewPassword
                ? 'password'
                : 'text'
            "
            @click:append="
              () =>
                (userSettingsState.changePassword.form.hideNewPassword =
                  !userSettingsState.changePassword.form.hideNewPassword)
            "
          ></v-text-field>
        </div>
        <div class="input-holder">
          <v-text-field
            v-model="userSettingsState.changePassword.form.newRepeated"
            :label="$t('pages.settings.newRepeatedPassword')"
            :rules="[
              ...validationRules.passwordRules,
              ...validationRules.passwordRepeatRules,
            ]"
            :append-icon="
              userSettingsState.changePassword.form.hideRepeatedPassword
                ? 'mdi-eye'
                : 'mdi-eye-off'
            "
            hide-details="auto"
            validate-on="blur"
            variant="underlined"
            color="primary"
            theme="default"
            :type="
              userSettingsState.changePassword.form.hideRepeatedPassword
                ? 'password'
                : 'text'
            "
            @click:append="
              () =>
                (userSettingsState.changePassword.form.hideRepeatedPassword =
                  !userSettingsState.changePassword.form.hideRepeatedPassword)
            "
          ></v-text-field>
        </div>
        <div class="button-holder">
          <v-btn
            :disabled="userSettingsState.changePassword.form.isLoading"
            :loading="userSettingsState.changePassword.form.isLoading"
            color="primary"
            block
            :title="$t('words.change')"
            type="submit"
            >{{ $t('words.change') }}</v-btn
          >
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
