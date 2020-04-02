import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 导入路由实例
import router from './router/index.js'
//导入axios
import axios from '@/api'
import '@/styles/index.less'

// import MyBread from '@/components/myBread'
// Vue.component(MyBread.name,MyBread)
//把MyBread封装到了plugin里面
import plugin from '@/utils/plugin'
Vue.use(plugin)

Vue.prototype.$http=axios

Vue.config.productionTip = false

Vue.use(ElementUI)
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
