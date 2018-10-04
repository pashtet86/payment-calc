import { sync } from 'vuex-router-sync';
import Vue      from 'vue';
import store    from './store';
import router   from './router';
import App      from './App.vue';

sync(store, router);

Vue.config.productionTip = false;


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
