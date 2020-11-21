<template>
  <div>
    {{currentEdtContent}}
    <editor :content="content" :autoHeight="true" @change="updateContent"></editor>
    <div class="editor-toolbar">
      <i class="el-icon-plus"></i>
    </div>
    <div class="page">

      <el-button @click="getcontentjson">get json</el-button>
      <el-button @click="getcontentjson">get content</el-button>
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
        content: "<h1>内容编辑器</h1>"
      }
    },
    methods: {
      updateContent(cont){
        this.currentEdtContent=cont
      },
      getcontentjson() {
          console.log(editor.getJSON())
        this.$notify({
          title: '提示',
          message:editor.getJSON(),
          duration: 0
        });
      }
    }
  }
</script>

<style scoped lang="less">
  .editor-toolbar{text-align: left;
  background: rgba(0, 43, 75, 0.7);
    i{
      padding: 10px;
      color: #FFF;
      font-size: 16px;
    }:hover{background: rgba(0, 47, 73, 0.82)
     }
  }
  .page {
    /*font-size: 13px;*/

    div {
      background: red
    }
  }
</style>
