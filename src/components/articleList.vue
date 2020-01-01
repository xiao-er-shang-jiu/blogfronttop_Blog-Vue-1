<template>
  <div>
    <!--顶部-->
    <div class="top-box app-row-start-layout shadow">
      <router-link class="router-link-active" to="/">
        <div class="app-row-center-layout">
            <img class="top-logo" src="../assets/avg.jpg" />
            <h2 style="color:#eee;">Ivan | 晏飞的个人博客</h2>
        </div>
      </router-link>
    </div>

    <!--中部-->
    <div class="center app-column-center-layout shadow">
      <div class="center-box">
        <!--左侧部分(文章列表)-->
        <div class="content-box app-column-start-left">
          <!--位置-->
          <el-breadcrumb class="pos-box app-row-start-left" separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>博客</el-breadcrumb-item>
          </el-breadcrumb>
          
          <div v-for="(article,aIndex) in articleList" :key="aIndex">
            <div @click="routerTo(article.id)" class="article-list-left-box app-column-start-left shadow">
              <!-- <img v-if="article.isTop == 1" class="istop" src="../assets/istop.jpg" /> -->
              <img class="article-list-left-img" :src="article.img" />
              <h3 class="article-list-left-title">{{article.title}}</h3>
              <div class="article-list-left-summary text-two-line-omit">{{article.summary}}</div>
              <div class="posts-default-info">
                <span><i class="el-icon-user-solid"></i> Ivan</span>
                <span><i class="el-icon-menu"></i> {{article.category}}</span>
                <span><i class="el-icon-time"></i> {{article.createTime}}</span>
                <span><i class="el-icon-view"></i> {{article.traffic}}</span>
              </div>
            </div>
          </div>
        </div>
        <!--右侧部分-->
        <div class="right-box hidden-xs-only">
          <div class="right-top-box shadow">
            <h3>随机文章</h3>
            <div class="right-top-box-item" v-for="(item,index) in articleRandList" :key="index">
              <img @click="routerTo(item.id)" class="article-list-right-img" :src="item.img" /> 
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
import { getArticleList,getListByRand } from '../api/blog/article.js'
import { getCategoryList } from '../api/blog/category.js'
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
      categoryList: []
    }
  },
  
  //页面加载时
  created() {
    console.log('articleList初始化')
    this.getArticleList()
    this.getListByRand()
    this.getCategoryList()
  },
  //页面离开时销毁
  beforeDestroy() {
    
  },
  methods: {
    //获取文章信息
    getArticleList() {
      getArticleList().then((res) => {
        this.articleList = res.data
      })
    },

    //获取随机文章
    getListByRand() {
      getListByRand().then((res) => {
        this.articleRandList = res.data
      })
    },

    //获取分类列表
    getCategoryList(){
      getCategoryList().then((res) => {
        this.categoryList = res.data
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
</style>
