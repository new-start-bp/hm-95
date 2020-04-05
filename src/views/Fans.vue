<template>
  <div class="fans-container"> 
       <el-card>
        <div slot="header">
        <my-bread>粉丝管理</my-bread>
      </div>

   <el-tabs v-model="activeName"  type="card">
        <el-tab-pane label="粉丝列表" name="list">
           <div class="fans-list">
               <div class="fans-item">
                    <el-avater> </el-avater>  
                    <p>用户名</p>
                    <el-button type="primary" plain size="small">关注</el-button>
               </div>
           </div>
           <el-pagination
            background
            layout="prev, pager, next"
            :total="10"
                       
            >
          </el-pagination>
      </el-tab-pane>
        
        <el-tab-pane label="粉丝画像" name="img"> 
          <div ref="main" style="width:600px;height:400px"></div>  
</el-tab-pane>
</el-tabs>
       
       </el-card>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
name:"my-fans",
data(){
    return{
        activeName:'list',
    }
},
// dom生成完毕后会执行的回调函数（钩子函数）
  mounted () {
    this.initBar()
  },
  methods:{
  async  initBar () {
      const myChart = echarts.init(this.$refs.main)
      const option = {
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            // 动态获取数据
            // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            data:[],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '直接访问',
            type: 'bar',
            barWidth: '60%',
            // 每个柱子需要的数据
            // data: [10, 52, 200, 334, 390, 330, 220]
             data:[],
          }
        ]
      }
   const {data: { data }} = await this.$http.get('statistics/followers')
      for (const key in data.age) {
        option.xAxis[0].data.push(key.replace('le', '小于').replace('gt', '大于') + '岁')
        option.series[0].data.push(data.age[key])
      }
 
      myChart.setOption(option)
  },
 
  
}
}
</script>

<style>

</style>