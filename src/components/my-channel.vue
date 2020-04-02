<template>
   <!-- clearable可清空，但是清空之后就是空字符串‘’，就会出现传参错误，如果不想传参改为null即可 -->
      <el-select @change="changeChannel"
       clearable 
       :value="value" 
       v-model="channelId" placeholder="请选择">
   <!--channelOpt里面是从数据库拿的，数据库就是有id和name  -->
    <el-option
      v-for="item in channelOpt"
      :key="item.id"
      :label="item.name"
      :value="item.id">
    </el-option>
  </el-select>
</template>

<script>
export default {
    name:'my-channel',//plugin全局注册的时候用
    props:['value'],//父传子的，只能传不能改，传到第5行去显示了，但是，当你再选择的时候，
    //是改不了值得，所以修改change事件的方法，让选择的channelid传给父组件
    data(){
return{
     channelId: null,
      channelOpt:[],
}
    },
    created () {
    this.getChannel()
  },
methods:{
    changeChannel (value) {
      // 清空的时候值是 '' 不符合后台要求，你应该改成 null  代表查询全部
      if (value === '') this.channelId = null
      //频道change之后把value交给父组件，
       this.$emit('input', value)
    },
     async getChannel(){
    //const res={data:{message:'ok',data:{channels:[]}}}
    //const{data:{data}}也简写了，完整的是const{data:{data:data}}
    //   第一个data是找到这个的属性名，字段名，冒号后面才是真正的变量
        const {data:{data}}=await this.$http.get('channels')
        this.channelOpt=data.channels
  }
}
}
</script>

<style>

</style>