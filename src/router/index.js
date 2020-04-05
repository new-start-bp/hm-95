import VueRouter from 'vue-router'
import Vue from 'vue'
import login from '../views/Login.vue'
import home from '../views/Home.vue'
import welcome from '../views/welcom.vue'
import artical from '../views/Artical.vue'
import notfund from '../views/404.vue'
import Image from '../views/Image.vue'
import publish from '../views/Publish.vue'
import Comment from '../views/Comment.vue'
import fans from '../views/Fans.vue'
import setting from '../views/Setting.vue'
import auth from '@/utils/auth'
Vue.use(VueRouter)
const routes=[{path:'/login',component:login},
{path:'/',component:home,
children:[{
    path:'/',component:welcome
},
{
    path:'/article',component:artical
},
{ path: '/image', component: Image },
{ path: '/publish', component: publish },
{ path: '/comment', component: Comment },
{ path: '/fans', component: fans },
{ path: '/setting', component: setting },

]
},{
    path:'*',component:notfund
}]
const router=new VueRouter({routes})
//导航守卫
router.beforeEach((to,from,next)=>{
    const user =auth.getUser()
    if(to.path!=='/login'&&!user.token)
    return next('/login')
    next()
})
export default router