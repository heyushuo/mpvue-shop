<template>
  <div class="cart">
    <div class="top">
      <div>30天无忧退货</div>
      <div>48小时快速退款</div>
      <div>满88元免邮费</div>
    </div>
    <button open-type="getUserInfo">dfasfsdf</button>
    <div @click="getUserInfo">
      何玉硕
    </div>
    <button open-type="getUserInfo" lang="zh_CN" @getuserinfo="doLogin">获取用户信息</button>
    <div class="nogoods">
      <img src="http://nos.netease.com/mailpub/hxm/yanxuan-wap/p/20150730/style/img/icon-normal/noCart-a8fe3f12e5.png" alt="">
    </div>
  </div>
</template>

<script>
var qcloud = require("wafer2-client-sdk/index.js");
export default {
  created() {
    // 可以通过 wx.getSetting 先查询一下用户是否授权了 "scope.record" 这个 scope
    qcloud.setLoginUrl("http://localhost:5757/heyushuo/login");
  },
  data() {
    return {};
  },
  components: {},
  methods: {
    getUserInfo() {
      // 调用登录接口
      wx.login({
        success: res => {
          console.log(res);
        }
      });
    },
    doLogin() {
      const session = qcloud.Session.get();

      if (session) {
        // 第二次登录
        // 或者本地已经有登录态
        // 可使用本函数更新登录态
        qcloud.loginWithCode({
          success: res => {
            this.setData({ userInfo: res, logged: true });
            util.showSuccess("登录成功");
          },
          fail: err => {
            console.error(err);
            util.showModel("登录错误", err.message);
          }
        });
      } else {
        // 首次登录
        qcloud.login({
          success: res => {
            this.setData({ userInfo: res, logged: true });
            util.showSuccess("登录成功");
          },
          fail: err => {
            console.error(err);
            util.showModel("登录错误", err.message);
          }
        });
      }
    }
  },
  computed: {}
};
</script>
<style lang='scss' scoped>
@import "./style";
</style>