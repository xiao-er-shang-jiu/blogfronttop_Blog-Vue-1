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
      <div style="margin-bottom:5%;" class="center-box">
        <!--友情链接--> 
        <div class="about-box">
          <!--位置-->
          <el-breadcrumb class="pos-box app-row-start-left" separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>友链</el-breadcrumb-item>
          </el-breadcrumb>
          <div style="padding:20px;">
            <div class="link-title-box app-column-start-left">
              <h3>优质博客</h3>
            </div>
            <div class="link-box">
              <div class="link-item-box app-column-center-layout">
                <a class="link-name app-column-center-layout" href="http://angelive.fun" target="_blank">
                  <img class="link-img" src="../assets/link/angelive.jpg" />
                  Angelive
                </a>
              </div>
              <div class="link-item-box app-column-center-layout">
                <a class="link-name app-column-center-layout" href="https://blog.yuanaaa.top/" target="_blank">
                  <img class="link-img" src="../assets/link/yuan.jpg" />
                  吴予安
                </a>
              </div>
              <div class="link-item-box app-column-center-layout">
                <a class="link-name app-column-center-layout" href="https://www.wmyskxz.com/" target="_blank">
                  <img class="link-img" src="../assets/link/wmyskxz.jpg" />
                  我没有三颗心脏
                </a>
              </div>
            </div>

            <div style="margin-top:50px;" class="link-title-box app-column-start-left">
              <h3>精品社区</h3>
            </div>
            <div class="link-box">
              <div class="link-item-box app-column-center-layout">
                <a class="link-name app-column-center-layout" href="https://www.csdn.net/" target="_blank">
                  <img class="link-img" src="../assets/link/csdn.jpg" />
                  CSDN
                </a>
              </div>
            </div>

            <div style="margin-top:50px;" class="link-title-box app-column-start-left">
              <h3>推荐网站</h3>
            </div>
            <div class="link-box">
              <div class="link-item-box app-column-center-layout">
                <a class="link-name app-column-center-layout" href="https://www.springcloud.cc/" target="_blank">
                  <img class="link-img" src="../assets/link/springcloud.jpg" />
                  SpringCloud
                </a>
              </div>
              <div class="link-item-box app-column-center-layout">
                <a class="link-name app-column-center-layout" href="https://cn.vuejs.org/" target="_blank">
                  <img class="link-img" src="../assets/link/vue.jpg" />
                  Vue
                </a>
              </div>
              <div class="link-item-box app-column-center-layout">
                <a class="link-name app-column-center-layout" href="https://element.eleme.cn/" target="_blank">
                  <img class="link-img" src="../assets/link/element.jpg" />
                  element
                </a>
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
              <!-- <div class="right-top-box-item-title">
                <h5>{{item.title}}</h5>
              </div> -->
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
    this.getListByRand()
    this.getCategoryList()
  },
  //页面离开时销毁
  beforeDestroy() {
    
  },
  methods: {

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
  
</style>
