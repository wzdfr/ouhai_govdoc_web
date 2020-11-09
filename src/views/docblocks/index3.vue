<template>
  <div style="display: block;position: relative;flex: 1">
    <!--  <el-container style="width: 100%;">-->
    <el-row :gutter="10" style="margin-left: 0px;margin-right: 0px;">
      <el-col :span="24" style="padding: 5px;border-bottom: 1px solid #dcdcdc;box-shadow: 1px 0px 10px #e9e9e9;">
        <el-tooltip class="item" effect="dark" content="我的更多操作" placement="right">
        <span class="morebtn" ><el-button type="text" @click="drawer = true"><i
          class="el-icon-more"></i></el-button></span>
        </el-tooltip>
        <a class="loginuser" >
          <i class="el-icon-user"></i>
          {{loginusername}}
        </a>


        <el-popconfirm
          confirmButtonText='好的'
          cancelButtonText='关闭'
          icon="el-icon-info"
          iconColor="red"
          title="保存程序正在制作中...">
          <el-button size="small" slot="reference" type="primary">保 存</el-button>
        </el-popconfirm>
        <el-button size="small"  @click="exportword" type="danger">导出WORD</el-button>
        <el-dropdown split-button size="small" @command="handleCommand">
          组件
          <el-dropdown-menu slot="dropdown" style="z-index: 9999">
            <el-dropdown-item command="gov_fwjg" icon="el-icon-plus">发文机关(红头)</el-dropdown-item>
            <el-dropdown-item command="gov_fwzh" icon="el-icon-plus">发文字号</el-dropdown-item>
            <el-dropdown-item command="gov_gwbt" icon="el-icon-plus">公文标题</el-dropdown-item>
            <el-dropdown-item command="gov_zw" icon="el-icon-plus">正文</el-dropdown-item>
            <el-dropdown-item command="gov_yjbt" icon="el-icon-plus">一级标题</el-dropdown-item>
            <el-dropdown-item command="gov_ejbt" icon="el-icon-plus">二级标题</el-dropdown-item>
            <el-dropdown-item command="gov_sjbt" icon="el-icon-plus">三级标题</el-dropdown-item>
            <el-dropdown-item command="d" divided></el-dropdown-item>
            <el-dropdown-item command="wordpreview">公文预览</el-dropdown-item>
            <el-dropdown-item command="wordpreviewoa">同步到OA</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

      </el-col>
      <el-col :span="24" style="border-right: 1px #e8e8e8 solid">
        <div ref="editor_toolbar" id="editor_toolbar" style="text-align:center"></div>
        <div class="wordnamediv">
          <el-input
            type="text"
            placeholder="公文名称"
            v-model="wordname"
            maxlength="200"
            class="nameinput"
            show-word-limit>
          </el-input>
        </div>

        <div ref="editor" id="editor"></div>

      </el-col>
      <!--        <el-col  :span="8" style="text-align: left;overflow:auto">-->
      <!--          <h4 style="margin-top: 0px;">预览</h4>-->
      <!--   -->
      <!--        </el-col>-->
    </el-row>


    <el-dialog
      title="公文内容"
      :visible.sync="showpreview"
      width="80%">
      <div v-html="editorContent" class="wordcontent" v-if="showpreview"></div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="showpreview = false">取 消</el-button>
    <el-button type="primary" @click="showpreview = false">确 定</el-button>
  </span>
    </el-dialog>


    <el-dialog
      title="红头-发文机关"
      :visible.sync="dialog_gov_fwjg"
      width="50%">
      <el-input placeholder="发文机关名称" v-model="val_gov_fwjg"></el-input>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialog_gov_fwjg = false">取 消</el-button>
    <el-button type="primary" @click="handlegovdocwite('gov_fwjg')">确 定</el-button>
  </span>
    </el-dialog>

    <el-dialog
      title="公文标题"
      :visible.sync="dialog_gov_gwbt"
      width="90%">
      <el-input placeholder="标题" v-model="val_gov_gwbt"></el-input>

      <span slot="footer" class="dialog-footer">
    <el-button @click="dialog_gov_gwbt = false">取 消</el-button>
    <el-button type="primary" @click="handlegovdocwite('gov_gwbt')">确 定</el-button>
  </span>
    </el-dialog>


    <el-dialog
      title="发文字号"
      :visible.sync="dialog_gov_fwzh"
      width="90%">
      <el-row :gutter="10">
        <el-col :span="12">
          <el-input placeholder="字号(区委办XXX号)" v-model="val_gov_fwzh1"></el-input>
        </el-col>
        <el-col :span="12">
          <el-input placeholder="签发人" v-model="val_gov_fwzh2"></el-input>
        </el-col>
      </el-row>

      <span slot="footer" class="dialog-footer">
    <el-button @click="dialog_gov_fwzh = false">取 消</el-button>
    <el-button type="primary" @click="handlegovdocwite('gov_fwzh')">确 定</el-button>
  </span>
    </el-dialog>

    <el-dialog
      title="段落"
      :visible.sync="dialog_gov_zw"
      width="50%">
      <el-input
        type="textarea"
        :autosize="{ minRows: 5, maxRows: 100}"
        placeholder="请输入内容"
        v-model="val_gov_zw">
      </el-input>

      <span slot="footer" class="dialog-footer">
    <el-button @click="dialog_gov_zw = false">取 消</el-button>
    <el-button type="primary" @click="handlegovdocwite('gov_zw')">确 定</el-button>
  </span>
    </el-dialog>

    <el-dialog
      title="一级标题"
      :visible.sync="dialog_gov_yjbt"
      width="50%">
      <el-input
        :autosize="{ minRows: 5, maxRows: 100}"
        placeholder="请输入内容"
        v-model="val_gov_yjbt">
      </el-input>

      <span slot="footer" class="dialog-footer">
    <el-button @click="dialog_gov_yjbt = false">取 消</el-button>
    <el-button type="primary" @click="handlegovdocwite('gov_yjbt')">确 定</el-button>
  </span>
    </el-dialog>


    <el-dialog
      title="二级标题"
      :visible.sync="dialog_gov_ejbt"
      width="50%">
      <el-input
        :autosize="{ minRows: 5, maxRows: 100}"
        placeholder="请输入内容"
        v-model="val_gov_ejbt">
      </el-input>

      <span slot="footer" class="dialog-footer">
    <el-button @click="dialog_gov_ejbt = false">取 消</el-button>
    <el-button type="primary" @click="handlegovdocwite('gov_ejbt')">确 定</el-button>
  </span>
    </el-dialog>

    <el-dialog
      title="三级标题"
      :visible.sync="dialog_gov_sjbt"
      width="50%">
      <el-input
        :autosize="{ minRows: 5, maxRows: 100}"
        placeholder="请输入内容"
        v-model="val_gov_sjbt">
      </el-input>

      <span slot="footer" class="dialog-footer">
    <el-button @click="dialog_gov_sjbt = false">取 消</el-button>
    <el-button type="primary" @click="handlegovdocwite('gov_sjbt')">确 定</el-button>
  </span>
    </el-dialog>

    <el-drawer
      size="60%"
      :visible.sync="drawer"
      :direction="direction"
    >
      <div class="drawerbox">
      <el-tabs v-model="tab_activeName" @tab-click="drawertabhandle">
        <el-tab-pane label="草稿件" name="tab_cglist">
          <el-divider content-position="center">暂无草稿内容</el-divider>
        </el-tab-pane>
        <el-tab-pane label="我的公文" name="tab_govlist">
          <el-divider content-position="center">您在无发布任何公文</el-divider>
        </el-tab-pane>
      </el-tabs>
      </div>

    </el-drawer>

  </div>

  <!--  </el-container>-->
</template>

<script>
  import E from 'wangeditor'
  import Util from '@/libs/util'
  import 'element-ui/lib/theme-chalk/display.css'

  export default {
    name: 'index3',
    data () {
      return {
        loginusername:"瓯海区政府-张三",
        drawer: false,
        direction: 'rtl',
        showpreview: false,
        editor: null,
        timer: false,
        timer_editor: false,
        tab_activeName:'tab_cglist',
        apiUrlPrefix:'/api/v1/ohgov/',
        val_gov_fwjg: '',
        val_gov_fwzh1: '',
        val_gov_fwzh2: '',
        val_gov_gwbt: '',
        val_gov_zw: '',
        val_gov_yjbt: '',
        val_gov_ejbt: '',
        val_gov_sjbt: '',
        dialog_gov_fwjg: false,
        dialog_gov_fwzh: false,
        dialog_gov_gwbt: false,
        dialog_gov_zw: false,
        dialog_gov_yjbt: false,
        dialog_gov_ejbt: false,
        dialog_gov_sjbt: false,

        wordname: '',
        clientheight: document.documentElement.clientHeight,
        editorContent: ''
      }
    },
    methods: {
      handleClose (done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done()
          })
          .catch(_ => {
          })
      },
      handlegovdocwite (actiontype) {
        const _that = this
        if (actiontype === 'gov_fwjg') {
          if (_that.val_gov_fwjg === '') {
            _that.$message.error('请输入公文机构名称')
            return
          }
          _that.editor.txt.html('<div><div style="text-align:center"><font class=\'gov_fwjg\' style="color: red;font-weight: bold;text-align:center; align:center; font-size:36pt;font-family: \'仿宋_GB2312\'!important;line-height: 1.2!important;">' + _that.val_gov_fwjg + '</font>' +
            // '<p class=\'gov_fgx\' style="margin-bottom: 10pt;height: 4px;"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAqCAIAAABOVI4xAAAAXklEQVRYCe3UwQ0AIAhD0e6/NM7QBuHATzyCxJeiSlo5O1NLS89l8GTKCNeYNtRQf/tTCRfhIlxtW9B2kZtKBrticT3UMZ3bCLUrFtdDHdO5jVC7YnE91DGd23iP+gGXzonLr9xUWwAAAABJRU5ErkJggg==" style="height: 4px;width: 100%" width="100%" height="4"> </p><br/></div></div>'+  _that.editorContent)
            '<p class=\'gov_fgx\' style="margin-bottom: 10pt;height: 4px;">&nbsp;</p><br/></div></div>'+  _that.editorContent)
          // _that.editor.cmd.do('insertHTML','<div><h1 class=\'gov_fwjg\'>'+ _that.val_gov_fwjg + '</h1><div class=\'gov_fgx\'></div><br/></div>')
          _that.dialog_gov_fwjg = false
        }
        if (actiontype === 'gov_fwzh') {
          if (_that.val_gov_fwzh1 === '') {
            _that.$message.error('请输入发文字号')
            return
          }
          let html = $(_that.editorContent)
          let zh = '<div><div class=\'gov_zh\' style="font-size:14pt;font-family: \'仿宋_GB2312\'; clear: both;display: block; text-align: center"><table width="100%"><tr>'
          zh += '<td style="text-align:left;font-family:仿宋_GB2312!important; ">' + _that.val_gov_fwzh1 + '</td>'
          if (_that.val_gov_fwzh2 != '') zh += '<td style="text-align:right;font-family:仿宋_GB2312!important ">签发人:' + _that.val_gov_fwzh2 + '</td>'
          zh += '</tr></table></div><br/></div>'
          if (html.find('.gov_fgx').length > 0) {
            html.find('.gov_fgx').parent().append(zh)
            _that.editor.txt.clear()
            _that.editor.txt.html(html.html())
          } else {
            _that.editor.txt.append(zh)
            // _that.editor.cmd.do('insertHTML', zh)
          }
          _that.dialog_gov_fwzh = false
        }
        if (actiontype === 'gov_gwbt') {
          if (_that.val_gov_gwbt === '') {
            _that.$message.error('请输入标题')
            return
          }
          if (_that.wordname === '') _that.wordname = _that.val_gov_gwbt
          _that.editor.txt.append( '<div><div class=\'gov_tit\' style="font-size: 18pt!important;font-weight: bold;clear: both;display: block;margin-top: 15px;margin-bottom: 10px; text-align: center;">' + this.val_gov_gwbt + '<p></p></div><p><Br/></p></div>')
          // _that.editor.cmd.do('insertHTML', '<div><div class=\'gov_tit\' style="font-size: 18pt!important;font-weight: bold;clear: both;display: block;margin-top: 15px;margin-bottom: 10px; text-align: center;">' + this.val_gov_gwbt + '<p></p></div><p><Br/></p></div>')

          _that.dialog_gov_gwbt = false
        }
        if (actiontype === 'gov_zw') {
          if (_that.val_gov_zw === '') {
            _that.$message.error('请输入正文')
            return
          }
          _that.editor.txt.append('<div><div class=\'gov_content_p\' style="font-size: 14pt !important;">' + this.val_gov_zw + '<br></div><p><Br/></p></div>');
          _that.dialog_gov_zw = false
        }
        if (actiontype === 'gov_yjbt') {
          if (_that.val_gov_yjbt === '') {
            _that.$message.error('请输入标题')
            return
          }
          _that.editor.txt.append('<div><h1 class=\'gov_yjbt\' >' + this.val_gov_yjbt + '</h1><p><Br/></p></div>');
          _that.dialog_gov_yjbt = false
        }
        if (actiontype === 'gov_ejbt') {
          if (_that.val_gov_ejbt === '') {
            _that.$message.error('请输入标题')
            return
          }
          _that.editor.txt.append('<div><h2 class=\'gov_ejbt\' >' + this.val_gov_ejbt + '</h2><p><Br/></p></div>');
          _that.dialog_gov_ejbt = false
        }
        if (actiontype === 'gov_sjbt') {
          if (_that.val_gov_sjbt === '') {
            _that.$message.error('请输入标题')
            return
          }
          _that.editor.txt.append('<div><h2 class=\'gov_sjbt\' >' + this.val_gov_sjbt + '</h2><p><Br/></p></div>');
          _that.dialog_gov_sjbt = false
        }
        var json = editor.txt.getJSON()
      },
      getContent: function () {
        alert(this.editorContent)
      },
      handleCommand (command) {
        if (command == 'wordpreview') {
          this.showpreview = true
        }
        if (command == 'gov_fwjg') {
          this.dialog_gov_fwjg = true
        }
        if (command == 'gov_fwzh') {
          this.dialog_gov_fwzh = true
        }
        if (command == 'gov_gwbt') {
          this.dialog_gov_gwbt = true
        }
        if (command == 'gov_zw') {
          this.dialog_gov_zw = true
        }
        if (command == 'gov_yjbt') {
          this.dialog_gov_yjbt = true
        }
        if (command == 'gov_ejbt') {
          this.dialog_gov_ejbt = true
        }
        if (command == 'gov_sjbt') {
          this.dialog_gov_sjbt = true
        }


      },
      changeFixed (fullHeight) {
        this.$refs.editor.style.height = (fullHeight - 140) + 'px'
      },
      drawertabhandle(tab, event) {
        console.log(tab, event);
      },
      exportword(){
        const  _self=this;
        if(_self.editorContent === "" || _self.editorContent===null){
          _self.$message.error("内容为空");
          return;
        }
        if(_self.wordname === "" ){
          _self.$message.error("文件名称请输入");
          return;
        }
        Util.downAjax.post(_self.apiUrlPrefix + 'export',{
          content:_self.editorContent,
          fileName:_self.wordname
        }).then(function (res) {
          const content = res.data;
          const blob = new Blob([content]);
          const fileName = _self.wordname+".doc";
          if ('download' in document.createElement('a')) { // 非IE下载
            const elink = document.createElement('a');
            elink.download = fileName;
            elink.style.display = 'none';
            elink.href = URL.createObjectURL(blob);
            document.body.appendChild(elink);
            elink.click();
            URL.revokeObjectURL(elink.href);// 释放URL 对象
            document.body.removeChild(elink);
          } else { // IE10+下载
            navigator.msSaveBlob(blob, fileName);
          }
        });
        // document.open("/api/")
      }
    },
    mounted () {
      Util.title('公文积木2')
      const that = this
      that.editor = new E(that.$refs.editor_toolbar, that.$refs.editor)
      that.editor.customConfig.menus = ['head', 'bold', 'italic', 'underline', 'foreColor', 'backColor', 'list', 'justify', 'table','undo']
      that.editor.customConfig.onchange = (html) => {
        that.editorContent = html
        $(".gov_content_p").on("click",function () {
         // alert("aa");
        });
      }
      that.editor.customConfig.zIndex = 888
      that.editor.create()

      window.onresize = () => {
        return (() => {
          that.clientheight = document.documentElement.clientHeight
        })()
      }
      that.changeFixed(that.clientheight)
      if(!(localStorage.getItem('gov_editor_draft') === null) && localStorage.getItem('gov_editor_draft')!=""){
        that.editor.txt.html(localStorage.getItem('gov_editor_draft'));
      }

      that.timer_editor = setInterval(() => {
        if(that.editor.txt.text() !="" && that.editorContent!="" && that.editorContent!=localStorage.getItem('gov_editor_draft')  ){
         localStorage.setItem("gov_editor_draft",that.editorContent)
          that.$notify({message: '自动保存草稿成功', type: 'info'})

        }
      },5000)
    },
    watch: {
      clientheight: function (val) {
        if (!this.timer) {
          this.clientheight = val
          this.changeFixed(this.clientheight)
          console.log(val)
          this.timer = true
          let that = this
          setTimeout(function () {
            that.timer = false
          }, 100)

        }
      }
    },
    destroyed () {
      //todo 3.0没有销毁方法
      // this.editor.destroy();
      this.editor=null;
    }
  }
</script>
<style>

  tb-todo-list {
    display: block;
    margin-top: 1em;
    margin-bottom: 1em;
  }
  .tb-todo-list-item {
    padding-top: 0.2em;
    padding-bottom: 0.2em;
    display: flex;
  }
  .tb-todo-list-btn {
    margin-right: 0.6em;
  }
  .tb-todo-list-state {
    display: inline-block;
    margin-top: 3px;
    width: 12px;
    height: 12px;
    border: 2px solid #1296db;
    background: #fff;
    border-radius: 3px;
    cursor: pointer;
    position: relative;
  }
  .tb-todo-list-state:after {
    content: "";
    position: absolute;
    border-right: 2px solid #fff;
    border-bottom: 2px solid #fff;
    left: 3px;
    top: 1px;
    width: 4px;
    height: 6px;
    transform: rotateZ(45deg);
  }
  .tb-todo-list-state-active:after {
    border-color: #1296db;
  }
  .tb-todo-list-state-disabled {
    opacity: 0.5;
  }
  .tb-todo-list-content {
    flex: 1;
  }


.el-drawer__header{margin-bottom: 0px;padding-bottom: 0px;padding-top:8px; }
.drawerbox .el-tabs__nav{margin-left: 25px!important;}
  .loginuser{float: right;color: #999; margin-top: 10px;font-size: 12px;display: blockl;cursor: pointer}
  .loginuser:hover{color: #409eff}
  .wordcontent {
    text-align: left;
    font-size: 14pt !important;
    color: #000;
    font-family: '黑体,仿宋_GB2312' !important;
  }

  .wordnamediv{ max-width: 200mm;margin: 0 auto;}

  .gov_fwjg {
    color: red;font-weight: bold;text-align: center;font-size: 36pt!important;font-family: '黑体,仿宋_GB2312' !important;;line-height: 1.2 !important;
  }

  .gov_fgx {
    border-bottom: 4px solid #ff0000;background: #ff0000!important;margin-bottom: 10pt;height: 4px;
  }

  .gov_content_p{
    line-height: 2em;
    font-size: 14pt !important;
    text-indent: 2em !important;
    font-family: "仿宋_GB2312" !important;
  }

  .gov_zh {
    font-size: 16pt;
    clear: both
  }
  .gov_zh table,.gov_zh table td,.gov_zh table th{border: none!important;}
  .gov_zh span:nth-child(2) {
    float: right
  }

  .gov_tit {
    font-size: 18pt !important;font-weight: bold;margin-top: 15px;text-align: center;
  }
  .gov_yjbt,h1 {
    font-size: 20pt !important;
    font-weight: bold;  font-family: "仿宋_GB2312" !important;
  }

  .gov_ejbt,h2 {
    font-size: 18pt !important;
    font-weight: bold;  font-family: "仿宋_GB2312" !important;
  }

  .gov_sjbt,h3 {
    font-size: 16pt !important;  font-family: "仿宋_GB2312" !important;
    font-weight: bold;
  }

  .w-e-text table, .w-e-text table td, .w-e-text table th, .wordcontent table th, .wordcontent table td {
    border-color: #000 !important;
  }

  .morebtn {
    float: left;
  }

  .w-e-toolbar {
    flex-wrap: wrap;
    -webkit-box-lines: multiple;
  }

  .w-e-toolbar .w-e-menu:hover {
    z-index: 10002 !important;
  }

  .w-e-menu a {
    text-decoration: none;
  }

  .fullscreen-editor {
    position: fixed !important;
    width: 100% !important;
    height: 100% !important;
    left: 0px !important;
    top: 0px !important;
    background-color: white;
    z-index: 9999;
  }

  .fullscreen-editor .w-e-text-container {
    width: 100% !important;
    height: 95% !important;
  }

  #editor {
    color: #000;
    text-align: left;
    max-width: 200mm;
    margin: 5px auto;
    border: 1px solid #f5f5f5;
    box-shadow: 1px 1px 10px #cbcbcb;
  }

  .w-e-text {
    overflow-y: auto !important;
    font-family: '仿宋_GB2312' !important;
  }

  #editor_toolbar {
    background-color: #f1f1f1;
    border: 1px solid #ccc;
  }
  @media only screen and (min-width: 900px) {
    .w-e-toolbar {
      padding-left: 35%
    }
  }

  /*.w-e-toolbar .w-e-droplist{bottom: 0!important;margin-bottom: 28px;top: unset}*/
  .nameinput input {
    border: none;
    font-size: 18px;
    color: #000;
    font-weight: bold
  }
</style>
