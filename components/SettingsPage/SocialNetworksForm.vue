<script lang="ts" setup>
import { useUserSettingsStore } from '@/stores/userSettings';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
import { reactive, ref, watch, useTemplateRef } from 'vue';
import { useI18n } from 'vue-i18n';
import { createValidationRules } from '~/composables/validationRules';
import type { SocialNetwork } from '@/types/socialNetwork.types';

const { t } = useI18n();

const viewSocialsDialog = ref(false);

let selectedSocialNetwork = reactive(initialSelectedNetwork());
const validationRules = createValidationRules(t);

const userSettingsStore = useUserSettingsStore();
const { state: userSettingsState } = storeToRefs(userSettingsStore);

const userStore = useUserStore();
const { state: userState } = storeToRefs(userStore);

const socialNetworkFormEl = useTemplateRef('socialNetworkFormEl');

function initialSelectedNetwork(): SocialNetwork {
  return {
    url: '',
    active: false,
    key: '',
    icon: '',
  };
}

function selectSocialNetwork(network: SocialNetwork) {
  selectedSocialNetwork = network;
  viewSocialsDialog.value = true;
}

async function saveSocialNetwork() {
  let validateStatus = await socialNetworkFormEl.value?.validate();
  if (!validateStatus || !validateStatus.valid) return;
  const editSocialNetworkSuccess = await userSettingsStore.editSocialNetwork(
    selectedSocialNetwork.key,
  );
  if (editSocialNetworkSuccess) {
    viewSocialsDialog.value = false;
  }
}

watch(viewSocialsDialog, (newValue) => {
  if (newValue) {
    userSettingsState.value.socialNetworks.form.url =
      userState.value.socialNetworks[selectedSocialNetwork.key].url;
    userSettingsState.value.socialNetworks.form.active =
      userState.value.socialNetworks[selectedSocialNetwork.key].active;
  } else {
    initialSelectedNetwork();
    userSettingsStore.clearSocialNetworksForm();
  }
});
</script>

<template>
  <div class="social-networks-block">
    <h5>{{ $t('pages.settings.socialNetworks') }}:</h5>
    <v-icon
      @click="selectSocialNetwork(network)"
      v-for="network of userState.socialNetworks"
      :title="t(`socialNetworks.${network.key}`)"
      :class="{ enabled: network.active, disabled: !network.active }"
      >{{ network.icon }}</v-icon
    >
  </div>
  <v-dialog
    max-width="500"
    v-model="viewSocialsDialog"
    content-class="socials-dialog"
  >
    <v-card>
      <h3>
        {{
          $t('phrases.addSocialNetworkTitle', {
            network: $t(`socialNetworks.${selectedSocialNetwork.key}`),
          })
        }}
      </h3>
      <v-form @submit.prevent="saveSocialNetwork()" ref="socialNetworkFormEl">
        <div class="form-box">
          <div class="input-holder">
            <UIElementsTextField
              :state="userSettingsState.socialNetworks.form"
              :model-path="'url'"
              :label="
                $t('phrases.socialNetworkURLPlaceholder', {
                  network: $t(`socialNetworks.${selectedSocialNetwork.key}`),
                })
              "
              :rules="validationRules.urlRules"
              :prepend-icon="selectedSocialNetwork.icon"
            />
            <v-switch
              v-model="userSettingsState.socialNetworks.form.active"
              color="primary"
              hide-details
              :label="$t('pages.settings.enablePublicView')"
            ></v-switch>
          </div>
          <div class="button-holder">
            <UIElementsButton
              :is-disabled="userSettingsState.socialNetworks.form.isLoading"
              :is-loading="userSettingsState.socialNetworks.form.isLoading"
              :title="$t('words.save')"
            />
            <v-btn
              :title="$t('words.close')"
              @click="viewSocialsDialog = false"
              >{{ $t('words.close') }}</v-btn
            >
          </div>
          <div
            class="form-error-holder"
            v-if="userSettingsState.socialNetworks.form.error"
          >
            {{ $t(userSettingsState.socialNetworks.form.error) }}
          </div>
        </div>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<style lang="scss">
.fab.fa-tiktok {
  font-size: 18px;
}
.social-networks-block {
  margin: 0 0 15px 0;

  > h5 {
    margin: 0 0 5px 0;
  }
  > .v-icon {
    margin-right: 8px;

    &.enabled {
      color: #000;
    }
    &.disabled {
      color: rgba(0, 0, 0, 0.4);
    }
  }
}
.socials-dialog {
  > .v-card {
    padding: 25px;

    h3 {
      margin: 0 0 15px 0;
    }
    .form-box {
      .input-holder {
        margin: 0 0 15px 0;
      }
      .button-holder {
        button {
          margin: 0 15px 0 0;
        }
      }
    }
  }
}
</style>
