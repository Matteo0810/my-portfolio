import "./scss/main.scss";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import create18n from "@/services/i18n";

const app = createApp(App);

app.use(createPinia());
app.use(create18n);
app.use(router);

app.mount('#app');