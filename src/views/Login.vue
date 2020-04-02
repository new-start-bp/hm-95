<template>
  <div class="container">   
        <el-card class="card">
        
<el-form  ref="loginForm" :model="loginForm" :rules="rules" status-icon="">
  <el-form-item prop="mobile">
    <el-input placeholder="手机号" v-model="loginForm.mobile"></el-input>
  </el-form-item>
   <el-form-item  prop="code">
    <el-input placeholder="验证码" v-model="loginForm.code" style="width:240px;margin-right:6px"></el-input>
     <el-button >发送验证码</el-button>
  </el-form-item>
   <el-form-item >
    <el-checkbox :value="true">已阅读</el-checkbox>
  </el-form-item>
   <el-form-item >
    <el-button type="primary" @click="login()">登录</el-button>
  </el-form-item>
</el-form> 
   </el-card>   
  </div>
</template>

<script>
import auth from '@/utils/auth'
export default {
name:'my-login',
data() {
  // 自定义要校验的方法，然后return的时候用
  const checkmobile=(rule,value,callback)=>{
      //校验value的值
      if(/^1[3-9]\d{9}$/.test(value)){
        callback()
      }else{
        callback(new Error('格式错误'))
      }
  }
      return {
        loginForm: {
          mobile: '13911111111',
          code: '246810',      
        },
        rules:{
           mobile: [ { required: true, message: '请输入活动名称', trigger: 'blur' },
           {validator:checkmobile,trigger:'blur' }],  // 这里的checkmobile要定义在return前面
            code:[{ required: true, message: '请输入验证码', trigger: 'blur' }]
        }
      }
    },
    methods:{
      // 提交的时候也要验证是否填写了表单
      login(){
        // validate是组件<el-form>自带的方法，就应该由组件调用,validate方法里面有一个回调函数，
        //，this.$refs.loginForm，这个就是表单组件，valid是布尔值
        this.$refs.loginForm.validate(async(valid)=>{
          if(valid){
    
            // 因为axios挂载到了VUE的原型上，所以任何组件都能使用，
            // 每一个组件都是vue实例，所以实例可以访问构造函数上的方法和属性，
            // 以前 vum=new Vue(),vm是实例，现在用单文件组件，所以每一个组件都是实例
            // this.$http.post('authorizations',this.loginForm).then(
            //   res=>{
            //     auth.setUser(res.data.data)
            //     this.$router.push('./')
            //   }
            // ).catch(()=>{
            //   this.$message.error('手机号或者验证码错误')
            // })

            try {
              const res=await this.$http.post('authorizations',this.loginForm)
                auth.setUser(res.data.data)
                this.$router.push('./')
            }catch(e){
              // $message是element-ui给VUE挂载的属性，提供的方法error
               this.$message.error('手机号或者验证码错误')
            }
          }
        })
      }
    }
}
</script>

<style scoped  lang="less">
.container{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    /* background: pink; */
    background: url(../assets/login_bg.jpg);
    .card{
        width: 400px;
        height: 300px;
        position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    img{
        display: block;
        height: 30px;
        margin: 0 auto 20px;
    }
    }
}
</style>