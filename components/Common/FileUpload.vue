<script lang="ts" setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const fileInput = ref<HTMLInputElement | null>(null);
const isDragging = ref(false);
const fileError = ref('');

const maxFileSize = 5242880;
const allowedFileTypes = ['image/jpeg', 'image/png', 'image/jpg'];

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (!target.files?.length) return;

  const selectedFile = target.files[0];

  const valid = validateFile(selectedFile);
  if (valid) {
    createPreview(selectedFile);
  }
  target.value = '';
};

const handleDrop = (event: DragEvent) => {
  isDragging.value = false;

  if (event.dataTransfer?.files) {
    const valid = validateFile(event.dataTransfer?.files[0]);
    if (valid) {
      createPreview(event.dataTransfer?.files[0]);
    }
  }
};

const triggerFileInput = () => {
  fileInput.value?.click();
  fileError.value = '';
};

const validateFile = (file: File): boolean => {
  if (!allowedFileTypes.includes(file.type)) {
    fileError.value = t('errors.validation021');
    return false;
  }
  if (file.size > maxFileSize) {
    fileError.value = t('errors.validation020');
    return false;
  }
  fileError.value = '';
  return true;
};

const emit = defineEmits(['setImage']);

const createPreview = (file: File) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    if (e.target?.result) {
      const image = {
        type: file.type,
        url: e.target.result,
      };
      emit('setImage', image);
    }
  };
  reader.readAsDataURL(file);
};
</script>

<template>
  <div class="upload-holder">
    <div
      class="drop-area"
      @click="triggerFileInput"
      @dragover.prevent="isDragging = true"
      @dragleave.prevent="isDragging = false"
      @drop.prevent="handleDrop"
      :class="{ dragging: isDragging }"
    >
      <v-icon>fa:fas fa-upload</v-icon>
      <p>{{ $t('components.fileUpload.uploadText') }}</p>
    </div>
    <input
      type="file"
      ref="fileInput"
      @change="handleFileSelect"
      accept="image/*"
      class="file-input"
    />
    <div class="form-error-holder" v-if="fileError !== ''">
      {{ fileError }}
    </div>
  </div>
</template>

<style lang="scss">
.upload-holder {
  width: 100%;

  .drop-area {
    border: 2px dashed #d1d5db;
    border-radius: 0.5rem;
    padding: 1rem;
    margin-bottom: 1rem;
    min-height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: column wrap;
    cursor: pointer;
    transition: border-color 0.2s ease;

    .v-icon {
      margin: 0 0 10px 0;
    }
    &:hover {
      border-color: #bec1c4;
    }

    &.dragging {
      border-color: $primary;
      background-color: rgba(0, 181, 101, 0.05);
    }
    p,
    .v-icon {
      color: $text_color_light;
    }
  }
}
</style>
