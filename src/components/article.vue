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
            <transition name="el-fade-in-linear">
              <div class="center-left-item-box bodyFont" v-html="article.content" ref="bodyFont" :class="{bodyHeight:contentStatus}"></div>
            </transition>
            <div class="contentToggle" v-if="contentStatus" @click="contentStatus=!contentStatus">
              <span style="font-size:12px;">展开阅读全文</span>
            </div>
          </div>
          <div class="all-comment-box shadow">
            <div class="app-row-start-left">
              <h3>全部评论: </h3>
              <span style="margin-left:10px;color:#333333;">{{commentList.length}} 条</span>
            </div>
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
                <div class="top-gap app-column-center-layout">
                  <el-input style="font-family:'微软雅黑';" type="textarea" :rows="3" placeholder="说点什么吧..." v-model="replyContent"> </el-input>
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
              <div class="top-gap app-column-center-layout">
                <el-input style="font-family:微软雅黑;" type="textarea" :rows="4" placeholder="说点什么吧..." v-model="content"> </el-input>
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
      name:'',
      avatarUrl:'',
      email:'',
      content:'',
      replyName:'',
      replyAvatarUrl:'',
      replyEmail:'',
      replyContent:'',
      parentId:'',
      show: false,
      article: {},
      articleRandList: [],
      categoryList: [],
      commentList:[],
      i: -1,
      timer: null,
      contentStatus:false,  
      curHeight:0,
      bodyHeight:300
    }
  },
  
  //监听路由是否变化并进行跳转
  watch: {
    '$route' (to) { 
      this.$router.go(to)
    }
  },

  mounted () {
    setTimeout(()=>{
      this.contentToggle();
    },500)
    window.addEventListener('scroll', this.scrollToTop)
  },
  destroyed () {
    window.removeEventListener('scroll', this.scrollToTop)
  },

  //页面加载时
  created() {
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
    //加载全部
    contentToggle(){
        this.curHeight = this.$refs.bodyFont.offsetHeight;
        if(this.curHeight > this.bodyHeight){
          this.contentStatus = true;
        }else{
          this.contentStatus = false;
        }
      },

    //获取文章信息
    getArticle(id) {
      getArticle(id).then((res) => {
        this.article = res.data
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
    },

    //发表评论
    send(){
      const userinfo = localStorage.getItem('userinfo')
      if(userinfo){
        var user = JSON.parse(userinfo)
        if(user.name != "" && this.content != ""){
          const loading = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
          console.log(user.avatar_url)

          var form = {
            name: user.name,
            email: user.email,
            avatarUrl: user.avatar_url,
            content: this.content,
            articleId: this.$route.params.id
          }
          postComment(form).then((res) => {
            if(res.code == 200){
              this.successPop(res.msg)
            } else {
              this.errorPop(res)
            }
            clearTimeout(this.timer);       //清除延迟执行
            this.timer = setTimeout(()=>{   //设置延迟执行
              this.reload()
              loading.close();
            },1500);
          })
        } else if(this.content == ""){
          this.$message.error('说点什么吧!')
        }
      } else {
        this.$message.error('请登录!')
      }
    },

    //显示回复栏
    showReply(cIndex){
      this.i = cIndex
    },

    //回复评论
    reply(id){
      const userinfo = localStorage.getItem('userinfo')
      if(userinfo){
        var user = JSON.parse(userinfo)
        if(user.name != "" && this.replyContent != ""){
          const loading = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });

          var form = {
            name: user.name,
            email: user.email,
            avatarUrl: user.avatar_url,
            content: this.replyContent,
            articleId: this.$route.params.id,
            parentId: id
          }
          replyComment(form).then((res) => {
            if(res.code == 200){
              this.successPop(res.msg)
            } else {
              this.errorPop(res)
            }
            clearTimeout(this.timer);       //清除延迟执行
            this.timer = setTimeout(()=>{   //设置延迟执行
              this.reload()
              loading.close();
              this.i = -1
            },1500);
          })
        } else if(this.replyContent == ""){
          this.$message.error('说点什么吧!')
        }
      } else {
        this.$message.error('请登录!')
      }
    },

    //获取评论数据列表
    getCommentList(id){
      getCommentList(id).then((res) => {
        this.commentList = res.data
      })
    },

    //成功侧移弹框
    successPop(res){
      this.$notify({
        title: '成功',
        message: res,
        type: 'success',
        showClose: false,
        position: 'bottom-right'
      });
    },

    //失败侧移弹框
    errorPop(res){
      this.$notify({
        title: '警告',
        message: res.msg || res,
        type: 'warning',
        showClose: false,
        position: 'bottom-right'
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

  /* 加载全部 */
  .bodyFont{
    color: #333;
    text-align: left;
    word-break:break-all;
    word-wrap:break-word;
    padding-bottom: 30px;
    overflow: hidden;
    max-height: 100%;
  }
  .bodyHeight{
    height: 300px;
  }
  .contentToggle{
    line-height: 35px;
    text-align: center;
    background: #fff;
    color: #E80808;
    border:1px solid #E80808;
    border-radius: 5px;
    margin: 20px 20px;
    cursor:pointer;
  }
  
  /* 富文本样式 */
  .center-left-item-box >>> img {
    display: block;
    margin: 0 auto;
    width:100% !important;
    height: auto !important;
  }
  .center-left-item-box >>> pre{
    max-width: 600px;
    padding: 20px;
    background: #F5F5F5;
    border: 1px solid #CCCCCC;
    border-radius: 5px;
    word-break: break-all;
    font-size: 12px !important;
    overflow-x: auto;
  }
  .center-left-item-box >>> code{
    max-width: 100%;
    word-break: break-all;
    font-size: 12px !important;
  }
  .center-left-item-box >>> code span{
    font-size: 12px !important;
  }
  .center-left-item-box >>> table{
    max-width: 100%;
  }
</style>
