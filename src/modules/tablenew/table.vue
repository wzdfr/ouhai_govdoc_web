<template>
    <el-drawer
      size="60%"
      :visible.sync="drawer_visible"
      @closed="doClose"
      :title="title"
      direction="rtl">
      <form @submit.prevent="insertTable">
        <label>
          {{$parent.locale["row count"]}}
          <input type="number" style="width: 60px" maxlength="2" min="2" max="10" v-model="rows">
        </label>
        <label>

          {{$parent.locale["column count"]}}
          <input type="number" style="width: 60px" maxlength="2" min="2" max="10" v-model="cols">
        </label>

        <span>  </span>
        <button type="submit">{{$parent.locale.save}}</button>
      </form>
    </el-drawer>

</template>

<style scoped>
.el-drawer__header{margin-bottom: 20px;}
</style>
<script>
  export default {
    props: {
      drawer_visible: Boolean
    },
    data() {
      return {
        title:"公文积木块 - 表格",
        visible: this.drawer_visible,
        rows: 2,
        cols: 2,
        hasHead: false,
        striped: false,
        hover: false
      }
    },
    watch: {
      visible(val) {
        this.drawer_visible = val
      }
    },
    created() {
    },
    methods: {
      doClose() {
        this.visible = false
        this.$emit("visibled",this.visible)
      },
      insertTable() {
        if (this.rows < 2 || this.rows > 10) {
          return
        }
        if (this.cols < 2 || this.cols > 10) {
          return
        }
        let table = '<table style="border-spacing: 0px; border-collapse: collapse; width: 100%; max-width: 100%; margin-bottom: 0px; border: 1px solid rgb(221, 221, 221); color: rgb(51, 51, 51); font-size: 14px; line-height: 20px; background-color: transparent;"><tbody>'
        for (let i = 0; i < this.rows; i++) {
          table += '<tr>'
          for (let j = 0; j < this.cols; j++) {
            table += '<td style="padding: 8px; line-height: 1.42857; vertical-align: top; border: 1px solid rgb(221, 221, 221);">&nbsp;</td>'
          }
          table += '</tr>'
        }
        table += '</tbody></table>'

        this.$parent.execCommand('insertHTML', table)
      }
    }
  }
</script>

