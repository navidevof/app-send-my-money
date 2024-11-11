<template>
  <aside
    class="fixed inset-0 z-50 flex items-center justify-center bg-custom-black-1/50 backdrop-blur-xl transition duration-200"
    v-show="showModalPremium"
  >
    <div
      class="flex flex-col md:items-center md:justify-center relative rounded-3xl overflow-y-auto max-h-[90vh] w-11/12 max-w-screen-lg bg-custom-black-3"
    >
      <header class="text-white text-center font-semibold py-5">
        <h2 class="text-lg">Upgrade to Send Pro</h2>
        <button
          class="absolute right-6 top-5 lg:right-8"
          @click="showModalPremium = false"
        >
          <IconClose class="size-6" />
        </button>
      </header>
      <div class="h-px bg-white/50 w-full" />
      <div
        class="grid grid-cols-1 md:grid-cols-[60%_1fr] gap-y-5 gap-x-10 w-full"
      >
        <div
          class="flex order-2 md:order-1 flex-col gap-5 pb-5 pt-0 md:pt-5 text-white w-10/12 mx-auto"
        >
          <h3 class="font-bold text-2xl">
            Get 15 days of Pro for free. Cancel anytime.
          </h3>
          <p class="text-white/85">
            Streamline and manage your payment methods with a 15-day free trial
            of SMM Premium! Only $18,000 COP/month or $4 after that. Unlock
            features like:
          </p>
          <ul class="list-disc flex flex-col gap-2 list-inside text-white/85">
            <li>Analysis and statistics of your payment methods.</li>
            <li>Add unlimited payment methods.</li>
            <li>Include multiple options within each payment method.</li>
            <li>Priority customer support and more.</li>
          </ul>
          <span>
            Pro is just $18,000 COP/month once your trial's up. You can cancel
            any time!
          </span>
          <MainButton @click="goToPayment" class="sticky bottom-0 left-0">
            Try Pro for Free ✨
          </MainButton>
        </div>
        <div
          class="relative grid place-content-center order-1 md:order-2 rounded-2xl md:w-full w-10/12 mx-auto md:mt-0 md:rounded-none bg-gradient-to-t from-custom-green-2 to-[#DDCD54]"
        >
          <img
            src="@/assets/premium/banner.webp"
            alt="Banner information premium"
            class="w-full"
          />
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import IconClose from "@/components/icons/IconClose.vue";
import MainButton from "@/components/ui/MainButton.vue";

import { useEditor } from "@/store/editor";
import { storeToRefs } from "pinia";

const editorStore = useEditor();
const { showModalPremium, page } = storeToRefs(editorStore);

const goToPayment = () => {
  window.open(
    `https://sendmymoney.lemonsqueezy.com/buy/3633e537-05c5-4155-a9aa-6c046eb4024e?checkout[custom][uid]=${page.value.uid}`,
    "_blank"
  );

  showModalPremium.value = false;
};
</script>
