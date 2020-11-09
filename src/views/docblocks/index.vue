<template>
    <div class="appmain">


      <el-row>
        <el-col :span="24">
          INDEX
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in chdatalist"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          {{ msg }}
          <tinymce-editor v-model="msg"
                          :disabled="disabled"
                          @onClick="onClick"
                          ref="editor" ></tinymce-editor>

        </el-col>
      </el-row>

    </div>
</template>

<script >
import TinymceEditor from './tinymce-editor'
export default {
  name: 'doc_doule',
  components:{
    TinymceEditor
  },
  data () {
    return {
      disabled: false,
      msg: 'test helllon',
      editcontent: 'sdfsdfsdfdsfd',
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: '',
      chdatalist: [{label:'AAA',value:"a"},{label:"BBB",value:"b"}]
    }
  },
  methods: {
    onClick (e, editor) {
      console.log('Element clicked')
      console.log(e)
      console.log(editor)
    },
    clear () {
      this.$refs.editor.clear()
    }
  }

}
</script>

<style scoped>

</style>
