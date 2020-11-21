<template>
  <div id="app-root">
    <div class="oh_container">
      <div class="gov-main-menu">

        <div class="warp" ref="gov_main_menu">
          <div class="wle">


            <div class="top">
              <div class="username">
                <el-avatar :size="60"
                           src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1604900519294&di=25ddda11151b518725785651b08edf59&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201809%2F01%2F20180901190625_wmpeq.thumb.700_0.jpeg">

                </el-avatar>
                <p>瓯海区人民政府</p>
              </div>
              <div v-if="!menu_isCollapse">
                <div style="padding: 0 10px">
                  <mu-button color="primary" ref="addbtn" @click="openbtn = !openbtn" full-width="true">
                    <i class="el-icon-plus"></i>
                    新建公文
                  </mu-button>
                </div>

                <mu-popover cover :open.sync="openbtn" :trigger="trigger">
                  <mu-list>
                    <mu-list-item button>
                      <mu-list-item-title>空白模板</mu-list-item-title>
                    </mu-list-item>
                    <mu-list-item button>
                      <mu-list-item-title>发函</mu-list-item-title>
                    </mu-list-item>
                  </mu-list>
                </mu-popover>
              </div>
              <div v-else>
                <el-button type="primary" icon="el-icon-plus" circle></el-button>
              </div>
            </div>
            <vuescroll :ops="ops">
              <div class="nav-group">
                <el-menu
                  default-active="0"
                  class="el-menu-vertical"
                  :collapse="menu_isCollapse"
                  @open="handleOpen"
                  @close="handleClose">
                  <el-menu-item-group>
                    <template slot="title">公文</template>
                    <el-menu-item index="recentdoc">
                      <i class="el-icon-document" style="color:#b115ff "></i>
                      <span slot="title">近期公文</span>
                    </el-menu-item>

                    <el-menu-item index="myshare">
                      <i class="el-icon-share" style="color: #0c86ff"></i>
                      <span slot="title"> 我的分享</span>
                    </el-menu-item>
                  </el-menu-item-group>


                  <el-submenu index="folder">
                    <template slot="title">
                      <i class="el-icon-folder-opened" style="color: #109dd5"></i>
                      <span>文件夹</span>
                    </template>
                    <el-menu-item index="folder-01">
                      <i ><icon_point ></icon_point></i>
                      <span slot="title">会议纪要</span>
                    </el-menu-item>
                    <el-menu-item index="folder-02">
                      <i ><icon_point ></icon_point></i>
                      <span slot="title">发文</span>
                    </el-menu-item>
                    <el-menu-item index="folder-03">
                      <i ><icon_point ></icon_point></i>
                      <span slot="title">上级发文</span>
                    </el-menu-item>
                  </el-submenu>

                  <el-submenu index="label">
                    <template slot="title">
                      <i class="el-icon-star-on" style="color: #42b983"></i>
                      <span>标签</span>
                    </template>
                    <el-menu-item index="label-01">
                      <i ><icon_point bg="#cf324c"></icon_point></i>
                      绝密
                    </el-menu-item>
                    <el-menu-item index="label-02">
                      <i ><icon_point bg="#888"></icon_point></i>
                      机密
                    </el-menu-item>
                    <el-menu-item index="label-03">
                      <i ><icon_point bg="#888"></icon_point></i>
                      秘密
                    </el-menu-item>
                    <el-menu-item index="label-04">
                      <i ><icon_point bg="#888"></icon_point></i>
                      普通
                    </el-menu-item>

                  </el-submenu>

                  <el-submenu index="trash">
                    <template slot="title">
                      <i class="el-icon-delete-solid"></i>
                      <span>回收站</span>
                    </template>
                    <el-menu-item index="trash-doc">
                      <i ><icon_point bg="#888"></icon_point></i>
                      公文回收站
                    </el-menu-item>

                  </el-submenu>

                </el-menu>
                <div style="height: 160px"></div>

              </div>
            </vuescroll>
          </div>

          <div class="split-line resize_line" maxWidth="400" minWidth="90" target="gov_main_menu">
            <div></div>
          </div>
        </div>


      </div>

      <div class="gov-docment-list " ref="gov-docment-list">
        <div class="wrap">
          <div class="wle">
            <div class="top-search">
              <div class="searchbar">
                <i class="el-icon-search"></i>
                <input placeholder="请输入搜索内容">
              </div>
            </div>

            <div class="list_tip">
              <p>9 篇公文</p>
              <div class="tool">
                <mu-menu>
                  <mu-button icon color="def">
                    <i class="el-icon-d-caret"></i>
                  </mu-button>
                  <mu-list slot="content">

                    <mu-list-item disabled="true">
                      <mu-list-item-title style="color: #999">排序</mu-list-item-title>
                    </mu-list-item>
                    <mu-list-item button>
                      <mu-list-item-title>创建时间</mu-list-item-title>
                    </mu-list-item>
                    <mu-list-item button>
                      <mu-list-item-title>修改时间</mu-list-item-title>
                    </mu-list-item>

                    <mu-list-item button>
                      <mu-list-item-title>公文名称</mu-list-item-title>
                    </mu-list-item>
                    <mu-list-item disabled="true">
                      <mu-list-item-title style="color: #999">查看方式</mu-list-item-title>
                    </mu-list-item>
                    <mu-list-item button>
                      <mu-list-item-title>摘要
                        <i class="el-icon-ok"></i>
                      </mu-list-item-title>
                    </mu-list-item>
                    <mu-list-item button>
                      <mu-list-item-title>列表
                      </mu-list-item-title>
                    </mu-list-item>
                  </mu-list>
                </mu-menu>


              </div>
            </div>


            <vuescroll :ops="ops">
              <div class="datas" style="height: 100%;">
                <ul class="files">

                  <li v-for="i in 10">
                    <div class="item">
                      <div class="title">
                        <p>AAAAA{{i}}</p>
                        <div class="opts">
                          <mu-button icon color="#888" small>
                          <i class="el-icon-edit"></i>
                          </mu-button>
                          <mu-button icon color="error" small>
                          <i class="el-icon-delete"></i>
                          </mu-button>

                        </div>
                      </div>

                      <div class="text">
                        <div class="text-bk">
                          <p>2020-11-11</p>
                          <p>通知</p>
                        </div>
                        <div class="body">
                          adsfdsfsdfdsfdsfdsfsdfdsfsdfdsfsdsdfdssdfdsfsd
                        </div>
                      </div>

                    </div>
                  </li>
                </ul>
              </div>
            </vuescroll>
          </div>

          <div class="split-line resize_line" maxWidth="600" minWidth="200" pxref="gov_main_menu"
               target="gov-docment-list">
            <div></div>
          </div>

        </div>
      </div>

      <div class="gov-docment-main">
        <div class="warp">
           <docblock :autoHeight="true"></docblock>
        </div>
      </div>
    </div>

  </div>


  <!--    {{currentEdtContent}}-->
  <!--    <editor :content="content" :autoHeight="true" @change="updateContent"></editor>-->
  <!--    <div class="page">-->
  <!--      &lt;!&ndash;      <p>asdfsdfds</p>&ndash;&gt;-->
  <!--      &lt;!&ndash;      <div>G</div>&ndash;&gt;-->
  <!--      <el-button @click="getcontentjson">get json</el-button>-->
  <!--    </div>-->


  <!--    <div class="test-editor"-->
  <!--         @paste.prevent="paste"-->
  <!--         @keypress="keypress"-->
  <!--         style="flex-shrink: 0;flex-grow: 1;width: 900px;max-width: 100%;display: flex;align-items: center;flex-direction: column;font-size: 16px;line-height: 1.5;color: rgb(55, 53, 47);padding-left: calc(96px + env(safe-area-inset-left));padding-right: calc(96px + env(safe-area-inset-right));">-->

  <!--      <div data-block-id="82e743c7-4735-4b81-90be-676ae1605aa5" class="notion-selectable notion-text-block"-->
  <!--           style="width: 100%; max-width: 625px; margin-top: 2px; margin-bottom: 1px;">-->
  <!--        <div style="color: inherit; fill: inherit;">-->
  <!--          <div style="display: flex;">-->
  <!--            <div contenteditable="true" spellcheck="true" placeholder="111111" data-root="true" class="notranslate"-->
  <!--                 style="max-width: 100%; width: 100%; white-space: pre-wrap; word-break: break-word; caret-color: rgb(55, 53, 47); padding: 3px 2px;">-->
  <!--          111-->
  <!--            </div>-->
  <!--          </div>-->
  <!--        </div>-->
  <!--      </div>-->

  <!--      <div data-block-id="82e743c7-4735-4b81-90be-676ae1605aa5" class="notion-selectable notion-text-block"-->
  <!--           style="width: 100%; max-width: 625px; margin-top: 2px; margin-bottom: 1px;">-->
  <!--        <div style="color: inherit; fill: inherit;">-->
  <!--          <div style="display: flex;">-->
  <!--            <div contenteditable="true" spellcheck="true" placeholder=" " data-root="true" class="notranslate"-->
  <!--                 style="max-width: 100%; width: 100%; white-space: pre-wrap; word-break: break-word; caret-color: rgb(55, 53, 47); padding: 3px 2px;font-size: 16px;">-->
  <!--              asdf2343dfdf<h1>sdfd</h1></div>-->
  <!--          </div>-->
  <!--        </div>-->
  <!--      </div>-->

  <!--    </div>-->

  <!--  </div>-->


</template>

<script>
  import Vue from 'vue'
  import docblock from '../editor/block'
  import vuescroll from 'vuescroll';
  import Util from '@/libs/util'
  import MuseUI from 'muse-ui'
  import 'muse-ui/dist/muse-ui.css'

  MuseUI.theme.add('myTheme', {
    primary: MuseUI.Colors.blue,
    secondary: MuseUI.Colors.pinkA200,
    success: MuseUI.Colors.green600,
    warning: MuseUI.Colors.yellow600,
    info: MuseUI.Colors.blue200,
    error: MuseUI.Colors.redA200,
  }).use('myTheme');
  Vue.use(MuseUI);

  export default {
    name: "index4",
    components: {docblock, vuescroll},
    data() {
      return {
        menu_isCollapse: false,
        menu_max_width: 90,
        openbtn: false,
        trigger: null,
        ops: {
          vuescroll: {
            mode: 'slide',
            // sizeStrategy: 'number',
            detectResize: true,
            pullRefresh: {
              enable: true,
              tips: {
                deactive: '下拉刷新',
                active: 'Release to Refresh',
                start: 'Refreshing...',
                beforeDeactive: 'Refresh Successfully!'
              }
            },
            pushLoad: {
              enable: true,
              tips: {
                deactive: 'Push to Load',
                active: 'Release to Load',
                start: 'Loading...',
                beforeDeactive: 'Load Successfully!'
              },
              auto: false,
              autoLoadDistance: 0
            },
            zoom:false
          },
          bar: {
            background: '#828282',
          }
        },
        currentEdtContent: "",
        content: "<h1>内容编辑器</h1>",
        block_data: [{
          id: '1101010',
          type: 'pt',
          content: 'aaaaaa'
        }, {
          id: '1101010',
          type: 'pt',
          content: 'aaaaaa'
        }],
        templates: [{
          pt: `<div class="back-item" backd-id="{{item.id}}">
      <div>{{item.content}}</div>
</div>`
        }, {
          type: "pt",
          tmp: `<div class="back-item" backd-id="{{item.id}}">
      <div>{{item.content}}</div>
</div>`
        }]
      }
    },
    created() {
    },
    mounted() {
      this.trigger = this.$refs.addbtn.$el;

      const _this = this
      _this.$nextTick(() => {
        let resizes = document.getElementsByClassName("resize_line")
        for (let i = 0; i < resizes.length; i++) {
          let resobj = resizes[i];
          const refv = resobj.getAttribute("target")
          const maxWidth = parseInt(resobj.getAttribute("maxWidth"))
          const minWidth = parseInt(resobj.getAttribute("minWidth"))
          const pxref = _this.$refs[resobj.getAttribute("pxref")]
          const targetref = _this.$refs[refv];
          resobj.onmousedown = function (e) {
            document.onmousemove = function (e) {
              Util.addClass(resobj, "move_split")
              let x = e.clientX
              if (refv == "gov-docment-list") {
                x -= pxref.offsetWidth
              }
              x = (x > maxWidth) ? maxWidth : (x < minWidth) ? minWidth : x
              resobj.style.left = x + "px";
              resobj.style.right = "0";
              return false
            }

            document.onmouseup = function (e) {
              Util.removeClass(resobj, "move_split")
              let x = e.clientX
              if (refv == "gov-docment-list") {
                x -= pxref.offsetWidth
              }
              x = (x > maxWidth) ? maxWidth : (x < minWidth) ? minWidth : x
              resobj.style.left = x + "px"
              _this.moveHandle(x, targetref, refv)
              document.onmousemove = null
              document.onmouseup = null
              resobj.releaseCapture && resobj.releaseCapture();
            }
            resobj.setCapture && resobj.setCapture()
            return false
          }
        }
      })
    },
    methods: {
      moveHandle(nowClient, topDom, target) {
        let changewidth = nowClient
        let remainHight = document.body.clientWidth - nowClient
        if (target == "gov_main_menu") {
          if (changewidth <= 90) {
            changewidth = 90
            this.menu_isCollapse = true
          } else {
            this.menu_isCollapse = false
          }
        }
        topDom.style.width = changewidth + 'px'
      },
      updateContent(cont) {
        this.currentEdtContent = cont
      },
      getcontentjson() {
        console.log(editor.getJSON())
      },
      paste(e) {
        // ########################
        let pasteText = e.clipboardData.getData('text/plain')
        const lines = pasteText.split('\n')
        const length = lines.length
        // console.log(lines)
        for (let i = 0; i < length; i++) {
          console.log(lines[i])
          document.execCommand('insertText', false, lines[i])
          if (i < length - 1) {
            document.execCommand('insertHTML', false, '<br/>')
          }
        }
      },

      keypress(e) {
        console.log(e)
        if (e.key === 'Enter') {
          e.preventDefault()
          e.target.cloneNode(true).parents()
          document.execCommand('insertHTML', false,)
          // this.$refs.mdEditor.innerHTML = this.$refs.mdEditor.innerHTML.replace('<br/><br/>', '<br/>')
        }
      }
    }
  }
</script>
<style>
  .drsubmenu {
    left: 10px;
    width: 185px;
    top:
  }
</style>
<style scoped lang="less">
  ul, li {
    padding: 0;
    margin: 0
  }

  #app-root {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    overflow: hidden;
    position: absolute;
    color: #172b4d;
    font-size: 13px;

    .oh_container {
      height: 100%;
      width: 100%;
      display: flex;
      position: relative;
      flex-grow: 1;
    }

    .split-line {
      top: 0;
      right: -4px;
      width: 7px !important;
      bottom: 0;
      cursor: ew-resize;
      opacity: 0;
      height: 100%;
      z-index: 10;
      position: absolute;
      transition: opacity 225ms cubic-bezier(0.4, 0, 0.6, 1) 100ms;

      div {
        height: 100%;
        width: 3px !important;
        margin: 0 auto;
        border-left: 1px solid #ffffff;
        border-right: 1px solid #ffffff;
        background-color: #448aff;
      }
    }

    .split-line:hover, .move_split {
      opacity: 0.6 !important;

      div {
        width: 6px !important;
      }
    }

    .gov-main-menu {
      display: flex;
      flex-direction: column;

      .top {
        padding-top: 10px;
        margin-bottom: 20px;

        p {
          margin: 3px 2px 20px 2px;
          font-size: 11px;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          color: rgb(143, 143, 143);
        }

        .govdoc-add {
          width: 100%;
          display: block;
        }

        /deep/ .el-button-group {
          width: 100%;
        }

        /deep/ .el-button-group .el-button--primary:first-child {
          width: 80%;
        }

      }


      .warp {
        width: 200px;
        height: 100%;
        min-height: 100%;
        z-index: inherit;
        overflow: visible;
        position: relative;
        flex-grow: 1;
        transition: width 225ms cubic-bezier(0.4, 0, 0.6, 1) 0ms;
        border-right: 1px solid #e6e9ed;
        background-color: #ffffff;

        .wle {
          width: 100%;
          height: 100%;
          display: flex;
          z-index: 5;
          flex-grow: 1;
          flex-direction: column;
        }
      }

      /deep/ .nav-group {
        height: 100%;
        min-height: 100%;
      }

      .el-menu--collapse {
        width: 90px;

        i {
          font-size: 22px;
          border-radius: 50%;
          background: #FFF;
          border: 1px solid rgba(237, 237, 237, 0.95);
          padding: 8px;
          color: rgba(0, 63, 132, 0.88);
          width: 40px;
        }

        /deep/ .el-submenu__title {
          padding: 0px 30px !important;
          margin: 10px 0;
        }

        /deep/ .el-menu-item .el-tooltip {
          padding-left: 30px !important;
        }

        /deep/ .el-menu-item {
          margin: 10px 0 !important;
        }
      }

      .el-menu-vertical {
        text-align: left;

        height: 100%;
        min-height: 100%;
        border-right: none;

        .el-menu-item {
          height: 45px;
          line-height: 45px;
          color: #172b4d;
        }

        /deep/ .el-submenu__title {
          /*padding: 0 10px !important;*/
          height: 45px !important;
          line-height: 45px !important;
          color: #172b4d;
        }

      }
    }

    .gov-docment-list {
      display: flex;
      width: 320px;
      position: relative;
      flex-shrink: 0;
      border-right: 1px solid #e6e9ed;
      flex-direction: column;
      background-color: #f4f6f9;

      .wrap {
        height: 100%;
        min-height: 100%;
        z-index: inherit;
        overflow: visible;
        position: relative;
        flex-grow: 1;

        .wle {
          width: 100%;
          height: 100%;
          display: flex;
          z-index: 5;
          flex-grow: 1;
          flex-direction: column;

          .top-search {
            height: 70px;
            display: flex;
            padding: 0 12px;
            box-sizing: border-box;
            align-items: center;
            border-bottom: 1px solid #e6e9ed;

            .searchbar {
              width: 100%;
              border: none;
              text-align: left;
              padding: 5px 10px;
              box-sizing: border-box;
              border-radius: 8px;
              background-color: transparent;

              i {
                font-size: 16px;
                color: #000;
              }

              input {
                background-color: transparent;
                padding-top: 5px;
                border-color: transparent;
                border-style: solid;
                border-width: 1px;
                padding-left: 7px;
                border-radius: 4px;
                padding-right: 7px;
                padding-bottom: 5px;
                outline: none;
                border: 0;
              }
            }

            :hover {
              background: #FFF;
            }
          }

          .list_tip {
            width: 100%;
            height: 42px;
            display: flex;
            box-sizing: border-box;
            align-items: center;
            flex-shrink: 0;
            padding-left: 20px;
            border-bottom: 1px solid #e6e9ed;

            p {
              flex: 1;
              text-align: left;
            }

            .tool {
              button {
                color: #777;
              }
            }
          }

          /deep/.__refresh{
            svg{
              width: 15px;height: 15px;font-size: 12px;
              color: #7f7f7f;
            }
          }

          .datas {
            height: 100%;
            display: block;

            .files {
              text-align: left;

              li {
                width: 100%;
                overflow: hidden;
                cursor: pointer;
                height: 100%;
                padding: 0;
                margin-right: 0;
                border-bottom: 1px solid #e6e9ed;
                margin-bottom: 0;
                box-sizing: border-box;
              }

              li:hover {
                background-color: rgba(80, 95, 121, 0.08);
                .title .opts{display: block}
              }

              li:active {
                background-color: #e8f2ff;
              }

              .item {
                height: 100%;
                /*display: flex;*/
                box-sizing: border-box;
                overflow: hidden;
                color: #172b4d;
                font-size: 14px;
                font-weight: 400;
                line-height: 1.6;
                padding: 20px;

                .title {
                  height: 22px;
                  display: flex;
                  margin-bottom: 8px;
                  flex-wrap: nowrap;
                  align-items: center;
                  word-break: break-word;
                  overflow: hidden;
                  p {
                    width: 100px;
                    color: #172b4d;
                    font-size: 14px;
                    font-weight: 400;
                    line-height: 1.6;
                    flex-grow: 1;
                    flex-shrink: 1;
                    align-self: center;
                    word-break: break-word;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;

                  }

                  .opts {
                    flex-shrink: 0;
                    display: none;
                    button{
                      width: 25px;height: 25px;
                    }
                    i{
                      font-size: 14px;
                    }
                  }
                }

                .text {
                  align-items: center;
                  width: 100%;
                  flex-grow: 1;

                  .text-bk {
                    width: 100%;
                    display: flex;
                    color: #a7afbc;;

                    p {
                      min-width: 67px;
                      flex-shrink: 0;
                      font-size: 12px;
                      padding: 0;
                      margin: 0;
                      margin-right: 15px;
                      align-self: center;
                      word-break: break-word;
                      overflow: hidden;
                      white-space: nowrap;
                      text-overflow: ellipsis;
                    }
                  }

                  .body {
                    position: relative;
                    padding-top: 4px;
                    display: -webkit-box;
                    overflow: hidden;
                    flex-grow: 1;
                    max-height: 42px;
                    text-overflow: ellipsis;
                    -webkit-box-orient: vertical;
                    align-self: center;
                    word-break: break-word;
                    color: #a7afbc;
                    font-size: 12px;
                    font-weight: 400;
                    line-height: 1.6;
                  }
                }
              }

            }
          }


        }

      }

    }

    .gov-docment-main {
      display: flex;
      padding: 0;
      background: #FFF;
      flex-grow: 1;
      min-width: 0;
      flex-direction: column;
    }
  }

  .test-editor div::selection, .test-editor *::selection {
    background: #8fdfff;
    color: white;
  }

  ::-moz-selection {
    background: #ccc;
    color: #ff645d;
  }

  ::-webkit-selection {
    background: #ccc;
    color: #ff645d;
  }

  .page {
    /*font-size: 13px;*/

    div {
      background: red
    }
  }
</style>
