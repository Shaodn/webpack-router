# webpack-router
router总结
二、没有simple的cli
1.创建文件夹vue-cli

2.在终端的vue-cli文件夹下
输入命令：vue init webpack webpack-router-study
按提示配置，下载完成后在vue-cli文件夹中会自动创建文件夹webpack-router-study
在终端输入 cd webpack-router-study切换到当前文件夹下，输入命令：npm run dev
出现一个端口号8080的地址即为成功。

3.用Visual Studio code打开webpack-router-study文件夹，该文件夹中存在build、config、node_modules、src、static、.babelrc、.editorconfig、.gitignore、.postcssrc.js、.index.html、package-lock.json、package.json、README.md文件
我们可操作的文件夹为src文件夹。

4.在src文件夹中，asset文件夹用于储存图片等资源，components用于存储各种自定义的组件，router文件夹中存放的index.js用于导入各种组件资源（这个文件中的@是在build文件夹下webpack.base.conf.js文件下resolve配置的绝对路径），配置路由，App.vue文件是唯一的出口文件。main.js文件配置路由信息。
main.js文件夹下的各个值的意思：
Vue.config.productionTip = false//设置为 false 以阻止 vue 在启动时生成生产提示。
// router 首先需要 Vue.use() => 全局注册
// 然后要在 new Vue() 去注册
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

index.js文件下的意思：
import User from '@/components/User'//导入名为User的组件
Vue.use(Router)//如果在一个模块化工程中使用它，必须通过vue.use明确的安装路由功能，在vue实例中去注册router

5.router-link组件：
使用 router-link 组件来导航，通过传入 `to` 属性指定链接， <router-link> 默认会被渲染成一个 `<a>` 标签

例子：首先，在components文件夹下创建一个HelloRouter组件，在index.js 文件中引入，
引入方式：import HelloRouter from '@/components/HelloRouter'
在export default new Router的routes下配置路径等组件信息：
{
      path: '/helloRouter',
      name: 'HelloRouter',
      component: HelloRouter
}
在App.vue文件中的template中的div中写入：
<router-link to="/">首页</router-link> //（/代表根路径）
<router-link to="/helloRouter">HelloRouter</router-link>
即可实现跳转。

6.route和router
我们可以在任何组件内通过 this.$router 访问路由器，也可以通过 this.$route 访问当前路由
在App.vue的文件中，可以在export default下的created的生命周期打印this.$router和this.$route,发现router是路由器，route是当前路由。

7.动态路由匹配
路由跳转携带值：
在components文件夹中创建User.vue文件
文件结构：
<template>
    <h1>
        你好，初次了解动态router请多关照
        {{$route.params.id}}
    </h1>
</template>
<script>
export default {
    name:'User'
}
</script>
<style>

</style>
在index.js文件中配置
{ 
      // 路由跳转携带值
      // 关于路由有优先级的问题 index越小 优先级越高
      path: '/user/:id/set/:time', 
      name:'User' ,
      component: User
}
通过$route.params.id $route.params.time 可以获取到路由跳转时携带的值

7.响应路由参数的变化
利用watch监测：
在App.vue文件下的export default下写入：
 // 观测当前动态路由数据的变更
  watch:{
    // 观测发生变化的路由
    '$route' (newVal,oldVal){
      // 对路由变化作出响应...
      console.log(newVal)
    }
  }

8.匹配优先级：匹配的优先级就按照路由的定义顺序：谁先定义的，谁的优先级就最高。

9.嵌套路由：实际生活中的应用界面，通常由多层嵌套的组件组合而成。同样地，URL 中各段动态路径也按某种结构对应嵌套的各层组件

在components文件夹下创建userInfo.vue组件和Password.vue组件，在userInfo.vue的div中写入<router-view></router-view>，用于接收Passwrod.vue组件，在index.js文件中配置：
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
}
其中，children的路径只写名字，路径为空，设置一个组件名，会直接显示。

10.命名路由
在App.vue文件下的div里面可以写入多个<router-view></router-view>，当名字一致时，会在页面上显示两个，当名字不同时（名字默认default），可以放不同的路由，如：
<router-view></router-view>
<router-view name='b'></router-view>
在index.js 文件下配置（注意component要加s）：
// 命名路由
    {
      path:'/outputs',
      components:{
        default:userInfo,
        a:User,
        b:HelloRouter
      }
    }

11.编程式的导航
利用push可以直接跳转页面
在App.vue文件中的某个标签绑定一个点击事件，在methods里面调用：
fn(){
      // // 字符串
      // 注意 它是叠加的！！！！ --error
      // this.$router.push('helloRouter')
      // 对象
      // 注意 它也是叠加的！！！！ --error
      //this.$router.push({path:'user/9527/set/9527'})
      // 命名的路由
      //this.$router.push({ name: 'User', params: { id: 123,time:9527 }})
      // 带查询参数，变成 /register?plan=private
      //this.$router.push({ path: 'HelloRouter', query: { name: 'name' }})
      // 后退一步记录，等同于 history.back()
      this.$router.go(-1)
    }

12.router-link的to属性配置（点击 <router-link :to="..."> 等同于调用 router.push(...)）
 <router-link :to="{name:'User',params:{id:'123',time:'123'}}">灵活版router-link的to属性配置</router-link>
注意：to前面一定要加冒号

13.重定向
在index.html文件中配置：
// 重定向
    // 一般放到最下面
    {
      //path:'/sss',
      path:'*',
      redirect:'/HelloRouter'
    }
在8080端口根路径输入不正确的地址时，自动跳转到在redirect后面定义的地址

14.HTML5 History模式
在export default new Router下设置mode:'history'，URL 就像正常的 url，例如 http://yoursite.com/user/id


