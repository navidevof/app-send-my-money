<template>
  <div class="flex w-full justify-between items-center gap-x-4">
    <div
      class="size-28 rounded-full aspect-square relative overflow-clip border-white border-2"
    >
      <img
        v-if="page.photo !== ''"
        :src="page.photo"
        class="object-cover object-center size-full absolute"
        alt="Profile photo"
      />
      <div
        class="size-full rounded-full aspect-square place-items-center grid bg-custom-green-1"
      >
        <strong class="uppercase font-semibold text-5xl text-white">{{
          page.displayName.charAt(0)
        }}</strong>
      </div>
    </div>
    <div class="flex flex-col w-full justify-center items-center gap-y-2">
      <label
        for="photo"
        class="w-full rounded-full bg-custom-green-1 hover:bg-custom-green-2 duration-200 transition text-center text-white cursor-pointer py-3"
      >
        <input
          ref="fileInput"
          name="photo"
          id="photo"
          type="file"
          class="hidden"
          accept="image/*"
          @change="uploadPhoto"
        />
        Upload 📷
      </label>
      <MainButton
        @click="removePhoto"
        class="!bg-transparent text-sm text-custom-red-1 font-light !p-0 text-center"
      >
        Remove
      </MainButton>
    </div>
  </div>
  <div class="flex flex-col gap-y-2 w-full">
    <h3 class="text-white font-medium">Display nane</h3>
    <input
      class="w-full px-5 py-2 rounded-lg font-light bg-custom-black-3 text-white"
      type="text"
      v-model="page.displayName"
      placeholder="Field value"
      maxlength="20"
    />
    <small class="ml-auto text-sm mr-2 font-light text-white">
      {{ page.displayName.length }}/20
    </small>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useEditor } from "@/store/editor";
import MainButton from "@/components/ui/MainButton.vue";

const editorStore = useEditor();
const { page, filePhoto } = storeToRefs(editorStore);
const fileInput = ref<HTMLInputElement | null>(null);

const uploadPhoto = (e: Event) => {
  if (!page.value) return;
  const target = e.target as HTMLInputElement;
  const file = target.files?.[0];

  if (!file) return;
  if (!file.type.includes("image")) {
    alert("Only images files are allowed");
    return;
  }

  page.value.photo = URL.createObjectURL(file);
  filePhoto.value = file;
};

const removePhoto = () => {
  page.value.photo = "";
  filePhoto.value = undefined;
  if (fileInput.value) {
    fileInput.value.value = "";
  }
};
</script>
