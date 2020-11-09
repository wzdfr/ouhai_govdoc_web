<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods:{

  },
  created() {
    (function (doc, win) {
      var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
          var clientWidth = docEl.clientWidth;
          if (!clientWidth) return;
          docEl.style.fontSize = 48 * (clientWidth / 700) + 'px';
          console.log(clientWidth);
          console.log(docEl.style.fontSize);
        };
      if (!doc.addEventListener) return;
      win.addEventListener(resizeEvt, recalc, false);
      doc.addEventListener('DOMContentLoaded', recalc, false);
    })(document, window);
  }
}
</script>

<style>
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

  html,body{padding: 0;margin: 0;
    font-family:  PingFangSC-Regular,Helvetica,Droid Sans,Arial,sans-serif,JDZhengHT-EN-Regular,JDZhengHT-EN-Bold;}
  html {
    font-size: 20px;
    font-size: 5.33333vw
  }

  @media screen and (max-width: 320px) {
    html {
      font-size: 17.06667px
    }
  }

  @media screen and (min-width: 540px) {
    html {
      font-size: 28.8px
    }
  }

#app {
  max-width: 900px;
  margin: 0 auto;
  /*font-family:  "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;*/
  font-family:  PingFangSC-Regular,Helvetica,Droid Sans,Arial,sans-serif,JDZhengHT-EN-Regular,JDZhengHT-EN-Bold;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-overflow-scrolling: touch;
  text-align: center;
  color: #757575;
}
</style>
