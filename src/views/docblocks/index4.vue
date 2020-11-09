<template>
  <div>
    {{currentEdtContent}}
    <editor :content="content" :autoHeight="true" @change="updateContent"></editor>
    <div class="page">
      <p>asdfsdfds</p>
      <div>G</div>
      <el-button @click="getcontentjson">get json</el-button>
    </div>
  </div>


</template>

<script>
  import VueHtml5Editor from '../editor'

  const editor = new VueHtml5Editor({i18n: 'zh-cn'})
  export default {
    name: "index4",
    components: {editor },
    data() {
      return {
        currentEdtContent:"",
        content: "<h1>aaaa</h1>"
      }
    },
    methods: {
      updateContent(cont){
        this.currentEdtContent=cont
      },
      getcontentjson() {
          console.log(editor.getJSON())
      }
    }
  }
</script>

<style scoped lang="less">
  .page {
    /*font-size: 13px;*/

    div {
      background: red
    }
  }
</style>
