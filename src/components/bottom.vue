<template>
    <!--底部-->
    <div class="bottom-box app-column-start-left hidden-xs-only">
        <label class="bottom-title">
            <span class="footer__heart">❤️</span>
            Copyright © 2019 All Rights Reserved.  Ivan Personal Blog
        </label>
        <label class="bottom-Record">
            <a style="color:#828282;" target="_blank" href="http://www.beian.miit.gov.cn/">鄂ICP备19026210号</a>
        </label>
    </div>
</template>

<style scoped>
  /* 底部 */
  .bottom-box{
    margin-top: 20px;
    background:#282828;
    height:100px;
    width:100%;
    color:#828282;
    font-size:12px;
  }
  .bottom-title{
    margin:10px 0px 10px 100px;
  }
  .bottom-Record{
    margin: 0px 0px 0px 150px;
  }
@media screen and (max-width: 750px) {
  .bottom-box[data-v-10e356bb] {
    margin-top: 20px;
    background: #282828;
    height: 80px;
    width: 100%;
    color: #828282;
    font-size: 12px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .bottom-title{
    margin:10px 0px 10px 0px;
  }
  .bottom-Record{
    margin: 0px 0px 20px 0px;
  }
}
  
</style>