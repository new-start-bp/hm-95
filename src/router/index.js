import VueRouter from 'vue-router'
import Vue from 'vue'

const  login=()=>import  ('../views/Login.vue')   
const  home=()=>import   ( '../views/Home.vue')   
const  welcome=()=>import(  '../views/welcom.vue')  
const  artical=()=>import(  '../views/Artical.vue')
const  notfund=()=>import(  '../views/404.vue')   
const  Image=()=>import  ('../views/Image.vue')   
const  publish=()=>import(  '../views/Publish.vue')
const  Comment=()=>import(  '../views/Comment.vue')
const  fans=()=>import   ( '../views/Fans.vue')   
const  setting=()=>import(  '../views/Setting.vue')
import  auth from '@/utils/auth'  
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