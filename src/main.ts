import { App, createApp } from "vue";
import MyApp from "./App.vue";
import router from "./router";
import { auth } from "./firebase";

import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

import PrimeVue from "primevue/config";
import { autoAnimatePlugin } from "@formkit/auto-animate/vue";

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import "./style.css";

let app: App;
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(MyApp)
      .use(router)
      .use(Toast)
      .use(pinia)
      .use(PrimeVue)
      .use(autoAnimatePlugin);
    app.mount("#app");
  }
});
