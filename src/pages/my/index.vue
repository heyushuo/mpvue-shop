<template>
  <div class="my">
    <div class="myinfo">
      <img @click="toLogin" src="http://yanxuan.nosdn.127.net/8945ae63d940cc42406c3f67019c5cb6.png" alt="">
      <div @click="toLogin">
        <p>hi~游客</p>
        <p>点击登录</p>
      </div>
    </div>
    <div class="iconlist">
      <div>
        <span class="iconfont icon-unie64a"></span>
        <span>我的订单</span>
      </div>
      <div>
        <span class="iconfont icon-youhuiquan"></span>
        <span>优惠券</span>
      </div>
      <!-- <div>
        <span class="iconfont icon-lipin"></span>
        <span>礼品卡</span>
      </div> -->
      <div>
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
      </div>
    </div>
  </div>
</template>

<script>
import { get, login } from "../../utils";
export default {
  created() {
    // 可以通过 wx.getSetting 先查询一下用户是否授权了 "scope.record" 这个 scope
    if (login()) {
      this.userInfo = login();
    }
  },
  data() {
    return {
      allcheck: false,
      listData: [],
      Listids: [],
      userInfo: {}
    };
  },
  components: {},
  methods: {
    toLogin() {
      wx.navigateTo({ url: "/pages/login/main" });
    }
  },
  computed: {}
};
</script>
<style lang='scss' scoped>
@import "./style";
</style>
