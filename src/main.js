import Vue from 'vue'

// element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
Vue.use(ElementUI);

Vue.config.productionTip = true;
Vue.config.devtools      = true;

import axios from 'axios'
Vue.prototype.axios = axios

// 引入mint全部组件
import Mint from 'mint-ui';
Vue.use(Mint);
import 'mint-ui/lib/style.css'; 

import router from 'router/';
import 'register/';
import store from 'store/';
Vue.prototype.lang = store.state.commondata.lang
//公用scss
import './assets/scss/common.scss'

import App from './App';

//微信判断
Vue.prototype.headStatus = true;
var ua = navigator.userAgent.toLowerCase(); 
if( ua.indexOf('qtagent') > -1 ){
// if( ua.indexOf('qtagent') == -1 || ua.match(/MicroMessenger/i) != 'micromessenger'){
  Vue.prototype.headStatus = false;
}

new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {App}
})

router.beforeEach((to, from, next) => {
    document.title = to.name
    console.log(store.state.user.userinfo.state)
    if(store.state.user.userinfo.state!=2){
        next('/login')
    }else{
        next()
    }
})
