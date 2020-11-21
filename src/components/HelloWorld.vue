<template>
  <div class="hello">
    <a href="#/dd/home">测试首页</a>
    <a href="#/doc/blocks">编辑器1</a>
    <a href="#/doc/blocks3">编辑器2</a>
    <a href="#/doc/blocks4">编辑器2</a>

  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
