<template>
   <div class='images-container'>
       <el-card>
           <div slot="header">
               <my-bread>素材管理   </my-bread>
           </div>
           <!-- 头部 -->
           <div class="btn_box">
             <!--change是单选组件自带的事件,这个事件没有传参,本来可以传当前选择的label是哪个
             但是因为v-model双向绑定了,所以已经拿到了collect的值,放到reqParams,一起传给请求了  -->
        <el-radio-group @change="changeCollect()" v-model="reqParams.collect" size="small">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <el-button @click="openadd()" type="success" size="small" style="float:right">添加收藏</el-button>
      </div>
      <!-- 内容 -->
            <div class="img_list">
        <!-- <div class="img_item" v-for="i in 10" :key="i"> -->
        <div class="img_item" v-for="item in images" :key="item.id">
          <img :src="item.url" alt="">
          <!-- 全部按钮的内容,有收藏等操作,收藏按钮的时候没有,collect默认是false,v-if是true的时候显示,所以取反, -->
          <div class="option" v-if="!reqParams.collect">
            <!-- 点击收藏，再点取消，传入item，因为需要item的两个参数 -->
            <span @click="toggle(item)" class="el-icon-star-off" :style="{color:item.is_collected?'red':'#fff'}"></span>
            <span class="el-icon-delete"></span>
          </div>
        </div>
      </div>
       <el-pagination
  background
  layout="prev, pager, next"
  :page-size="reqParams.per_page"
  :current-page="reqParams.page" 
   @current-change="changePager"
  :total="total">   
  <!-- 总条数是从data.total_count拿到的，总页数是组件自己算的，默认每页10条 -->
 <!-- 当前页在下面data默认的是第一页reqpara.page 
  而@current-change当前页面改变时候触发它，然后有个回调参数currentpage -->
</el-pagination>
       </el-card>
  <el-dialog
  title="添加素材"
  :visible.sync="dialogVisible"
  width="30%"
  >
 
 <!-- 现在是el-upload组件上传，而不是axios，所以要写全地址 
 name默认是file，但是后台名称是image，所以改成image
 401是认证问题，所以要在请求头携带token-->
 <el-upload
  class="avatar-uploader"
  action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
  name="image"
  :headers="headers"
  :show-file-list="false"
  :on-success="uploadSuccess"
  >
  <img v-if="imageUrl" :src="imageUrl" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
</el-dialog>
   </div>
</template>

<script>
import auth from '@/utils/auth.js'
export default {
  name: 'my-image',
  data () {
    return {
      // 查询素材参数
      reqParams: {
        // 默认查询全局 false 收藏 true
        collect: false,
        page: 1,
        per_page: 10
      },
      // 素材列表
      images: [],
      // 总条数
      total: 0,
      dialogVisible:false,
      imageUrl:null,
      headers:{
           Authorization: `Bearer ${auth.getUser().token}`
      }
    }
  },
  created () {
    this.getImages()
  },
  methods: {
    //添加素材
    openadd(){
      this.dialogVisible=true
    },
    // 
    uploadSuccess(res){
      this.imageUrl = res.data.url
      // 提示
      this.$message.success('上传素材成功')
      // 3s后
      window.setTimeout(() => {
        // 关闭对话框
        this.dialogVisible = false
        // 更新第一页
        this.reqParams.page = 1
        this.getImages()
        // 考虑：重新打开对话框的时候，看到加号图标，而不是之前预览的图片
        this.imageUrl = null
      }, 3000)
    },
    //收藏与否
     async toggle(item) {
      try {
        // 修改请求
        const { data: { data } } = await this.$http.put(`user/images/${item.id}`, {
          collect: !item.is_collected
        })
        // data.collect 修改后的图片状态
        // 提示
        this.$message.success(data.collect ? '添加收藏成功' : '取消收藏成功')
        // 视图：收藏按钮颜色样式
        // item 就是渲染当前图片的，修改item即可驱动视图修改
        item.is_collected = data.collect
      } catch (e) {
        this.$message.error('操作失败')
      }
    },
    // 切换全局与收藏
    changeCollect () {
      this.reqParams.page = 1
      this.getImages()
    },
    // 切换分页
    changePager (newPage) {
      this.reqParams.page = newPage
      this.getImages()
    },
    // 获取素材列表
    async getImages () {
      const { data: { data } } = await this.$http.get('user/images', { params: this.reqParams })
      this.images = data.results
      this.total = data.total_count
    }
  }
}
</script>

<style scoped lang='less'>
.img_list{
    margin-top: 20px;
   .img_item{
       width: 180px;
       height: 180px;
        display: inline-block;
          border: 1px dashed #ddd;
            margin-right: 50px;
    margin-bottom: 15px;
    position: relative;
         img {
      width: 100%;
      height: 100%;
      display: block;
      
     
    }
    .option{
        position: absolute;
        left: 0;
        bottom: 0;
         height: 30px;
          color: #fff;
           line-height: 30px;
      background: rgba(0,0,0,0.3);
      text-align: center;
      width: 100%;
    }
   } 
}

</style>