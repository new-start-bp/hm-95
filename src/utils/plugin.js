import MyBread from '@/components/myBread'
import mychannel from '@/components/my-channel'
import mycover from '@/components/my-cover'
export default {
  // Vue 来源：main.js使用Vue.use(插件)，调用插件中install函数，且或传入Vue对象。
  install (Vue) {
    // 基于Vue对象来扩展Vue功能
    Vue.component(MyBread.name, MyBread)
    Vue.component(mychannel.name, mychannel)
    Vue.component(mycover.name, mycover)
  }
}
