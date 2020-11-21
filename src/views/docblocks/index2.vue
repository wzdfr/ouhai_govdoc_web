<template>
    <div class="appmain">


      <el-row>
        <el-col :span="24">
<!--          INDEX-->

          {{ msg }}
        <el-button @click="blodfont">加粗</el-button>
          <el-button @click="getedior">获取内容</el-button>

          <div id="editor"></div>


        </el-col>
      </el-row>

    </div>
</template>
<script >
import { createEditor,audioTool,
  blockBackgroundTool,
  blockquoteTool,
  boldTool,
  cleanTool,
  preTool,
  colorTool,
  emojiTool,
  fontFamilyTool,
  fontSizeTool,
  headingTool,
  historyBackTool,
  historyForwardTool,
  imageTool,
  italicTool,
  letterSpacingTool,
  lineHeightTool,
  linkTool,
  olTool,
  strikeThroughTool,
  subscriptTool,
  superscriptTool,
  tableEditTool,
  tableAddTool,
  textAlignTool,
  textBackgroundTool,
  textIndentTool,
  ulTool,
  underlineTool,
  videoTool,
  codeTool,
  leftToRightTool,
  rightToLeftTool,
  tableAddParagraphTool,
  tableRemoveTool,
  tdBorderColorTool,
  unlinkTool,
  findTool,
  insertObjectTool,
  tableTool } from '@tanbo/textbus';
import '@tanbo/textbus/bundles/textbus.min.css';
export default {
  name: 'doc_doule2',
  data () {
    return {
      disabled: false,
      msg: '公文积木',
      editcontent: 'sdfsdfsdfdsfd',
      editor:null,
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
  mounted () {
    console.log(this.editor == null);
    if (this.editor == null) this.initEditor();
  },
  methods: {
    getedior () {
      alert("A");
      let _this = this;
      if (_this.editor == null) alert("编辑器没启动");
      console.log(_this.editor.getJSONLiteral().json);

      _this.editor.onChange.subscribe( () => {
        console.log(_this.editor.getContents());
      })
    },
    blodfont () {
      // this.editor.invoke(boldTool,"b");
      // this.editor.invoke(fontSizeTool,"72px");
      // this.editor.setContents("<a href='111'>xxxxxxxx</a>");
    },
    clear () {
      this.$refs.editor.clear()
    },
    initEditor () {
    this.editor = createEditor('#editor', {
      toolbar: [
        // [historyBackTool, historyForwardTool],
        [insertObjectTool],
        // [headingTool],
        [boldTool, italicTool, strikeThroughTool, underlineTool],
        // [olTool, ulTool],
        // [fontSizeTool, textIndentTool],
        // [colorTool, textBackgroundTool],
        // [fontFamilyTool],
        // [linkTool, unlinkTool],
        // [imageTool],
        [textAlignTool],
        // [tableTool],
        [findTool],
        [cleanTool]
      ],
        theme: 'mac-os-dark',// 可选 'dark' | 'mac-os' | 'mac-os-dark'，不传即为默认样式
        uploader (type) {
          switch (type) {
            case 'video':
              console.log('上传视频');
              break;
            case 'image':
              console.log('上传图片');
              break;
            case 'audio':
              console.log('上传音频');
              break;
          }
          return Promise.resolve().then(() => {
            return '/test'
          })
        },
        contents: '<p>欢迎你使用&nbsp;<strong>OH_gov_editor</strong> 编辑器,快来尝试下公文拟稿吧...<br></p>'
      });
    }

  }

}
</script>

<style >
  .textbus-toolbar{display: none}
</style>
