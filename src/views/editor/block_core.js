export default {
  name: "block_editor",
  props: {
    bg: {
      type: String,
      default: "red"
    }
  },
  data: {
    sdf: "aa",
    obj: '',
  },
  init(opts) {
    if (opts.type == 0) {

    }
  },
  kedownlinfo(key) {
    const self = this
    document.onkeydown(function (e) {
      let keyNum = window.event ? e.keyCode : e.which;
      switch (keyNum) {
        case 13:
          self.createblock(e)
          break
      }
    })
  },
  render(h) {
    const button = (
      <div>
        <el-button>TEST</el-button>
      </div>
    )
    const bg2 = this.bg
    const {bg} = this
    // return h("div",{class:"abc"},"sdfsdfdffdsfsdfsdfsdsssssssssss")
    return (
      <div class='xx'>
        {button}
        AAAAAAAAAAAAAAA<h1 style={{
        background: bg,
        color: '#FFF'
      }} attid={bg}>{bg}sadfsd{bg2}</h1>
      </div>
    )
  },
  created() {
    console.log("back_coreddd")

  },
  createblock(e) {
    console.log(e)
  },
  template: '<div>AA</div>'
}
