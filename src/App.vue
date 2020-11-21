<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

  export default {
    name: 'App',
    methods: {},
    created() {
      // (function (doc, win) {
      //   var docEl = doc.documentElement,
      //     resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
      //     recalc = function () {
      //       var clientWidth = docEl.clientWidth;
      //       if (!clientWidth) return;
      //       docEl.style.fontSize = 48 * (clientWidth / 700) + 'px';
      //       console.log(clientWidth);
      //       console.log(docEl.style.fontSize);
      //     };
      //   if (!doc.addEventListener) return;
      //   win.addEventListener(resizeEvt, recalc, false);
      //   doc.addEventListener('DOMContentLoaded', recalc, false);
      // })(document, window);
    }
  }
</script>
<style>
@import "https://cdn.bootcss.com/material-design-icons/3.0.1/iconfont/material-icons.css";
  @font-face {
    font-family: JDZhengHT-EN-Regular;
    src: url(https://wq.360buyimg.com/data/ppms/others/JDZhengHei_01_Regular.ttf) format("truetype");
    font-weight: 400;
    font-style: normal
  }

  @font-face {
    font-family: JDZhengHT-EN-Bold;
    src: url(https://wq.360buyimg.com/data/ppms/others/JDZhengHei_01_Bold.ttf) format("truetype");
    font-weight: 400;
    font-style: normal
  }

  html, body {
    padding: 0;
    margin: 0!important;
    font-family: 'Roboto', STHeiTi, Helvetica, "Hiragino Sans GB",
    "Helvetica Neue", JDZhengHT-EN-Regular, JDZhengHT-EN-Bold, "Microsoft YaHei", Arial, sans-serif!important;
  }

  /*html {*/
  /*  font-size: 20px;*/
  /*  font-size: 5.33333vw*/
  /*}*/

  /*@media screen and (max-width: 320px) {*/
  /*  html {*/
  /*    font-size: 17.06667px*/
  /*  }*/
  /*}*/

  /*@media screen and (min-width: 540px) {*/
  /*  html {*/
  /*    font-size: 28.8px*/
  /*  }*/
  /*}*/

  #app {
    /*max-width: 900px;*/
    margin: 0 auto;
    /*font-family:  "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;*/
    /*font-family:  PingFangSC-Regular,Helvetica,Droid Sans,Arial,sans-serif,JDZhengHT-EN-Regular,JDZhengHT-EN-Bold;*/
    font-family: Roboto, STHeiTi, Helvetica, "Hiragino Sans GB", "Helvetica Neue", JDZhengHT-EN-Regular, JDZhengHT-EN-Bold, "Microsoft YaHei", Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-overflow-scrolling: touch;
    text-align: center;
    color: #757575;
  }

a{text-decoration: none;  transition: all .6s cubic-bezier(.175,.885,.32,1)}
img { border: 0; vertical-align: middle; -ms-interpolation-mode:bicubic;  }
fieldset { border: 1px solid #c0c0c0; margin: 0 2px; padding: 0.35em 0.625em 0.75em;  }
button,
input,
select,
textarea {  font-family: inherit;  font-size: 100%;  margin: 0;  outline:none;  }
button,
input {  line-height: normal;  }
button,
select {  text-transform: none;  }
button,
html input[type="button"],
input[type="reset"],
input[type="submit"] {  -webkit-appearance: button;  cursor: pointer;  }
.clearfix:after{content:".";display:block;height:0;clear:both;visibility:hidden;}.clearfix{display:inline-block;}/* Hides from IE-mac \*/* html .clearfix{height:1%;}.clearfix{display:block;}

button[disabled],
html input[disabled] {  cursor: default;  }
input[type="checkbox"],
input[type="radio"] {  box-sizing: border-box;  padding: 0;  }
input[type="search"] {  -webkit-appearance: textfield;  -moz-box-sizing: content-box;  -webkit-box-sizing: content-box;  box-sizing: content-box;  }
input[type="search"]::-webkit-search-cancel-button,
input[type="search"]::-webkit-search-decoration {  -webkit-appearance: none;  }
button::-moz-focus-inner,
input::-moz-focus-inner {  border: 0;  padding: 0;  }
input.submit {  border: 0;  margin: 0;  cursor: pointer;  }
input.radio {  width: 13px;  height: 13px;  float: left;  display: inline;  }
textarea {  overflow: auto;  vertical-align: top;  }
ul,
ol {  list-style:none; }
li,ul { padding: 0;margin: 0; list-style:none;  }
</style>
