


require('./bootstrap');

window.Vue = require('vue');

 // Custom components.
Vue.component('app', require('./components/AppComponent.vue').default);
Vue.component('tasks', require('./components/TasksComponent.vue').default);

// Contrib components
Vue.component('infinite', require('vue-infinite-loading'));

//import router from './routes.js'


const app = new Vue({
    el: '#app'
   // router
   
});
