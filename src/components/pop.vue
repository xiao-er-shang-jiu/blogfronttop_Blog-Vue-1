<template>
    <div>
      <el-tooltip class="item" effect="dark" content="点击展开" placement="bottom">
        <div @click="drawer=true" class="menu-btn">
          <i style="color:#eee;" class="el-icon-s-unfold"></i>
        </div>
      </el-tooltip>

      <el-drawer title="右侧菜单" size="80px"
        :visible.sync="drawer" 
        :with-header="false">
          <ul class="menu-box app-column-start-layout">
            <div style="height:150px;" class="app-column-center-layout">
              <img class="menu-avg" src="../assets/avg.jpg" />
            </div>
            
            <div style="height:300px;width:100%;" class="app-column-between-layout">
              <router-link class="menu-router-box" to="/">
                <div class="app-column-center-layout">
                  <i class="el-icon-house"></i>
                  <li>主页</li>
                </div>
              </router-link>
              <router-link class="menu-router-box" to="/articleList">
                <div class="app-column-center-layout">
                  <i class="el-icon-reading"></i>
                  <li>博客</li>
                </div>
              </router-link>
              <router-link class="menu-router-box" to="/about">
                <div class="app-column-center-layout">
                  <i class="el-icon-user"></i>
                  <li>关于</li>
                </div>
              </router-link>
              <router-link class="menu-router-box" to="/links">
                <div class="app-column-center-layout">
                  <i class="el-icon-link"></i>
                  <li>友链</li>
                </div>
              </router-link>
            </div>
          </ul>
      </el-drawer>
    </div>
</template>


<script>
  export default {
    data() {
      return {
        drawer: false,
      };
    }
  };
</script>

<style scoped lang="stylus">
  li
    color #000
    margin-top 5px
    text-shadow 0 3px 6px rgba(0,0,0,0.2)
  i 
    color #000
  a
    text-decoration none
  a hover
    text-decoration none
  .menu-btn
    position fixed
    right 0px
    top 20px
    z-index 30
    padding 12px 15px 12px 15px
    border 1px solid rgba(255,255,255,0.6)
    background #333333
    cursor pointer
    
  .menu-box
    height 100%
    list-style none
    font-size 14px
  .menu-avg
    width 35px
    height 35px
    border 3px solid #1E1E1E
    padding 5px
    border-radius 50%
    margin 0px 10px 0px 10px
  .menu-avg:hover
    animation rotate 3s linear infinite
  .menu-router-box
    text-decoration none
    width 100%
    padding 10px 0px 10px 0px
  .menu-router-box:hover 
    background #eee
    
</style>