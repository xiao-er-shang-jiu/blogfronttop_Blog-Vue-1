<template>
  <div style="height:300px;" class="app-column-center-layout">
    <span>登录中..正在进行页面跳转..</span>
  </div>
</template>

<script>
  import { getToken } from '../api/login/login.js'

  export default {
    data() {
      return {
        
      };
    },
    created() {
      var code = this.$route.query.code
      //请求github获取用户信息
      this.getToken(code)
    },
    methods: {
      getToken(code){
        getToken(code).then((res) => {
          var that = this
          if(res.code == 200){
            //跳转回之前的路由路径
            var path = localStorage.getItem("currentRoute")
            //保存用户信息
            localStorage.setItem('userinfo',res.data)
            that.$router.push(path);
            clearTimeout(this.timer);         //清除延迟执行
              this.timer = setTimeout(()=>{   //设置延迟执行
              location.reload()
            },500);
          }
        })
      }
    }
  };
</script>