<template>
 
    <el-container class="home-container">
  <el-aside class="myaside" :width="isOpen?'200px':'64px'">
     <div class="logo"><img src="../assets/avatar.jpg" alt=""></div> 
<!-- 点击侧边栏跳转 用el-menu提供的router属性，所以12行加一个router，是个布尔值，加上是ture
default-active="/" 原来默认激活首页，就算点击内容，还是激活首页，所以要动态激活菜单  
 动态绑定:default-active，那么值就可以是变量形式，或者表达式，
 结论：只需要获取路由路径，设置给default-active，
     $route获取路由相关信息 -->
      <el-menu
      router
      :collapse="!isOpen"
      :collapse-transition="false"
      
      :default-active="$route.path"
      class="el-menu-vertical-demo"
     
      background-color="#002244"
      text-color="#fff"
      active-text-color="#ffd04b">
     <el-menu-item index="/">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/article">
          <i class="el-icon-document"></i>
          <span slot="title">内容管理</span>
        </el-menu-item>
        <el-menu-item index="/image">
          <i class="el-icon-picture"></i>
          <span slot="title">素材管理</span>
        </el-menu-item>
        <el-menu-item index="/publish">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">发布文章</span>
        </el-menu-item>
        <el-menu-item index="5">
          <i class="el-icon-chat-dot-round"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="6">
          <i class="el-icon-present"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="7">
          <i class="el-icon-setting"></i>
          <span slot="title">个人设置</span>
        </el-menu-item>
      
    </el-menu>
     </el-aside>
  <!-- 主体 -->
  <el-container>
    <el-header class="headerbox">
        <span class="el-icon-s-fold icon1" @click="toggleAside()"></span>
        <span class="text">自媒体运营平台管理</span>
<el-dropdown class="mydropdown"  @command="dealClick">
  <span class="el-dropdown-link">
      <span class="other">其他</span>
    <i class="el-icon-arrow-down el-icon--right"></i>
  </span>
  <el-dropdown-menu slot="dropdown">
      <!-- 这里的icon是dropdown里面特有的属性 -->
    <el-dropdown-item icon="el-icon-setting" command="setting">个人中心</el-dropdown-item>
    <el-dropdown-item>设置</el-dropdown-item>   
  </el-dropdown-menu>
</el-dropdown>
       </el-header>
    <el-main>
      <!-- 这里放二级路由的内容 -->
        <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
 
</template>

<script>
export default {
name:'my-home',
data(){
  return{
    isOpen:true
  }
},
methods:{
  toggleAside(){
    this.isOpen=!this.isOpen
  },
  setting(){
    this.$router.push('./setting')
  },
  dealClick(command){
    this[command]()
  }
}
}
</script>

<style scoped lang='less'>
.home-container{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    .myaside{     
       background: #002244;
        .logo{
            width: 100%;
            height: 60px;
            background: pink;
            vertical-align: baseline;
            img{
                display: block;
                margin: 0 auto;
               
            }
        }
        // .minlogo{
        //   background-image: url(../asssts/logo_admin_01.png);
        //   background-size: 36px auto;
        // }
      .el-menu-vertical-demo{
           border-right: 0;
      }
    } 
    .headerbox{ 
        border: 1px pink solid;
        line-height: 60px;
        .icon1{
            font-size: 24px;
            vertical-align: middle;
        }
        .text{
             vertical-align: middle;
        }
        .mydropdown{
            float: right;
        }
    }
}
</style>