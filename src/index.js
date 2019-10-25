import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

// 加载看板娘
import './js/autoload';
// 容错处理
import './error/error';
import App from './App';
import router from './router/router';

import EvaIcons from 'vue-eva-icons';
Vue.use(EvaIcons);

new Vue({
    el: '#app',
    router,
    render: h => h(App)
})