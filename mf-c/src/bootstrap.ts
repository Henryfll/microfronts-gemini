import { createApp } from 'vue';
import App from './App.vue';

const mount = (el: string | Element) => {
  const app = createApp(App);
  app.mount(el);
};

if (process.env.NODE_ENV === 'development') {
  const devRoot = document.querySelector('#app');
  if (devRoot) {
    mount(devRoot);
  }
}

export { mount };
