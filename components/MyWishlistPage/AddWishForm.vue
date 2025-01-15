<script lang="ts" setup>
import { useMyWishlistStore } from '@/stores/myWishlist';
import { useUserStore } from '@/stores/user';
import { useTemplateRef, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const props = defineProps({
  wishlistId: {
    type: String,
  },
});

const myWishlistStore = useMyWishlistStore();
const { state: myWishlistState } = storeToRefs(myWishlistStore);

const addWishForm = useTemplateRef('addWishFormEl');
const selectedFile = ref<File | null>(null);

const validationRules = {
  titleRules: [
    (v: string) => !!v || t('errors.validation013'),
    (v: string) => v.length <= 160 || t('errors.validation014'),
  ],
  descriptionRules: [
    (v: string) => v.length <= 500 || t('errors.validation015'),
  ],
};

async function addWish() {
  let validateStatus = await addWishForm.value?.validate();
  if (!validateStatus || !validateStatus.valid) return;

  const formData = new FormData();
  if (selectedFile.value) {
    formData.append('photo', selectedFile.value);
  }
  if (!selectedFile.value && myWishlistState.value.form.photo !== '') {
    formData.append('photo', myWishlistState.value.form.photo);
  }
  formData.append('title', myWishlistState.value.form.title);
  formData.append('description', myWishlistState.value.form.description);
  formData.append('ownerId', useUserStore().state.id);
  if (props.wishlistId !== undefined) {
    formData.append('wishlistId', props.wishlistId);
  }
  formData.append('url', myWishlistState.value.checkURLForm.url);

  const result = await myWishlistStore.addWish(formData);
  if (result) {
    closeModal();
  }
}

function setImage(image: File) {
  selectedFile.value = image;
  createPreview(image);
}

function removeImage() {
  selectedFile.value = null;
  myWishlistState.value.form.photo = '';
}

function createPreview(file: File) {
  const reader = new FileReader();
  reader.onload = (e) => {
    if (e.target?.result) {
      myWishlistState.value.form.photo = e.target.result;
    }
  };
  reader.readAsDataURL(file);
}

const emit = defineEmits(['closeModal']);

const closeModal = () => {
  emit('closeModal');
};
</script>

<template>
  <v-form @submit.prevent="addWish()" class="add-wish-form" ref="addWishFormEl">
    <div v-if="myWishlistState.form.show" class="additional-fields">
      <div class="input-holder">
        <v-text-field
          v-model="myWishlistState.form.title"
          :label="$t('pages.myWishlist.giftTitle')"
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
          v-model="myWishlistState.form.description"
          :label="$t('pages.myWishlist.giftDescription')"
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
      <div class="image-field upload">
        <p class="field-title">
          {{ $t('words.image') }}
        </p>
        <div class="image-preview">
          <div
            class="image-holder"
            v-if="
              myWishlistState.form.photo && myWishlistState.form.photo !== ''
            "
          >
            <img :src="myWishlistState.form.photo" />
            <v-btn
              density="comfortable"
              class="remove-button"
              icon="mdi-delete"
              small
              :aria-label="$t('words.remove')"
              color="remove"
              @click="removeImage()"
            ></v-btn>
          </div>
          <CommonFileUpload
            v-if="!myWishlistState.form.photo"
            @setImage="setImage"
          />
        </div>
      </div>
    </div>
    <div class="button-holder">
      <v-btn
        v-if="myWishlistState.form.show"
        :loading="myWishlistState.form.isLoading"
        :disabled="myWishlistState.form.isLoading"
        :title="$t('words.save')"
        color="primary"
        type="submit"
        >{{ $t('words.save') }}</v-btn
      >
      <v-btn :title="$t('words.close')" @click="closeModal">{{
        $t('words.close')
      }}</v-btn>
    </div>
    <div class="form-error-holder" v-if="myWishlistState.form.error">
      {{ $t(myWishlistState.form.error) }}
    </div>
  </v-form>
</template>

<style lang="scss">
.add-wish-form {
  .image-field {
    .image-preview {
      max-width: 50%;

      .image-holder {
        overflow: hidden;
        min-height: 200px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        border-radius: 0.5rem;
        background-color: #f2f2f2;

        img {
          width: 100%;
          height: auto;
        }
        .remove-button {
          position: absolute;
          top: 10px;
          right: 10px;
          opacity: 0;
          transition: opacity 0.5s ease-in-out;
          --v-btn-height: 30px;
          z-index: 1;

          .v-icon {
            --v-icon-size-multiplier: 0.8;
          }
        }
        &:hover {
          .remove-button {
            opacity: 1;
          }
        }
      }
    }
  }
}
</style>
