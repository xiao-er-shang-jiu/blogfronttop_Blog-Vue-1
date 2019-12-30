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
    <div
     class="center app-column-center-layout shadow">
      <div class="center-box">
        <!--左侧部分(文章详情)-->
        <div class="content-box app-column-start-left">
          <!--位置-->
          <el-breadcrumb class="pos-box app-row-start-left" separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/articleList' }">博客</el-breadcrumb-item>
            <el-breadcrumb-item>文章</el-breadcrumb-item>
          </el-breadcrumb>
          <div class="white-bg app-column-start-left">
            <div class="content-item">
              <h2>{{article.title}}</h2>
              <div class="posts-default-info season">
                <span><i class="el-icon-user-solid"></i> Ivan</span>
                <span><i class="el-icon-menu"></i> {{article.category}}</span>
                <span><i class="el-icon-time"></i> {{article.createTime}}</span>
                <span><i class="el-icon-view"></i> {{article.traffic}}</span>
                <span><i class="el-icon-chat-dot-round"></i> {{commentList.length}}</span>
              </div>
            </div>
            <div class="center-left-item-box" v-html="article.content"></div>
          </div>
          <div class="all-comment-box shadow">
            <h3>全部评论</h3>
            <span v-if="commentList.length == 0" style="font-size:12px;color:#A2A0A0;">暂无评论</span>
            <div class="all-comment-list-box" v-for="(comment,cIndex) in commentList" :key="cIndex">
              <div class="app-row-start-left">
                <img class="comment-avatar" src="../assets/user.jpg" />
                <div class="app-column-start-left">
                  <div>
                    <span class="comment-name">{{comment.name}}</span>
                    <span class="comment-floor">#{{cIndex+1}}楼</span>
                  </div>
                  <div>
                    <span class="comment-time">{{comment.createTime}}</span>
                  </div>
                </div>
              </div>
              <div class="comment-content-box">
                <span>{{comment.content}}</span>
              </div>
              <!--回复信息展示-->
              <div class="reply-comment-box" v-for="(childs,csIndex) in comment.blogCommentList" :key="csIndex">
                <div class="app-row-start-left">
                  <img class="comment-avatar" src="../assets/user.jpg" />
                  <div class="app-column-start-left">
                    <div>
                      <span class="comment-name">{{childs.name}}</span>
                      <span v-if="comment.id == childs.parentId" class="comment-floor">回复 {{comment.name}}</span>
                    </div>
                    <div>
                      <span class="comment-time">{{childs.createTime}}</span>
                    </div>
                  </div>
                </div>
                <div class="comment-content-box">
                  <span>{{childs.content}}</span>
                </div>
              </div>
              <!--回复按钮-->
              <div style="height:30px;" class="app-row-end-right">
                <span class="reply-comment-btn" @click="showReply(cIndex)">回复 TA</span>
              </div>
              <!--回复评论栏-->
              <div v-show="cIndex==i" class="reply-comment-item-box shadow">
                <div class="app-row-start-left">
                  <div class="app-column-start-left">
                    <label class="send-name"><span style="color:#F56C6C;">*</span>昵称</label>
                    <el-input class="send-name-input" v-model="replyName" placeholder="请输入一个称呼"></el-input>
                  </div>
                  <div class="send-email-box app-column-start-left">
                    <label>邮箱</label>
                    <el-input class="send-name-input" v-model="replyEmail" placeholder="邮箱信息绝对保密"></el-input>
                  </div>
                </div>
                <div class="top-gap app-column-center-layout">
                  <el-input style="font-family:'微软雅黑';" type="textarea" :rows="6" placeholder="说点什么吧..." v-model="replyContent"> </el-input>
                </div>
                <div class="top-gap app-row-end-right">
                  <el-button @click="reply(comment.id)" type="primary">发表评论</el-button>
                </div>
              </div>
            </div>
          </div>
          <div class="send-comment-box shadow">
            <h3>发表评论</h3>
            <form id="submitForm">
              <div class="app-row-start-left">
                <div class="app-column-start-left">
                  <label class="send-name"><span style="color:#F56C6C;">*</span>昵称</label>
                  <el-input class="send-name-input" v-model="name" placeholder="请输入一个称呼"></el-input>
                </div>
                <div class="send-email-box app-column-start-left">
                  <label>邮箱</label>
                  <el-input class="send-name-input" v-model="email" placeholder="邮箱信息绝对保密"></el-input>
                </div>
              </div>
              <div class="top-gap app-column-center-layout">
                <el-input style="font-family:微软雅黑;" type="textarea" :rows="6" placeholder="说点什么吧..." v-model="content"> </el-input>
              </div>
              <div class="top-gap app-row-end-right">
                <el-button @click="send()" type="primary">发表评论</el-button>
              </div>
            </form>
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
import { getArticle,getListByRand } from '../api/blog/article.js'
import { getCategoryList } from '../api/blog/category.js'
import { postComment,replyComment,getCommentList } from '../api/blog/comment.js'
export default {
  name: '',
  props: {
    msg: String
  },
  //刷新页面
  inject:['reload'],
  //变量定义
  data () {
    return {
      show: false,
      article: {},
      articleRandList: [],
      categoryList: [],
      commentList:[],
      name:'',
      email:'',
      content:'',
      replyName:'',
      replyEmail:'',
      replyContent:'',
      parentId:'',
      i: -1,
      timer: null
    }
  },
  
  //监听路由是否变化并进行跳转
  watch: {
    '$route' (to) { 
      this.$router.go(to)
    }
  },

  mounted () {
    window.addEventListener('scroll', this.scrollToTop)
  },
  destroyed () {
    window.removeEventListener('scroll', this.scrollToTop)
  },

  //页面加载时
  created() {
    console.log('article初始化')
    var id = this.$route.params.id
    this.getArticle(id)
    this.getListByRand()
    this.getCategoryList()
    this.getCommentList(id)
  },
  //页面离开时销毁
  beforeDestroy() {
    this.show = false
  },
  methods: {
    //获取文章信息
    getArticle(id) {
      getArticle(id).then((res) => {
        this.article = res
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
    },

    //发表评论
    send(){
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      var name = this.name
      var content = this.content
      if(name != "" && content != ""){
        var form = {
          name: name,
          email: this.email || '',
          content: content,
          articleId: this.$route.params.id
        }
        postComment(form).then((res) => {
          if(res.code == 200){
            this.$message({
              message: res.msg,
              type: 'success'
            });
            clearTimeout(this.timer);       //清除延迟执行
            this.timer = setTimeout(()=>{   //设置延迟执行
                this.reload()
                loading.close();
            },1500);
          }
        })
      } else if(name == ""){
        this.$message.error('请输入昵称信息')
      } else if(content == ""){
        this.$message.error('请输入评论信息')
      }
    },

    //显示回复栏
    showReply(cIndex){
      this.i = cIndex
    },

    //回复评论
    reply(id){
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      var name = this.replyName
      var content = this.replyContent
      if(name != "" && content != ""){
        var form = {
          name: name,
          email: this.replyEmail || '',
          content: content,
          articleId: this.$route.params.id,
          parentId: id
        }
        replyComment(form).then((res) => {
          if(res.code == 200){
            this.$message({
              message: res.msg,
              type: 'success'
            });
            clearTimeout(this.timer);  //清除延迟执行
            this.timer = setTimeout(()=>{   //设置延迟执行
                this.reload()
                loading.close();
            },1500);
          }
        })
        this.i = -1
      } else if(name == ""){
        this.$message.error('请输入昵称信息')
      } else if(content == ""){
        this.$message.error('请输入评论信息')
      }
    },

    //获取评论数据列表
    getCommentList(id){
      getCommentList(id).then((res) => {
        this.commentList = res
        console.log(this.commentList)
      })
    },
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
  .white-bg >>> img {
    width:100%;
    height: auto;
  }
</style>
