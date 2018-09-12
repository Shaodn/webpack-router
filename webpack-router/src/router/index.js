import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import HelloRouter from '@/components/HelloRouter'
import User from '@/components/User'
import userInfo from '@/components/UserInfo'
import Password from '@/components/Password'
// 如果在一个模块化工程中使用它，必须通过vue.use明确的安装路由功能
// 在vue实例中去注册router
Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/helloRouter',
      name: 'HelloRouter',
      component: HelloRouter
    },
    { 
      // 路由跳转携带值
      // 关于路由有优先级的问题 index越小 优先级越高
      path: '/user/:id/set/:time', 
      name:'User' ,
      component: User
    },
    {
      path: '/userInfo/',
      name: 'userInfo',
      component: userInfo,
      // 要注意，以 / 开头的嵌套路径会被当作根路径。 这让你充分的使用嵌套组件而无须设置嵌套的路径。
      children:[
        {
          path:'',
          component:Password
        },
        {
          path:'password',
          name: 'Psaaword',
          component:Password
        }
      ]
    },
    // 命名路由
    {
      path:'/outputs',
      components:{
        default:userInfo,
        a:User,
        b:HelloRouter
      }
    },
    // 重定向
    // 一般放到最下面
    {
      //path:'/sss',
      path:'*',
      redirect:'/HelloRouter'
    }
  ]
})
