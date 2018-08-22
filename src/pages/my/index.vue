<template>
  <div class="my">
    <div class="myinfo">
      <img @click="toLogin" :src="avator" alt="">
      <div @click="toLogin">
        <p>{{userInfo.nickName}}</p>
        <p v-if="userInfo.nickname">点击登录</p>
        <p v-else>微信用户</p>
      </div>
    </div>
    <div class="iconlist">
      <div v-for="(item, index) in listData" :key="index">
        <navigator :url="item.url">
          <span class="iconfont" :class="item.icon"></span>
          <span>{{item.title}}</span>
        </navigator>
      </div>
      <!-- <div>
        <span class="iconfont icon-unie64a"></span>
        <span>我的订单</span>
      </div>
      <div>
        <span class="iconfont icon-youhuiquan"></span>
        <span>优惠券</span>
      </div> -->
      <!-- <div>
        <span class="iconfont icon-lipin"></span>
        <span>礼品卡</span>
      </div> -->
      <!-- <div>
        <span class="iconfont icon-zuji"></span>
        <span>我的足迹</span>
      </div>
      <div>
        <span class="iconfont icon-shoucang"></span>
        <span>我的收藏</span>
      </div>

      <div>
        <span class="iconfont icon-dizhiguanli"></span>
        <span>地址管理</span>
      </div>
      <div>
        <span class="iconfont icon-unie64a"></span>
        <span>联系客服</span>
      </div>
      <div>
        <span class="iconfont icon-bangzhuzhongxin"></span>
        <span>帮助中心</span>
      </div>
      <div>
        <span class="iconfont icon-yijianfankui"></span>
        <span>意见反馈</span>
      </div> -->
    </div>
  </div>
</template>

<script>
  import {
    get,
    login
  } from "../../utils";
  export default {
    created() {},
    mounted() {
      // 可以通过 wx.getSetting 先查询一下用户是否授权了 "scope.record" 这个 scope
      if (login()) {
        this.userInfo = login();
        console.log(this.userInfo);
        this.avator = this.userInfo.avatarUrl;
      }
    },
    data() {
      return {
        avator: "http://yanxuan.nosdn.127.net/8945ae63d940cc42406c3f67019c5cb6.png",
        allcheck: false,
        listData: [],
        Listids: [],
        userInfo: {},
        listData: [{
            title: "我的订单",
            icon: "icon-unie64a",
            url: ""
          },
          {
            title: "优惠券",
            icon: "icon-youhuiquan",
            url: ""
          },
          {
            title: "我的足迹",
            icon: "icon-zuji",
            url: ""
          },
          {
            title: "我的收藏",
            icon: "icon-shoucang",
            url: "/pages/collectlist/main"
          },
          {
            title: "地址管理",
            icon: "icon-dizhiguanli",
            url: "/pages/address/main"
          },
          {
            title: "联系客服",
            icon: "icon-lianxikefu",
            url: ""
          },
          {
            title: "帮助中心",
            icon: "icon-bangzhuzhongxin",
            url: ""
          },
          {
            title: "意见反馈",
            icon: "icon-yijianfankui",
            url: ""
          }
        ]
      };
    },
    components: {},
    methods: {
      toLogin() {
        wx.navigateTo({
          url: "/pages/login/main"
        });
      }
    },
    computed: {}
  };

</script>
<style lang='scss' scoped>
  @import "./style";

</style>
