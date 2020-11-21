<template>
    <div class="dingtalk-app" ref="dingtalk-app">
      <router-view />
    </div>
</template>

<script>
    export default {
        name: "main",
      created() {

      }
    }
</script>

<style >
  body,html{background: #f0f0f0!important;}
.dingtalk-app{height: 100%;min-height: 100%;}
</style>
