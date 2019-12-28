<template>
  <div>
    <!--顶部-->
    <div class="top-box app-row-start-layout shadow">
      <div class="top-width app-column-center-layout hidden-xs-only">
          <router-link class="router-link-active" to="/">
            <img class="top-logo" src="../assets/ivan.jpg" />
          </router-link>
      </div>
      <ul class="hidden-xs-only">
        <router-link class="router-link-active" to="/"><li>主页</li></router-link>
        <router-link class="router-link-active" to="/articleList"><li>博客</li></router-link>
        <router-link class="router-link-active" to="/about"><li>关于</li></router-link>
        <router-link class="router-link-active" to="/links"><li>友情链接</li></router-link>
      </ul>
    </div>

    <!--中部-->
    <div class="center app-column-center-layout shadow">
      <div class="center-box">
        <!--个人资料)-->
        <div class="about-box">
          <div class="about-top-box">
            <h3>个人资料</h3>
          </div>
          <div class="about-top-item-box app-row-start-layout">
            <div class="about-top-item">
              <img class="about-top-item-avg" src="../assets/avg.jpg" />
              <div class="about-left-box app-row-between-layout">
                <div class="app-column-center-layout">
                  <label class="about-data-label">{{statistical.articleCount}}</label>
                  <span class="about-data-span">博客</span>
                </div>
                <div class="line"></div>
                <div class="app-column-center-layout">
                  <label class="about-data-label">{{statistical.tagsCount}}</label>
                  <span class="about-data-span">标签</span>
                </div>
                <div class="line"></div>
                <div class="app-column-center-layout">
                  <label class="about-data-label">{{statistical.commontCount}}</label>
                  <span class="about-data-span">评论</span>
                </div>
              </div>
              <div class="a-box app-row-between-layout">
                <a class="a-class" href="https://github.com/15207126400?tab=repositories" target="_blank">Github</a>
                <a class="a-class hidden-xs-only" href="tencent://message/?uin=286835776&Site=qq&Menu=yes">Call Me</a>
              </div>
            </div>
            <div class="about-top-info-box">
              <span>昵称: 苏</span>
              <span>实名: Ivan</span>
              <span>性别: 男</span>
              <span>生日: 1997年08月15日</span>
              <span>QQ：286835776</span>
              <span>Email: 286835776@qq.com</span>
              <span>座右铭：走得远比走得快更加重要</span>
              <!-- <span class="qq-group">QQ群: 
                <a target="_blank" href="//shang.qq.com/wpa/qunwpa?idkey=8d443a712bbeb5aae1e78ba0954bce2544a7b07b19d8123c34b0e4d63b45d97c">
                  <img style="height:20px;margin-left:10px;" border="0" src="//pub.idqqimg.com/wpa/images/group.png" alt="牛逼花吹牛交流群" title="牛逼花吹牛交流群">
                </a>
              </span> -->
            </div>
          </div>
          <!--经历介绍-->
          <div style="margin-top:50px;" class="about-top-box">
            <h3>工作经历</h3>
            <div style="padding:20px;height:450px;">
              <el-steps direction="vertical" :active="3">
                <el-step title="2017年03月~2017年11月" description="武汉三仁融信数据服务有限公司" />
                <el-step title="2017年11月~2019年03月" description="武汉云维时代信息技术有限公司" />
                <el-step title="2019年03月~2019年09月" description="武汉启恒智互联科技有限公司" />
                <el-step title="2019年09月~至今" description="武汉邻盛智能科技有限公司" />
                <el-step title="未来待续" description="未来是一段很长很长很长的旅程"></el-step>
              </el-steps>
            </div>
          </div>
        </div>
        <!--右侧部分-->
        <div class="right-box hidden-xs-only">
          <div class="right-top-box shadow">
            <h3>随机文章</h3>
            <div class="right-top-box-item" v-for="(item,index) in articleRandList" :key="index">
              <img @click="routerTo(item.id)" class="article-list-right-img" :src="item.img" /> 
              <div class="right-top-box-item-title">
                <h5>{{item.title}}</h5>
              </div>
            </div>
          </div>
          <div class="right-bottom-box shadow">
            <h3>热门标签</h3>
            <div class="category-box">
              <span @click="routerToTags(category.id)" class="category-name" v-for="(category,cIndex) in categoryList" :key="cIndex">{{category.name}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--底部-->
    <div class="bottom-box app-column-start-left">
        <label class="bottom-title">
            <span class="footer__heart">❤️</span>
            Copyright © 2019 All Rights Reserved.  Ivan Personal Blog
        </label>
        <label class="bottom-Record">
            <a style="color:#828282;" target="_blank" href="http://www.beian.miit.gov.cn/">鄂ICP备19026210号</a>
        </label>
    </div>
  </div>
</template>

<script>
import { getListByRand } from '../api/blog/article.js'
import { getCategoryList } from '../api/blog/category.js'
import { getStatistical } from '../api/blog/statistical.js'
export default {
  name: '',
  props: {
    msg: String
  },
  //变量定义
  data () {
    return {
      articleList: [],
      articleRandList: [],
      categoryList: [],
      statistical: {}
    }
  },
  //页面加载时
  created() {
    console.log('about初始化')
    this.getListByRand()
    this.getCategoryList()
    this.getStatistical()
  },
  //页面离开时销毁
  beforeDestroy() {
    
  },
  methods: {

    //统计
    getStatistical() {
      getStatistical().then((res) => {
        console.log(res)
        this.statistical = res
      })
    },

    //获取随机文章
    getListByRand() {
      getListByRand().then((res) => {
        this.articleRandList = res
      })
    },

    //获取分类列表
    getCategoryList(){
      getCategoryList().then((res) => {
        this.categoryList = res
      })
    },

    //跳转文章详情
    routerTo(id){
      this.$router.push({
         name: 'article', 
         params: {
            id: id
          }
      });
    },

    //通过标签跳转文章列表
    routerToTags(id){
      this.$router.push({
         name: 'tags', 
         params: {
            id: id
          }
      });
    }
  }
}
</script>

<!-- 样式 -->
<style scoped>
  ul{
    list-style:none;
  }
  ul li {
    float: left;
    margin:0 10px;
  }
  .qq-group{
    display: flex;
    flex-direction: row;
    align-items: center;
    line-height: 12px;
  }

</style>
