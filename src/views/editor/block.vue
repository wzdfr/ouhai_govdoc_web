<template>
  <div class="doc-block-editor" :class="{'full-screen':fullScreen}" :style="{'z-index':zIndex}">
  <div class="block_header">
    <div class="doc_name">
          <div class="title">AAAAABBBB</div>
    </div>
    <div style="flex: 1;"></div>
    <div class="doc_status">
      <span>
      <i class="el-icon-check"></i>
       </span>
    </div>
    <div class="doc_toolbar">
            <div  class="buttons">
              <el-button size="small"  type="info" ><i class="el-icon-view"></i>  保 存</el-button>

              <el-button-group>
                <el-button size="small" circle icon="el-icon-edit"></el-button>
                <el-button size="small" circle icon="el-icon-share"></el-button>
                <el-popover  placement="bottom-end" trigger="click" ref="popover">
                <el-button size="small" slot="reference"  class="el-dropdown-link" @click="openToolbarMore = !openToolbarMore" ref="be_moreToolbar"
                           circle icon="el-icon-more"></el-button>

                  <div class="popcontent">
                    <a href="#" class="itemmenu"><i class="el-icon-link"></i> 公文历史</a>
                    <a href="#" class="itemmenu"><i class="el-icon-remove"></i> 删除历史</a>
                    <el-divider></el-divider>

                     <div class="notetext">
                       <div>所属文件夹:</div>
                       <div>所属文件夹:</div>
                       <div>sdf</div>
                       <div>AAA</div>
                     </div>

                  </div>
                </el-popover>

              </el-button-group>
            </div>

    </div>
  </div>


<block> sdf df dAAA </block>


    <div class="content" ref="content" id="gov_editor_content_main" :style="contentStyle"
         contenteditable @click="toggleDashboard(dashboard)">
    </div>
    <div v-show="drawerstatus">
      <keep-alive>
      <div v-show="drawerstatus" :is="drawer" @visibled="updateDrawer" :drawer_visible="drawerstatus"></div>
      </keep-alive>
      <!--    <el-drawer-->
      <!--      size="60%"-->
      <!--      :visible.sync="drawerstatus"-->
      <!--      :direction="rtl"  >-->
      <div class="drawerbox">
        <!--          <div v-show="drawerstatus" :is="drawer"></div>-->
      </div>

      <!--    </el-drawer>-->
    </div>

  </div>
</template>

<script>
  import './block.less'
  import RangeHandler from '@/range/handler'
  import {getChildrenJSON} from '@/range/util'
  import 'muse-ui/dist/muse-ui.css'
  import block from './block_core'

  export default {
    name: "editor",
    components:{block},
    props: {
      content: {
        type: String,
        required: true,
        default: ''
      },
      height: {
        type: Number,
        default: 300,
        validator(val) {
          return val >= 100
        }
      },
      zIndex: {
        type: Number,
        default: 1000
      },
      autoHeight: {
        type: Boolean,
        default: true
      },
      showModuleName: {}
    },
    data() {
      return {
        openToolbarMore:false,
        // defaultShowModuleName:false
        // locale: {},
        // modules:{},
        drawerstatus: false,
        drawer: null,
        fullScreen: false,
        dashboard: null
      }
    },
    watch: {
      content(val) {
        const content = this.$refs.content.innerHTML
        if (val !== content) {
          this.$refs.content.innerHTML = val
        }
      },
      fullScreen(val) {
        const component = this
        if (val) {
          component.parentEl = component.$el.parentNode
          component.nextEl = component.$el.nextSibling
          document.body.appendChild(component.$el)
          return
        }
        if (component.nextEl) {
          component.parentEl.insertBefore(component.$el, component.nextEl)
          return
        }
        component.parentEl.appendChild(component.$el)
      }
    },
    computed: {
      contentStyle() {
        const style = {}
        if (this.fullScreen) {
          style.height = `${window.innerHeight - this.$refs.toolbar.clientHeight - 1}px`
          return style
        }
        if (!this.autoHeight) {
          style.height = `${this.height}px`
          return style
        }
        style['min-height'] = `${this.height}px`
        return style
      }
    },

    getJSON() {
      return getChildrenJSON(document.getElementById("gov_editor_content_main"))
    },

    methods: {
      toggleFullScreen() {
        this.fullScreen = !this.fullScreen
      },
      enableFullScreen() {
        this.fullScreen = true
      },
      exitFullScreen() {
        this.fullScreen = false
      },
      focus() {
        this.$refs.content.focus()
      },
      toggleDashboard(dashboard) {

        this.dashboard = this.dashboard === dashboard ? null : dashboard
      },
      toogleDrawer(drawer) {
        this.drawerstatus = !this.drawerstatus
        this.drawer = drawer
        // this.drawer = this.drawer === drawer ? null : drawer
        // console.log("toogdrawer:"+this.drawerstatus)
        // console.log("toogdrawerCCC:"+drawer)
        // console.log("toogdrawer:"+this.drawer)
      },
      updateDrawer(status) {
        this.drawerstatus = status
        console.log(this.drawerstatus)
      },
      execCommand(command, arg) {
        this.restoreSelection()
        if (this.range) {
          new RangeHandler(this.range).execCommand(command, arg)
        }
        this.toggleDashboard()
        this.$emit('change', this.$refs.content.innerHTML)
      },

      getCurrentRange() {
        return this.range
      },
      saveCurrentRange() {
        const selection = window.getSelection ? window.getSelection() : document.getSelection()
        if (!selection.rangeCount) {
          return
        }
        const content = this.$refs.content
        for (let i = 0; i < selection.rangeCount; i++) {
          const range = selection.getRangeAt(0)
          let start = range.startContainer
          let end = range.endContainer
          // for IE11 : node.contains(textNode) always return false
          start = start.nodeType === Node.TEXT_NODE ? start.parentNode : start
          end = end.nodeType === Node.TEXT_NODE ? end.parentNode : end
          if (content.contains(start) && content.contains(end)) {
            this.range = range
            break
          }
        }
      },
      restoreSelection() {
        const selection = window.getSelection ? window.getSelection() : document.getSelection()
        selection.removeAllRanges()
        if (this.range) {
          selection.addRange(this.range)
        } else {
          const content = this.$refs.content
          const div = document.createElement('div')
          const range = document.createRange()
          content.appendChild(div)
          range.setStart(div, 0)
          range.setEnd(div, 0)
          selection.addRange(range)
          this.range = range
        }
      },
      activeModule(module) {
        if (typeof module.handler === 'function') {
          module.handler(this)
          return
        }
        if (module.hasDrawer) {
          this.toogleDrawer(`drawer-${module.name}`)
        }

        if (module.hasDashboard) {
          this.toggleDashboard(`dashboard-${module.name}`)
        }
        console.log(this.drawerstatus)
        console.log(this.drawer)
        console.log(module)
      }
    },
    created() {
      this.modules.forEach((module) => {
        if (typeof module.init === 'function') {
          module.init(this)
        }
      })
    },
    mounted() {
      const content = this.$refs.content
      content.innerHTML = this.content
      content.addEventListener('mouseup', this.saveCurrentRange, false)
      content.addEventListener('keyup', () => {
        this.$emit('change', content.innerHTML)
        this.saveCurrentRange()
      }, false)
      content.addEventListener('mouseout', (e) => {
        if (e.target === content) {
          this.saveCurrentRange()
        }
      }, false)
      this.touchHandler = (e) => {
        if (content.contains(e.target)) {
          this.saveCurrentRange()
        }
      }

      window.addEventListener('touchend', this.touchHandler, false)
    },
    updated() {
      // update dashboard style
      if (this.$refs.dashboard) {
        this.$refs.dashboard.style.maxHeight = `${this.$refs.content.clientHeight}px`
      }
    },
    beforeDestroy() {
      window.removeEventListener('touchend', this.touchHandler)
      this.modules.forEach((module) => {
        if (typeof module.destroyed === 'function') {
          module.destroyed(this)
        }
      })
    }
  }
</script>

<style lang="less" scoped>
  .vue-html5-editor{   border-radius: 0px!important;}
  #gov_editor_content_main{
    div{
      padding: 2px;border: 1px solid #FFF;
    }:hover{border:1px rgba(0, 105, 169, 0.58) dashed;display: block;float: none;}
    :hover:after{content: "普通积木块";float: right;font-size: 12px;font-weight: normal;color:#FFF;padding:2px;background: #ff8991;}
    table{
      border-color: #000;
    }
    table:hover:after{content: "表格积木";float: right;font-size: 12px;font-weight: normal;color:#FFF;padding:2px;background: #ff8991;}

  }

</style>

