<template>
  <div class="container-artical">
     <el-card >
  <div slot="header">
    <my-bread>内容</my-bread>
  </div>
  <!-- 表单 -->
  <el-form ref="form"  label-width="80px" size="small">
  <el-form-item label="状态:">
      <!-- <el-radio-group v-model="radio">记得声明model里的radio属性 -->
      <el-radio-group v-model="reqpara.status">    
    <el-radio :label="null">全部</el-radio>
    <el-radio :label="0">草稿</el-radio>
    <el-radio :label="1">待审核</el-radio>
    <el-radio :label="2">审核通过</el-radio>
    <el-radio :label="3">审核失败</el-radio>
    <el-radio :label="4">已删除</el-radio>
  </el-radio-group>
  </el-form-item>
  <el-form-item label="频道:">
   <!--  -->
   <my-channel v-model="reqpara.channel_id"></my-channel>
  </el-form-item>
  <el-form-item label="日期:">
        <!-- v-model双向绑定数据了，所以点日期就会存到dataArr -->
          <el-date-picker
            v-model="dateArr"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
             @change="changeDate"
             value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
  <el-form-item >
    <el-button type="primary" @click="filterArticle()">筛选</el-button> </el-form-item> 
</el-form>
</el-card> 

 <el-card >
  <div slot="header">共查询到{{total}}条数据</div>
   <el-table :data="articles"><!--articles的数据类型是数组 [{1条数据},{2条数据},{id:'',date:''},] -->
    <el-table-column label="封面">
      <template slot-scope="scope"> 
        <!-- 这里面的scope因为要用到el-table-column提供的定义插槽的数据 -->
        <!--作用域插槽可以获取到row。column，status，table内部数据等数据，
        scope.row是遍历传给表格的数据（:data="articles"）产生的item，就是当前行数据-->
        <el-image fit="cover" :src="scope.row.cover.images[0]" style="width:150px;height:100px">
              <div slot="error" class="image-slot">
                 <img src="../assets/error.gif" style="width:150px;height:100px">
              </div>
            </el-image> 
      
      </template>
    </el-table-column>
    <!--prop指定每一行数据的此列的显示数据，数组articles中的字段名  -->
    <el-table-column label="标题" prop="title"></el-table-column>
    <el-table-column label="状态">
      <!-- network里面的请求的preview，是响应的对象，data.results是整个的article列表
      results里面是全部行数据，每个行数据又包括，title，status，cover， -->
        <template slot-scope="scope">
            <el-tag v-if="scope.row.status===0" type="info">草稿</el-tag>
            <el-tag v-if="scope.row.status===1">待审核</el-tag>
            <el-tag v-if="scope.row.status===2" type="success">审核通过</el-tag>
            <el-tag v-if="scope.row.status===3" type="warning">审核失败</el-tag>
            <el-tag v-if="scope.row.status===4" type="danger">已删除</el-tag>
          </template>
    </el-table-column>
    <el-table-column label="发布时间" prop="pubdate"></el-table-column>
    <el-table-column label="操作">
      <!--加作用域，因为想要知道当前点击的是哪篇文章，所以要拿scope.row里面的id -->
       <template slot-scope="scope">
            <el-button @click="editArticle(scope.row.id)" type="primary" icon="el-icon-edit" circle plain></el-button>
            <el-button @click="deleteArticle"  type="danger" icon="el-icon-delete" circle plain></el-button>
          </template>
    </el-table-column>
  </el-table>
  <el-pagination
  background
  layout="prev, pager, next"
  :page-size="reqpara.per_page"
  :current-page="reqpara.page" 
   @current-change="changePager"
  :total="total">   
  <!-- 总条数是从data.total_count拿到的，总页数是组件自己算的，默认每页10条 -->
 <!-- 当前页在下面data默认的是第一页reqpara.page 
  而@current-change当前页面改变时候触发它，然后有个回调参数currentpage -->
</el-pagination>
  </el-card >
  </div>


</template>

<script>
export default {
 data(){
     return {
      //  通过 reqpara 收集了筛选条件，自动收集 文章状态  所属频道 
      // 但是没有自动收集 开始时间和结束时间。，因为是个数组dateArr: []，要先取到数据，放进这个数组
         reqpara:{
            status:null,//代表不传参给后台，默认显示全部，这些字段都是后台数据库的字段名
            channel_id:null,
             begin_pubdate: null,
               end_pubdate: null,
               page:1,
               per_page:20
         },
         articles:[],
         total:0,//文章总条数,在data.total_count中可以拿到
         //channelOpt:[{value:122,label:"前端"}],//这里数据以后是从后台拿的,然后赋值给channelOpt
       
          dateArr: []
     }
 },
 created(){
  
   this.getArticles()
},
methods:{
  editArticle (id) {
      this.$router.push(`/publish?id=${id}`)
    },
 //删除
   deleteArticle (id) {
      // 确认框
      this.$confirm('此操作将永久删除该文章, 是否继续?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 点击确认
        try {
          // 发删除请求
          await this.$http.delete(`articles/${id}`)
          // 成功提示
          this.$message.success('删除成功')
          // 更新列表
          this.getArticles()
        } catch (e) {
          // 错误提示
          this.$message.error('删除失败')
        }
      }).catch(() => {})
    },
   
   // 筛选文章
    filterArticle () {
      // 回到第一页,其他不用管，因为在点击的时候，参数状态都存到reqpara了，参数都绑定了v-model
      this.reqpara.page = 1
      // 根据reqpara进行进行查处
      this.getArticles()
    },
  // 这里的参数dateArr是改变日期之后，组件自动把你选的日期传到这里
  // 也可以用上面的this.dateArr获取，因为，dateArr进行了v-model
  changeDate(dateArr){
    // 如果dateArr有值
     if (dateArr) {
        this.reqpara.begin_pubdate = dateArr[0]
        this.reqpara.end_pubdate = dateArr[1]
        // 上面是一种情况，还有一个清空功能，清空之后是‘’，
        // 给空字符串就会报错，所以要把null给日期
      } else {
        this.reqpara.begin_pubdate = null
        this.reqpara.end_pubdate = null
      }
  },
  // 改变页码之后，会有一个当前页传进来（组件内部的），
  // 然后假如点击了6页，就会把6传到下面的形参newpage，
  // 在imag.vue组件中,比较一下第9行,没有传参的情况
  changePager(newpage){
   //把形参赋值给data中的page
    this.reqpara.page=newpage
    // 重新渲染列表，会把新的{params:this.reqpara}传过去，显示第6也得数据
     this.getArticles()
  },
   async getArticles(){
      const {data:{data}}=await this.$http.get('articles',{params:this.reqpara}) //传的参数是个对象
      this.articles=data.results
      this.total=data.total_count
   },
 
}
}

</script>

<style scoped  lang="less">

</style>