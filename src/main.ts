import './assets/main.css';
import './traces';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import messages from './utils/locale/message';
import '@/scss/style.scss';
import PerfectScrollbar from 'vue3-perfect-scrollbar';
import '@progress/kendo-theme-default/dist/all.css';
//@ts-ignore
import VueApexCharts from 'vue3-apexcharts';
import VueTablerIcons from 'vue-tabler-icons';
import App from './App.vue';
import router from './router';
import Maska from 'maska';
import { VFileUpload } from 'vuetify/labs/VFileUpload'
// Table
import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';
//i18
import { createI18n } from 'vue-i18n';
//ScrollTop
import VueScrollTo from 'vue-scrollto';
import { createVuetify } from 'vuetify';
import vuetify from './utils/plugins/vuetify';
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify';

const i18n = createI18n({
    locale: 'en',
    messages: messages,
    silentTranslationWarn: true,
    silentFallbackWarn: true
});

const app = createApp(App)

// const vuetifye = createVuetify({
//   components: {
//     VFileUpload,
//   }
// })
app.component('EasyDataTable', Vue3EasyDataTable);
app.use(PerfectScrollbar);

app.use(Vue3Toastify, {
    autoClose: 9000,
} as ToastContainerOptions)
  
app.use(createPinia());
app.use(VueTablerIcons);
// app.use(print);
app.use(i18n);
app.use(Maska);
app.use(VueApexCharts);

app.use(router)
app.use(vuetify)
app.mount('#app')

app.use(VueScrollTo, {
    duration: 1000,
    easing: "ease",
    offset:-50,
})
