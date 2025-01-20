<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { useTemplateRef, onUnmounted } from 'vue';
import { useRegistrationStore } from '@/stores/registration';
import { storeToRefs } from 'pinia';
import { createValidationRules } from '@/utils/validationRules';

const { t } = useI18n();

// @ts-ignore
definePageMeta({
  middleware: 'route-guard',
});

const validationRules = createValidationRules(t);

const registrationStore = useRegistrationStore();

const { state: registrationState } = storeToRefs(registrationStore);

const registrationFormEl = useTemplateRef('registrationForm');

async function submitForm() {
  let validateStatus = await registrationFormEl.value?.validate();
  if (!validateStatus || !validateStatus.valid) return;
  registrationStore.register();
}

onUnmounted(() => {
  registrationStore.clearStore();
});
</script>

<template>
  <main>
    <div class="form-holder">
      <h1 v-html="$t('words.signup')"></h1>
      <v-form @submit.prevent="submitForm()" ref="registrationForm">
        <div class="input-holder">
          <UIElementsTextField
            :model-path="'email'"
            :state="registrationState.form"
            :label="$t('pages.registration.email')"
            :rules="validationRules.emailRules"
          />
        </div>
        <div class="input-holder">
          <UIElementsTextField
            :model-path="'username'"
            :state="registrationState.form"
            :label="$t('pages.registration.username')"
            :rules="validationRules.usernameRules"
            :hint="$t('pages.registration.usernameHint')"
          />
        </div>
        <div class="input-holder">
          <UIElementsTextField
            :model-path="'password'"
            :state="registrationState.form"
            :label="$t('pages.registration.password')"
            :rules="validationRules.passwordRules"
            :field-type="'password'"
            :hint="$t('pages.registration.passwordHint')"
          />
        </div>
        <div class="input-holder">
          <v-checkbox
            v-model="registrationState.form.termsAccepted"
            color="primary"
            required
            :rules="validationRules.termsAcceptedRules"
          >
            <template v-slot:label>
              <div class="tnc-text">
                {{ $t('pages.registration.conditionsLabel1') }}
                <a to="/">{{ $t('pages.registration.conditionsLabel2') }}</a>
              </div>
            </template>
          </v-checkbox>
        </div>
        <div class="button-holder">
          <UIElementsButton
            :is-disabled="registrationState.form.isLoading"
            :is-loading="registrationState.form.isLoading"
            :is-block="true"
            :title="$t('words.signup')"
            :btn-size="'large'"
          />
        </div>
        <div class="form-error-holder" v-if="registrationState.form.error">
          {{ $t(registrationState.form.error) }}
        </div>
      </v-form>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.tnc-text {
  a {
    color: #00b565;
  }
}
</style>
