<template>
  <div id="app" class='www'>
    <img src="./assets/logo.png">
    <h1>{{ msg }}</h1>
    <h2 :title="obj.name">{{obj.name || '请去设置昵称'}}</h2>
    <h2 @click="fn">{{ msg && '111' }}</h2>
    <todoList></todoList>
  </div>
</template>

<script>
import todoList from './components/todoList.vue'
export default {
// .vue文件是组件
// 如果组件很多 通过name字段区分组件的名字
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      obj:{
          name:''
      }
    }
  },
  methods:{
  fn(){
      this.obj.name = 'wyq'
    }
  },
  components:{
    todoList
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

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
