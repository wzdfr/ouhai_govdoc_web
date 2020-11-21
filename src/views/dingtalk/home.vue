<template>
  <div class="ohdoc-main">
    <el-row :gutter="0" class="userinfo">
      <el-col :span="14">
        <el-avatar :size="48"
                   src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1604900519294&di=25ddda11151b518725785651b08edf59&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201809%2F01%2F20180901190625_wmpeq.thumb.700_0.jpeg">

        </el-avatar>

        <span class="username">瓯海区人民政府</span>
      </el-col>
      <el-col :span="10">
        <span class="tip">4分钟前更新</span>
        <i class="el-icon-setting"></i>
      </el-col>
    </el-row>
    <div class="searchbar">
      <el-input
        placeholder="请输入内容"
        prefix-icon="el-icon-search"
        v-model="search_input"/>
    </div>

    <div class="filetool">
      <i class="el-icon-folder-add"></i>
      <i class="el-icon-edit"></i>
    </div>

<div class="filelist">
    <el-collapse v-model="activeName"  accordion>
      <el-collapse-item  name="1">
        <template slot="title">
        <div class="el-colltit">  <i class="header-icon el-icon-folder"></i>  会议纪要</div>
        </template>
      <ul class="group-list">
          <li v-for="item in file_list"><i class="el-icon-document"></i>{{item.name}}</li>
      </ul>
      </el-collapse-item>
      <el-collapse-item  name="2">
        <template slot="title">
          <div class="el-colltit">  <i class="header-icon el-icon-folder"></i>  通知</div>
        </template>
        <ul class="group-list">
          <li v-for="item in file_list2"><i class="el-icon-document"></i>{{item.name}}</li>
        </ul>
      </el-collapse-item>
      <el-collapse-item  name="3">
        <template slot="title">
          <div class="el-colltit">  <i class="header-icon el-icon-folder"></i>  2019归档</div>
        </template>
        <ul class="group-list">
          <li v-for="item in file_list"><i class="el-icon-document"></i>{{item.name}}</li>
        </ul>
      </el-collapse-item>


    </el-collapse>
</div>

    <div class="btn-fla">
      <el-tooltip class="item" effect="dark" content="PC端版本演示" placement="top-start">
      <el-button type="primary" @click="createDocment2" icon="el-icon-plus" circle></el-button>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="移动端版本演示" placement="top-start">
      <el-button type="primary" @click="createDocment" icon="el-icon-plus" circle></el-button>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
  export default {
    name: "home",
    data() {
      return {
        file_list:[
          {name:"温州市瓯海区人民政府办公室关于印发瓯海区征收非房"},
          {name:"温州市瓯海区人民政府办公室关于印发瓯海区促进"},
          {name:"关于2019年度部门安全生产和消防工作目标管理结"},
          {name:"温州市瓯海区人民政府关于促进浙南闽北赣东进口中"},
        ],
        file_list2:[
          {name:"温州市瓯海区人民政府办公室关于印发瓯海区促进服装"},
          {name:"关于2019年度部门安全生产和消防工作目标管理责任"},
          {name:"温州市瓯海区人民政府关于促进浙南闽北赣东"},
        ],
        search_input: "请输入内容",
        activeName: "1"
      }
    },
    methods:{
      createDocment(){
        this.$router.push({path:'/dd/document'})
      },   createDocment2(){
        this.$router.push({path:'/doc/blocks3'})
      }
    }
  }
</script>

<style lang="less" scoped>
  .userinfo {
    text-align: left;
    background: #FFF;
    padding-top: 10px;
    .el-avatar{
      float: left;
      margin-left: 10px;
    }
    .username{
      float: left;
      margin-top: 14px;
      margin-left: 10px;
      color: #000;
      font-weight: bold;
      font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    }
    .el-col-10 {
      text-align: right;
      padding-right: 20px;
      padding-top: 20px;
      font-size: 11px;
      i{
        font-size: 16px;
      }
    }

  }
.filelist{
  margin: 15px 0;
  padding: 10px;
  background:#FFF;

}

.filetool{
  padding: 10px;
  text-align: right;
  background: #FFF;
  color: #0360bc;
  i{
    margin-right: 6px;
  }
}

  .el-colltit{font-size: 14px;color: #000;font-weight: bold;}
  .btn-fla{position: fixed;bottom: 20px;right: 20px;
  /deep/ i{font-size: 25px;font-weight: bold;}
    /deep/ button{box-shadow: 1px 1px 10px #969696;}
  }

.group-list{
  padding: 0;
  margin: 0;
  list-style: none;
  text-align: left;
  i{
    margin-right: 10px;
    color: #888;
  }
  li{
    padding: 3px 5px;
    border-bottom: 1px solid #f1f1f1;
    height: 32px;
    line-height: 32px;
    font-size: 14px;
  }:hover{
      background: #f3f3f3;
    }
}
  .searchbar {
    padding: 10px;
background: #FFF;
    /deep/ .el-input {
      input{
        border: none;
        background:#f5f5f5 !important;
      }
    }
  }

</style>
