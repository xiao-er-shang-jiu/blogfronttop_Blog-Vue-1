<template>
  <div>
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
              <span class="base-title">{{article.title}}</span>
              <div class="posts-default-info season">
                <span><i class="el-icon-user-solid"></i> Ivan</span>
                <span><i class="el-icon-menu"></i> {{article.category}}</span>
                <span><i class="el-icon-time"></i> {{article.createTime}}</span>
                <span><i class="el-icon-view"></i> {{article.traffic}}</span>
                <span><i class="el-icon-chat-dot-round"></i> {{page.total}}</span>
              </div>
            </div>
            <transition name="el-fade-in-linear">
              <div class="center-left-item-box bodyFont" v-html="article.content" ref="bodyFont" :class="{bodyHeight:contentStatus}"></div>
            </transition>
            <div class="contentToggle" v-if="contentStatus" @click="contentStatus=!contentStatus">
              <span style="font-size:12px;">展开阅读全文</span>
            </div>
            <div class="share-box hidden-xs-only">
              <span>分享至: </span>
              <img @click="share('qq')" class="share-img" src="../assets/share/qq.jpg" />
              <img @click="share('qq-zone')" class="share-img" src="../assets/share/qq_zone.jpg" />
              <img @click="share('weibo')" class="share-img" src="../assets/share/weibo.jpg" />
            </div>
            <div class="router-article-box">
              <span class="router-article" @click="routerTo(article.beforeArticle.id)" v-if="article.beforeArticle">
                上一篇 : {{article.beforeArticle.title}}
              </span>
              <span class="router-article" @click="routerTo(article.afterArticle.id)" v-if="article.afterArticle">
                下一篇 : {{article.afterArticle.title}}
              </span>
            </div>
          </div>
          <div class="all-comment-box shadow">
            <div class="app-row-start-left">
              <span class="base-title">全部评论:</span>
              <span style="margin-left:10px;margin-top:10px;color:#333333;">{{page.total}} 条</span>
            </div>
            <span v-if="commentList.length == 0" style="font-size:12px;color:#A2A0A0;">暂无评论</span>
            <div class="all-comment-list-box" v-for="(comment,cIndex) in commentList" :key="cIndex">
              <div class="app-row-start-left">
                <img class="comment-avatar" :src="comment.avatarUrl" />
                <div class="app-column-start-left">
                  <div>
                    <span class="comment-name">{{comment.name}}</span>
                    <span class="comment-floor">#{{comment.ladder}}楼</span>
                  </div>
                  <div>
                    <span class="comment-time">{{comment.createTime | getTimeFormat}}</span>
                  </div>
                </div>
              </div>
              <div class="comment-content-box">
                <span>{{comment.content}}</span>
              </div>
              <!--回复信息展示-->
              <div class="reply-comment-box" v-for="(childs,csIndex) in comment.blogCommentList" :key="csIndex">
                <div class="app-row-start-left">
                  <img class="comment-avatar" :src="childs.avatarUrl" />
                  <div class="app-column-start-left">
                    <div>
                      <span class="comment-name">{{childs.name}}</span>
                      <span v-if="comment.id == childs.parentId" class="comment-floor">回复 {{comment.name}}</span>
                    </div>
                    <div>
                      <span class="comment-time">{{childs.createTime | getTimeFormat}}</span>
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
                  <el-input style="font-family:'微软雅黑';" type="textarea" :rows="3" :placeholder="'回复: ' + comment.name" v-model="replyContent"> </el-input>
                </div>
                <div class="top-gap app-row-end-right">
                  <el-button @click="reply(comment.id)" type="primary">发表评论</el-button>
                </div>
              </div>
            </div>
            <!-- 分页栏 -->
            <div style="margin-top:20px;" class="app-column-center-layout">
              <el-pagination 
                @current-change="handleCurrentChange"
                @prev-click="prevClick"
                @next-click="nextClick" 
                small 
                layout="prev, pager, next" 
                :total="page.total">
              </el-pagination>
            </div>
          </div>
          <div class="send-comment-box shadow">
            <span class="base-title">发表评论:</span>
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
            <span class="base-title">推荐文章</span>
            <div class="right-top-box-item" v-for="(item,index) in articleRandList" :key="index">
              <img @click="routerTo(item.id)" class="article-list-right-img" :src="item.img" /> 
            </div>
          </div>
          <div class="right-bottom-box shadow">
            <span class="base-title">热门标签</span>
            <div class="category-box">
              <span @click="routerToTags(category.id)" class="category-name" v-for="(category,cIndex) in categoryList" :key="cIndex">{{category.name}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import { qq } from 'http://qzonestyle.gtimg.cn/qzone/app/qzlike/qzopensl.js#jsdate=20111201'
import { getArticle,getListByRand } from '../api/blog/article.js'
import { getCategoryList } from '../api/blog/category.js'
import { postComment,replyComment,getCommentList,getCommentListPage } from '../api/blog/comment.js'
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
      page:{},
      i: -1,
      timer: null,
      contentStatus:false,  
      curHeight:0,
      bodyHeight:400,
      size: 10,
      ftit: '', // 分享出去得文章得标题
      flink: '' // 分享出去logo
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
    },700)
    window.addEventListener('scroll', this.scrollToTop)
  },
  destroyed () {
    window.removeEventListener('scroll', this.scrollToTop)
  },

  //页面加载时
  created() {
    var id = this.$route.params.id
    var form = {
      id: id,
      current: 0,
      size: this.size
    }
    this.getArticle(id)
    this.getListByRand()
    this.getCategoryList()
    this.getCommentList(form)
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

    //评论测试
    // sendDev(){
    //   if(this.content != ""){
    //     const loading = this.$loading({
    //       lock: true,
    //       text: 'Loading',
    //       spinner: 'el-icon-loading',
    //       background: 'rgba(0, 0, 0, 0.7)'
    //     });

    //     var form = {
    //       name: 'Ivan',
    //       email: '',
    //       avatarUrl: '',
    //       content: this.content,
    //       articleId: this.$route.params.id,
    //       parentId: 0
    //     }
    //     postComment(form).then((res) => {
    //       if(res.code == 200){
    //         this.successPop(res.msg)
    //       } else {
    //         this.errorPop(res)
    //       }
    //       clearTimeout(this.timer);       //清除延迟执行
    //       this.timer = setTimeout(()=>{   //设置延迟执行
    //         this.reload()
    //         loading.close();
    //       },1500);
    //     })
    //   } else if(this.content == ""){
    //     this.$message.error('说点什么吧!')
    //   }
    // },

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
            articleId: this.$route.params.id,
            parentId: 0
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
    getCommentList(form){
      getCommentList(form).then((res) => {
        this.page = res.data
        this.commentList = res.data.records
        //console.log('评论列表: ' + JSON.stringify(res.data))
      })
    },

    //分页--页数发生改变时
    handleCurrentChange(val){
      var form = {
        id: this.$route.params.id,
        current: val,
        size: this.size
      }
      //重新查询评论列表数据
      getCommentList(form).then((res) => {
        this.commentList = res.data.records
      })
    },

    //上一页
    prevClick(val){
      var form = {
        id: this.$route.params.id,
        current: val,
        size: this.size
      }
      //重新查询评论列表数据
      getCommentList(form).then((res) => {
        this.commentList = res.data.records
      })
    },

    //下一页
    nextClick(val){
      var form = {
        id: this.$route.params.id,
        current: val,
        size: this.size
      }
      //重新查询评论列表数据
      getCommentList(form).then((res) => {
        this.commentList = res.data.records
      })
    },

    //分享
    share(type){
      var ftit = this.article.title;  // 分享出去得文章得标题
      var flink = this.article.img;   // 分享出去logo
      var summary = this.article.summary
      console.log('当前网站: ' + ftit)
      if(type === 'qq'){
        window.open('http://connect.qq.com/widget/shareqq/index.html?url='+encodeURIComponent(document.location)+'?sharesource=qzone&title='+ftit+'&pics='+flink+'&summary='+summary+'&desc='+'');
      } else if(type === 'qq-zone'){
        window.open('https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url='+encodeURIComponent(document.location)+'&sharesource=qzone&title='+ftit+'&desc='+flink+'&summary='+summary+'&site='+'');
      } else if(type === 'weibo'){
        window.open('http://service.weibo.com/share/share.php?url='+encodeURIComponent(document.location)+'?sharesource=weibo&title='+ftit+'&pic='+flink+'&appkey=3825954717');
      } 
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
  },

  filters: {
    //时间戳显示格式为几天前、几分钟前、几秒前
    getTimeFormat (valueTime) {
      if (valueTime) {
        // let newData = Date.parse(new Date() + '')
        // let diffTime = Math.abs(newData - valueTime)
        let diffTime = Math.abs(new Date().getTime() - new Date(valueTime).getTime())
        if (diffTime > 7 * 24 * 3600 * 1000) {
          let date = new Date(valueTime)
          // let y = date.getFullYear()
          let m = date.getMonth() + 1
          m = m < 10 ? ('0' + m) : m
          let d = date.getDate()
          d = d < 10 ? ('0' + d) : d
          let h = date.getHours()
          h = h < 10 ? ('0' + h) : h
          let minute = date.getMinutes()
          let second = date.getSeconds()
          console.log(second)
          minute = minute < 10 ? ('1' + minute) : minute
          second = second < 10 ? ('0' + second) : second
          return m + '-' + d + ' ' + h + ':' + minute
        } else if (diffTime < 7 * 24 * 3600 * 1000 && diffTime > 24 * 3600 * 1000) {
          // //注释("一周之内");
          // var time = newData - diffTime;
          let dayNum = Math.floor(diffTime / (24 * 60 * 60 * 1000))
          return dayNum + '天前'
        } else if (diffTime < 24 * 3600 * 1000 && diffTime > 3600 * 1000) {
          // //注释("一天之内");
          // var time = newData - diffTime;
          let dayNum = Math.floor(diffTime / (60 * 60 * 1000))
          return dayNum + '小时前'
        } else if (diffTime < 3600 * 1000 && diffTime > 0) {
          // //注释("一小时之内");
          // var time = newData - diffTime;
          let dayNum = Math.floor(diffTime / (60 * 1000))
          return dayNum + '分钟前'
        }
      }
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
    height: 407px;
  }
  .contentToggle{
    line-height: 35px;
    text-align: center;
    background: #fff;
    color: #E80808;
    border:1px solid #E80808;
    border-radius: 5px;
    margin: 0px 20px 20px 20px;
    cursor:pointer;
  }
  
  /* 富文本样式 */
  .center-left-item-box >>> img {
    display: block;
    margin: 0 auto;
    width:100% !important;
    height: auto !important;
  }
  /* 引用样式 */
  .center-left-item-box >>> blockquote {
    position: relative;
    margin: 20px 0px;
    padding: .107143rem .878571rem;
    background: rgba(0,0,0,.02);
  } 
  .center-left-item-box >>> blockquote::before{
    content: "";
    position: absolute;
    width: .307143rem;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(0,0,0,.06);
  }
  .center-left-item-box >>> pre{
    max-width: 750px;
    padding: 20px;
    background: #F5F5F5;
    border: 1px solid #CCCCCC;
    border-radius: 5px;
    word-break: break-all;
    font-size: 12px !important;
    overflow-x: auto;
  }
  /* 代码样式 */
  .center-left-item-box >>> code{
    max-width: 100%;
    word-break: break-all;
    font-size: 12px !important;
  }
  .center-left-item-box >>> code span{
    font-size: 12px !important;
  }
  /* 表单样式 */
  .center-left-item-box >>> table{
    max-width: 100%;
  }
  /* 列表样式 */
  .center-left-item-box >>> ul {
    margin-left: 40px;
  }
  .center-left-item-box >>> ol {
    margin-left: 40px;
  }
</style>
