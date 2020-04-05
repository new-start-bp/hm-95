<template>
  <div class="comment-container">
      <el-card>
        <div slot="header">
        <my-bread>评论</my-bread>
      </div>
      <el-table :data="comments">
         <el-table-column label="文章标题" prop="title"></el-table-column>
        <el-table-column label="总评论数" prop="total_comment_count"></el-table-column>
        <el-table-column label="粉丝评论数" prop="fans_comment_count"></el-table-column>
        <el-table-column label="评论状态">
          <!-- scope.row.comment_status 值false代表正常  值为true代表关闭了 -->
          <template slot-scope="scope">
            {{scope.row.comment_status?'关闭':'正常'}}
           </template>  
             </el-table-column>
        <el-table-column label="操作" width="120px">
          <template slot-scope="scope">
            <el-button size="small" v-if="scope.row.comment_status" type="success">打开评论</el-button>
            <el-button size="small" v-else type="danger">关闭评论</el-button>
          </template>
        </el-table-column>
      </el-table>
       <el-pagination
            background
            layout="prev, pager, next"
            :total="10"
           
            
            >
          </el-pagination>
       </el-card>

      </div>
</template>

<script>
export default {
name:'my-comment',
data(){
    return{
        comments:[],
        reqParams: {
        response_type: 'comment',
        page: 1,
        per_page: 20
      },
    }
},
created () {
    // 组件初始化会执行这个函数
    this.getComments()
  },
  methods:{
    async getComments () {
      const { data: { data } } = await this.$http.get('articles', { params: this.reqParams })
      this.comments = data.results
      this.total = data.total_count
    }
  }
}
</script>

<style>

</style>