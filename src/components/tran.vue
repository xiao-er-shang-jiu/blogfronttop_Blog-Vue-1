<template>
  <!--移动端折叠栏-->
  <div id="tran-box" class="tran-box">
    <div class="tran-btn">
      <i class="el-icon-s-unfold" @click="show = !show"><span style="font-size:13px;">MENU</span></i>
      <transition name="el-fade-in-linear">
        <div class="tran-top-box" v-show="show">
          <h5 class="tran-name">Ivan</h5>
          <img class="tran-img" src="../assets/avg.jpg" />
        </div>
      </transition>
    </div>
    <el-collapse-transition>
      <div v-show="show" @click="show = !show" class="nav-box app-column-center-layout">
        <transition name="el-fade-in-linear">
        <ul class="tran-nav app-column-between-layout">
          <router-link class="tran-router router-link-active app-column-center-layout" to="/"><li>主 页</li></router-link>
          <router-link class="tran-router router-link-active app-column-center-layout" to="/articleList"><li>博 客</li></router-link>
          <router-link class="tran-router router-link-active app-column-center-layout" to="/about"><li>关 于 我</li></router-link>
          <router-link class="tran-router router-link-active app-column-center-layout" to="/links"><li>友 情 链 接</li></router-link>
        </ul>
        </transition>
      </div>
    </el-collapse-transition>
  </div>
</template>

<script>
  export default {
    data () {
        return {
            show: false
        }
    },
  }
</script>

<style>
.tran-box{
  display: none;
}
@media screen and (max-width: 750px) {
  .tran-box{
    display: block;
    position: fixed;
    top: 20px;
    left: 20px;
    z-index: 20;
  }
  .tran-top-box{
    position: fixed;
    right: 30px;
    display: flex;
    flex-direction: row;
    align-items: flex-end;
  }
  .tran-name{
    font-size: 18px;
  }
  .tran-img{
    width: 35px;
    height: 35px;
    border-radius: 50%;
    margin: 0px 10px 0px 10px;
    animation: rotate 3s linear infinite;
  }
  .tran-btn{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px solid;
    width: 50px;
    height: 25px;
    padding: 0px 10px 0px 10px;
    border-radius: 5px;
  }
  .transition-box {
    margin-bottom: 10px;
    width: 200px;
    height: 100px;
    border-radius: 4px;
    background-color: #409EFF;
    text-align: center;
    color: #fff;
    padding: 40px 20px;
    box-sizing: border-box;
    margin-right: 20px;
  }
  .nav-box{
    margin-top: 34px;
    right: 0px;
    z-index: 1;
    background: rgba(0,0,0,0.3);
    position: fixed;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-repeat: round;
  }
  .tran-nav{
    display: none;
    background: rgba(0,0,0,0.9);
    list-style: none;
    position: fixed;
    left: 0px;
    top: 81px;
    height: 300px;
    width: 100px;
    padding: 20px;
    z-index: 11;
  }
  .tran-router{
    width: 100%;
    height: 100%;
    text-align: center;
    border-bottom: 1px solid #eeeeee;
    padding: 10px 0px 10px 0px;
  }
  .tran-nav li{
    color: #fff;
    font-size: 16px;
    width: 100%;
    text-decoration: none;
    letter-spacing: -1px;
    font-weight: 500;
  }
}

</style>