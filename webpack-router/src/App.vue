<template>
  <div id="app">
    <img src="./assets/logo.png" @click="fn">
    <router-link to="/">首页</router-link>
    <router-link to="/helloRouter">HelloRouter</router-link>
    <router-link :to="{name:'User',params:{id:'123',time:'123'}}">灵活版router-link的to属性配置</router-link>
    <router-view></router-view>
    <router-view name='b'></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  created(){
    // this.$router 看vue-router的全部路由
    // this.$route 看当前所在的路由
    console.log(this.$router)
    console.log(this.$route)
  },
  // 观测当前动态路由数据的变更
  watch:{
    '$route' (newVal,oldVal){
      console.log(newVal)
    }
  },
  methods:{
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
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
