import Vue from 'vue';
import App from './app.vue';
import './style.css';

new Vue({
    el: '#app',
    render: h => {
        return h(App)
    }
});